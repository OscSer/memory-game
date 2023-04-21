import { useUserState } from '@contexts/user-context/UserContext';

export function Board() {
  const userState = useUserState();
  return (
    <h1>
      board: {userState.nickname} {userState.numberOfCards}
    </h1>
  );
}
