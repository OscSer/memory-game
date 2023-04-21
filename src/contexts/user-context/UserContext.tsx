import React, { Dispatch, useContext, useReducer } from 'react';
import { CardOptions } from '../../types/CardOptions';
import { Provider } from '../../types/Provider';
import { UserAction } from '../../types/UserAction';
import { UserState } from '../../types/UserState';

const initialState: UserState = {
  nickname: '',
  numberOfCards: CardOptions.Medium,
};
const UserContext = React.createContext<UserState>(initialState);
const UserDispatchContext = React.createContext<Dispatch<UserAction>>(() => {});

function reducer(state: UserState, action: UserAction) {
  switch (action.type) {
    case 'update': {
      return { ...state, ...action.payload };
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

export function UserProvider({ children }: Provider): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useUserState() {
  return useContext(UserContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}
