import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import CARDS from "../assets/cards";

const groupByColumn = (cards) => Object.groupBy(cards, ({ column }) => column);

const CardContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCardContextState = () => useContext(CardContext);

const CardsProvider = ({ children }) => {
  const { getItem, setItem } = useLocalStorage("cards");
  const [cards, setCards] = useState(groupByColumn(getItem() ?? CARDS));

  const updateCards = (updatedCards) => {
    setCards(updatedCards);
    setItem(Object.values(updatedCards).flatMap((x) => x));
  };

  return (
    <CardContext.Provider value={{ cards, updateCards }}>
      {children}
    </CardContext.Provider>
  );
};

CardsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardsProvider;
