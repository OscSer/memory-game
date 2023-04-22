import { useEffect, useState } from 'react';

import './GameBoard.css';
import { useUserState } from '@contexts/user-context/UserContext';
import { useGetCards } from '@hooks/cards-query/useCardsQuery';
import { CounterType } from '@models/CounterType';
import { Loading } from '@components/loading/Loading';
import { CardGrid } from '@components/card-grid/CardGrid';

export function GameBoard() {
  const user = useUserState();
  const { isLoading, data } = useGetCards(user.numberOfCards);
  const [counter, setCounter] = useState<CounterType>({
    successful: 0,
    failed: 0,
  });

  useEffect(() => {
    if (counter.successful === user.numberOfCards) {
      alert('You won!');
    }
  }, [counter.successful, user.numberOfCards]);

  if (isLoading) return <Loading />;

  return (
    <div className="gameBoard">
      <div>{user.nickname}</div>
      <div>
        {counter.successful} / {counter.failed}
      </div>
      <CardGrid data={data} setCounter={setCounter} />
    </div>
  );
}
