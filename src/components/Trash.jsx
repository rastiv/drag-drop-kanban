import { useState } from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { useCardContextState } from "../providers/CardsProvider";

const Trash = () => {
  const [active, setActive] = useState(false);
  const { cards, updateCards } = useCardContextState();

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setActive(false);
  };

  const handleDropEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    const column = e.dataTransfer.getData("column");

    const updatedCards = {
      ...cards,
      [column]: cards[column].filter((card) => card.id !== cardId),
    };

    updateCards(updatedCards);
    setActive(false);
  };

  return (
    <div
      onDrop={handleDropEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-12 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

export default Trash;
