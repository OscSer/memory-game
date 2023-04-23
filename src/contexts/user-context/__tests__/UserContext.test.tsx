import { NumberOfCards } from '@models/NumberOfCards';
import { render, renderHook } from '@testing-library/react';
import { UserProvider, useUserState } from '../UserContext';

describe('UserContext', () => {
  // Tests that UserProvider renders with children.
  it('test_user_provider_renders_with_children', () => {
    const { getByText } = render(
      <UserProvider>
        <div>Test</div>
      </UserProvider>
    );
    expect(getByText('Test')).toBeInTheDocument();
  });

  // Tests that useReducer initializes with initialState.
  it('test_use_reducer_initializes_with_initial_state', () => {
    const initialState = {
      nickname: '',
      numberOfCards: NumberOfCards.Medium,
    };
    const { result } = renderHook(() => useUserState());
    expect(result.current).toEqual(initialState);
  });
});
