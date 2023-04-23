import { render } from '@testing-library/react';
import { Counter } from '../Counter';

describe('Counter', () => {
  // Tests that the component renders with valid props.
  it('test_rendering_with_valid_props', () => {
    const { getByText } = render(<Counter label="Test Label" value={5} />);
    expect(getByText('Test Label')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
  });
});
