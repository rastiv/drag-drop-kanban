import { useState } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import AddCard from "./AddCard";
import DropIndicator from "./DropIndicator";
import { useCardContextState } from "../providers/CardsProvider";

const Column = ({ title, column }) => {
  const [active, setActive] = useState(false);
  const { cards, updateCards } = useCardContextState();

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.setData("column", card.column);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();
    clearHightLights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = 1;
  };

  const clearHightLights = (els) => {
    const indicators = els || getIndicators();
    indicators.forEach((indicator) => {
      indicator.style.opacity = 0;
    });
  };

  const getNearestIndicator = (e, indicators) => {
    const DISCTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISCTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    setActive(false);
    clearHightLights();
  };

  const handleDragEnd = (e) => {
    setActive(false);
    clearHightLights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const cardId = e.dataTransfer.getData("cardId");
    const beforeId = element.dataset.before || "-1";
    const fromColumn = e.dataTransfer.getData("column");
    const toColumn = element.dataset.column;

    // card copy
    const cardCopy = {
      ...cards[fromColumn].find((card) => card.id === cardId),
      column: toColumn,
    };

    // copy and update old column
    const fromColumnCopy = cards[fromColumn].filter(
      (card) => card.id !== cardId
    );

    // copy and update new column
    let toColumnCopy =
      fromColumn === toColumn
        ? fromColumnCopy
        : cards[toColumn]?.filter(() => true);

    // add the card in the correct place in the new column
    if (beforeId === "-1") {
      toColumnCopy = [...(toColumnCopy || []), cardCopy];
    } else {
      const insertAtIndex = toColumnCopy.findIndex(
        (card) => card.id === beforeId
      );
      toColumnCopy.splice(insertAtIndex, 0, cardCopy);
    }

    const updatedCards = {
      ...cards,
      [fromColumn]: fromColumnCopy,
      [toColumn]: toColumnCopy,
    };

    updateCards(updatedCards);
  };

  return (
    <div
      className={`w-64 shrink-0 p-2 transition-colors ${
        active ? "bg-neutral-800/100" : "bg-neutral-800/50"
      }`}
    >
      <div className="mb-3 flex gap-1 items-center">
        <h3 className="font-medium text-blue-200">{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          / {cards[column]?.length ?? 0}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className="h-full w-full"
      >
        {cards[column]?.map((card) => (
          <Card key={card.id} {...card} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId="-1" column={column} />
        <AddCard column={column} />
      </div>
    </div>
  );
};

Column.propTypes = {
  title: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
};

export default Column;
