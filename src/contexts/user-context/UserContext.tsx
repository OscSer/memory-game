import React, { Dispatch, useContext, useReducer } from 'react';
import { CardOptions } from '@models/CardOptions';
import { Provider } from '@models/Provider';
import { UserAction } from '@models/UserAction';
import { UserState } from '@models/UserState';
import { getUserState } from '@services/storage-service/LocalStorageService';

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
  const storedState = getUserState();
  const [state, dispatch] = useReducer(reducer, storedState || initialState);

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
