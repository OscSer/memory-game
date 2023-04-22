import { useEffect, useRef, useState } from 'react';

import './GameBoard.css';
import { MemoizedCard } from '@components/card/Card';
import { useUserState } from '@contexts/user-context/UserContext';
import { useGetCards } from '@hooks/cards-query/useCardsQuery';
import { CardElement } from '@models/CardElement';
import { CounterType } from '@models/CounterType';
import { Loading } from '@components/loading/Loading';
import { duplicateAndRandomizeCards } from './gameBoardUtils';

export function GameBoard() {
  const user = useUserState();
  const [cards, setCards] = useState<CardElement[]>([]);
  const comparingRef = useRef(false);
  const { isLoading, data } = useGetCards(user.numberOfCards);
  const selectedRef = useRef<CardElement[]>([]);
  const [counter, setCounter] = useState<CounterType>({
    successful: 0,
    failed: 0,
  });

  useEffect(() => {
    setCards(duplicateAndRandomizeCards(data));
  }, [data]);

  if (isLoading) return <Loading />;

  const setVisibility = (_cards: CardElement[], show: boolean) => {
    const keys = _cards.map((item) => item.key);
    setCards((prev) =>
      prev.map((item) => (keys.includes(item.key) ? { ...item, show } : item))
    );
  };

  const setMatchedCards = (_cards: CardElement[]) => {
    const keys = _cards.map((item) => item.key);
    setCards((prev) =>
      prev.map((item) =>
        keys.includes(item.key) ? { ...item, matched: true } : item
      )
    );
  };

  const successfulMatch = () => {
    setCounter((prev) => ({ ...prev, successful: prev.successful + 1 }));
    setMatchedCards(selectedRef.current);
    comparingRef.current = false;
    selectedRef.current = [];
  };

  const unsuccessfulMatch = () => {
    setCounter((prev) => ({
      ...prev,
      failed: prev.failed + 1,
    }));
    setVisibility(selectedRef.current, false);
    comparingRef.current = false;
    selectedRef.current = [];
  };

  const compareCards = () => {
    comparingRef.current = true;
    if (selectedRef.current[0].uuid === selectedRef.current[1].uuid) {
      successfulMatch();
    } else {
      setTimeout(unsuccessfulMatch, 1000);
    }
  };

  const handleClick = (card: CardElement) => {
    const isSelected = selectedRef.current.some(
      (item) => item.key === card.key
    );
    if (card.matched || isSelected || comparingRef.current) return;

    setVisibility([card], true);
    selectedRef.current.push(card);
    if (selectedRef.current.length === 2) compareCards();
  };

  return (
    <div className="gameBoard">
      <div>{user.nickname}</div>
      <div>
        {counter.successful} / {counter.failed}
      </div>
      <div className="gameBoard__cards">
        {cards.map((card) => (
          <MemoizedCard
            key={card.key}
            card={card}
            onClick={() => handleClick(card)}
          />
        ))}
      </div>
    </div>
  );
}
