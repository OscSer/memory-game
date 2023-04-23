import { render, screen } from '@testing-library/react';
import { Logo } from '../Logo';

describe('Logo', () => {
  // Tests that the Logo component renders without errors.
  it('test_logo_renders_without_errors', () => {
    render(<Logo />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('Memory')).toBeInTheDocument();
  });
});
