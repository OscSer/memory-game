import { useUserState } from '@contexts/user-context/UserContext';
import { useGetCards } from '@hooks/cards-query/useCardsQuery';
import { useState } from 'react';

type Counter = {
  correct: number;
  incorrect: number;
};

export function GameBoard() {
  const user = useUserState();
  const [counter, setCounter] = useState<Counter>({ correct: 0, incorrect: 0 });
  const { isLoading, data: cards } = useGetCards(user.numberOfCards || 10);

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      {user.nickname}
      <div>
        correct {counter.correct} - incorrect {counter.incorrect}
      </div>
      <div>
        {cards?.map((card) => (
          <img key={card.uuid} src={card.url} alt={card.title} />
        ))}
      </div>
    </>
  );
}
