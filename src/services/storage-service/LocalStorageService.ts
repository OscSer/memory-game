import { UserState } from '@models/UserState';

const storageKeys = {
  userState: 'user-state',
};

export function getUserState(): UserState | undefined {
  let userState;
  const item = localStorage.getItem(storageKeys.userState);
  if (item) userState = JSON.parse(item);
  return userState;
}

export function setUserState(user: UserState) {
  localStorage.setItem(storageKeys.userState, JSON.stringify(user));
}
