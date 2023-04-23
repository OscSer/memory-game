import './Card.css';
import pattern from '@assets/card-pattern.jpeg';
import { CardElement } from '@models/CardElement';
import { FocusableWrapper } from '@components/focusable-wrapper/FocusableWrapper';

interface Props {
  card: CardElement;
  callback: () => void;
}

export function Card({ card, callback }: Props): JSX.Element {
  const visibleClass = card.show ? 'customCard--visible' : '';
  const matchedClass = card.matched ? 'customCard--matched' : '';
  const modifierClases = `${visibleClass}  ${matchedClass}`;

  return (
    <>
      <img
        hidden={!card.show}
        aria-hidden={!card.show}
        data-testid="front-card"
        className={`customCard ${modifierClases}`}
        src={card.url}
        alt={card.title}
        draggable="false"
      />

      <FocusableWrapper callback={callback} hidden={card.show}>
        <img
          data-testid="back-card"
          className="customCard"
          src={pattern}
          alt="card face down"
          draggable="false"
        />
      </FocusableWrapper>
    </>
  );
}
