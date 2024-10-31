import PropTypes from "prop-types";
import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator";

const Card = ({ title, id, column, handleDragStart }) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-0">{title}</p>
      </motion.div>
    </>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  handleDragStart: PropTypes.func.isRequired,
};

export default Card;
