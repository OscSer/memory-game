import React from 'react';

import './Card.css';
import pattern from '@assets/card-pattern.jpeg';
import { CardElement } from '@models/CardElement';

interface CardParams {
  card: CardElement;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Card({ card, onClick }: CardParams): JSX.Element {
  const visibleClass = card.show ? 'customCard--visible' : '';
  const matchedClass = card.matched ? 'customCard--matched' : '';
  const modifierClases = `${visibleClass}  ${matchedClass}`;

  return (
    <img
      className={`customCard ${modifierClases}`}
      src={card.show ? card.url : pattern}
      alt={card.show ? card.title : 'card face down'}
      onClick={onClick}
      aria-hidden="true"
      draggable="false"
    />
  );
}
