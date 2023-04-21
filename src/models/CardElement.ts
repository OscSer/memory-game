import { CardType } from './CardType';

export type CardElement = CardType & {
  key: string;
  show: boolean;
  matched: boolean;
};
