import { render, screen, fireEvent } from '@testing-library/react';
import { FocusableWrapper } from '../FocusableWrapper';

describe('FocusableWrapper', () => {
  // Tests that the component renders with required props.
  it('test_rendering_with_required_props', () => {
    render(<FocusableWrapper callback={() => {}}>Click me</FocusableWrapper>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  // Tests that clicking the button invokes the callback function.
  it('test_clicking_button_invokes_callback', () => {
    const mockCallback = jest.fn();
    render(
      <FocusableWrapper callback={mockCallback}>Click me</FocusableWrapper>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(mockCallback).toHaveBeenCalled();
  });

  // Tests that the component renders without any children.
  it('test_rendering_without_children', () => {
    render(<FocusableWrapper callback={() => {}} />);
    expect(screen.queryByText('Click me')).not.toBeInTheDocument();
  });
});
