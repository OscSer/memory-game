import { useCallback, useEffect, useState } from 'react';
import { ArrowClockwise, Stars } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

import './GameBoard.css';
import { useUserState } from '@contexts/user-context/UserContext';
import { useGetCards } from '@hooks/cards-query/useCardsQuery';
import { CounterType } from '@models/CounterType';
import { Loading } from '@components/loading/Loading';
import { CardGrid } from '@components/card-grid/CardGrid';
import { CustomAlert } from '@components/alert/CustomAlert';
import { Counter } from '@components/counter/Counter';

export function GameBoard() {
  const navigate = useNavigate();
  const user = useUserState();
  const { isLoading, data } = useGetCards(user.numberOfCards);
  const [alertShow, setAlertShow] = useState(false);
  const [counter, setCounter] = useState<CounterType>({
    successful: 0,
    failed: 0,
  });

  useEffect(() => {
    if (counter.successful === user.numberOfCards) setAlertShow(true);
  }, [counter.successful, user.numberOfCards]);

  const restart = useCallback(() => navigate('/'), [navigate]);

  useEffect(() => {
    if (!user.nickname) restart();
  }, [restart, user.nickname]);

  const getAlertMessage = () => (
    <>
      <Stars />
      {' Congratulations '}
      <b>{user.nickname}</b>
      {'! You have completed the game in '}
      {counter.failed + counter.successful}
      {' attempts '}
      <Stars />
    </>
  );

  if (isLoading) return <Loading />;

  return (
    <div className="gameBoard">
      <div className="gameBoard__restart" onClick={restart} aria-hidden="true">
        <ArrowClockwise /> restart game
      </div>

      <div className="gameBoard__counters">
        <Counter label="Successful" value={counter.successful} />
        <Counter label="Failed" value={counter.failed} />
      </div>

      <CustomAlert
        show={alertShow}
        variant="primary"
        body={getAlertMessage()}
      />

      <CardGrid data={data} setCounter={setCounter} />
    </div>
  );
}
