import { CardElement } from '@models/CardElement';
import { CardType } from '@models/CardType';

export function duplicateAndRandomizeCards(cards?: CardType[]): CardElement[] {
  if (!cards) return [];
  return cards
    .flatMap((item) => [
      { ...item, key: `${item.uuid}-1`, show: false, matched: false },
      { ...item, key: `${item.uuid}-2`, show: false, matched: false },
    ])
    .sort(() => Math.random() - 0.5);
}
