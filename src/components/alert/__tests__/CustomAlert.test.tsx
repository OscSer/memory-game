import { render, screen } from '@testing-library/react';
import { CustomAlert } from '../CustomAlert';

describe('CustomAlert', () => {
  // Renders the component with the correct props.
  it('test_renders_alert_with_correct_props', () => {
    render(<CustomAlert variant="primary" body="Test Body" show />);
    expect(screen.getByTestId('custom-alert')).toBeVisible();
  });

  // Renders with show prop set to false and verifies that the Alert component is not rendered.
  it('test_show_prop_false', () => {
    render(<CustomAlert variant="primary" body="Test Body" show={false} />);
    expect(screen.queryByTestId('custom-alert')).not.toBeInTheDocument();
  });
});
