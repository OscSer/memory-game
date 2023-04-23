import { render, screen } from '@testing-library/react';
import { Loading } from '../Loading';

describe('Loading', () => {
  it('test_renders_loading_with_correct_props', () => {
    render(<Loading />);
    expect(screen.getByTestId('loading')).toBeVisible();
  });
});
