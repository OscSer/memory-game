import { useEffect, useRef, useState } from 'react';

import './CardGrid.css';
import { Card } from '@components/card/Card';
import { CardElement } from '@models/CardElement';
import { duplicateAndRandomizeCards } from '@views/game-board/gameBoardUtils';
import { CardType } from '@models/CardType';
import { CounterType } from '@models/CounterType';

type CardGridParams = {
  data: CardType[] | undefined;
  setCounter: React.Dispatch<React.SetStateAction<CounterType>>;
};

export function CardGrid({ data, setCounter }: CardGridParams) {
  const [cardElements, setCardElements] = useState<CardElement[]>([]);
  const isComparingRef = useRef(false);
  const selectedRef = useRef<CardElement[]>([]);

  useEffect(() => {
    setCardElements(duplicateAndRandomizeCards(data));
  }, [data]);

  const updateCards = (
    cards: CardElement[],
    fieldsToUpdate: Partial<CardElement>
  ) => {
    const keys = cards.map((item) => item.key);
    setCardElements((prev) =>
      prev.map((item) =>
        keys.includes(item.key) ? { ...item, ...fieldsToUpdate } : item
      )
    );
  };

  const successfulMatch = () => {
    setCounter((prev) => ({ ...prev, successful: prev.successful + 1 }));
    updateCards(selectedRef.current, { matched: true, selected: false });
    isComparingRef.current = false;
    selectedRef.current = [];
  };

  const unsuccessfulMatch = () => {
    setCounter((prev) => ({
      ...prev,
      failed: prev.failed + 1,
    }));
    updateCards(selectedRef.current, { show: false, selected: false });
    isComparingRef.current = false;
    selectedRef.current = [];
  };

  const compareCards = () => {
    isComparingRef.current = true;
    if (selectedRef.current[0].uuid === selectedRef.current[1].uuid) {
      successfulMatch();
    } else {
      setTimeout(unsuccessfulMatch, 1000);
    }
  };

  const handleClick = (card: CardElement) => {
    if (card.matched || card.selected || isComparingRef.current) return;
    selectedRef.current.push(card);
    updateCards([card], { show: true, selected: true });
    if (selectedRef.current.length === 2) compareCards();
  };

  return (
    <div className="cardGrid">
      {cardElements.map((card) => (
        <Card key={card.key} card={card} onClick={() => handleClick(card)} />
      ))}
    </div>
  );
}
