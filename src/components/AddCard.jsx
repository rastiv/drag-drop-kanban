import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { useCardContextState } from "../providers/CardsProvider";

const AddCard = ({ column }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const { cards, updateCards } = useCardContextState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length === 0) return;

    const newCard = {
      title: text.trim(),
      id: Math.random().toString(),
      column,
    };

    const updatedCards = {
      ...cards,
      [column]: [...(cards[column] || []), newCard],
    };

    updateCards(updatedCards);

    setAdding(false);
    setText("");
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new card..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-neutral-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              CLOSE
            </button>
            <button className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300">
              <span>ADD</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.div layout>
          <button
            onClick={() => setAdding(true)}
            className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
          >
            <span>ADD CARD</span>
            <FiPlus />
          </button>
        </motion.div>
      )}
    </>
  );
};

AddCard.propTypes = {
  column: PropTypes.string.isRequired,
};

export default AddCard;
