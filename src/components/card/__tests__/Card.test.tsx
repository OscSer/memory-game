import { act, fireEvent, render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  const card = {
    key: 'test-key',
    uuid: 'test-uuid',
    show: true,
    matched: false,
    selected: false,
    url: 'https://example.com/image.jpg',
    title: 'Example Image',
  };

  // Tests that a card with a visible image is rendered correctly.
  it('test_card_with_visible_image', () => {
    const callback = jest.fn();
    render(<Card card={card} callback={callback} />);
    expect(screen.getByTestId('front-card')).toBeVisible();
    expect(screen.getByTestId('back-card')).not.toBeVisible();
  });

  // Tests that a card with a hidden image is rendered correctly.
  it('test_card_with_hidden_image', () => {
    const callback = jest.fn();
    render(<Card card={{ ...card, show: false }} callback={callback} />);
    expect(screen.getByTestId('front-card')).not.toBeVisible();
    expect(screen.getByTestId('back-card')).toBeVisible();
  });

  // Tests that the callback function is called.
  it('test_card_on_callback_function', () => {
    const callback = jest.fn();
    render(<Card card={{ ...card, show: false }} callback={callback} />);
    act(() => fireEvent.click(screen.getByTestId('back-card')));
    expect(callback).toHaveBeenCalled();
  });
});
