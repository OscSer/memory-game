import { CardElement } from '@models/CardElement';
import { CardType } from '@models/CardType';

export function duplicateAndRandomizeCards(cards?: CardType[]): CardElement[] {
  if (!cards) return [];

  const defaultProps = {
    show: false,
    matched: false,
    selected: false,
  };

  return cards
    .flatMap((item) => [
      {
        ...item,
        ...defaultProps,
        key: `${item.uuid}-1`,
      },
      {
        ...item,
        ...defaultProps,
        key: `${item.uuid}-2`,
      },
    ])
    .sort(() => Math.random() - 0.5);
}
