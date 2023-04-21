import { UserState } from './UserState';

export type UserAction = {
  type: 'update';
  payload: UserState;
};
