import React from 'react';

import './Card.css';
import pattern from '@assets/card-pattern.jpg';
import { CardElement } from '@models/CardElement';

interface CardParams {
  card: CardElement;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function Card({ card, onClick }: CardParams): JSX.Element {
  return (
    <div
      className="memoryCard"
      onClick={onClick}
      role="button"
      aria-hidden="true"
    >
      {card.show ? (
        <img src={card.url} alt={card.title} draggable="false" />
      ) : (
        <img src={pattern} alt="card face down" draggable="false" />
      )}
    </div>
  );
}

export const MemoizedCard = React.memo(Card);
