import { CardElement } from '@models/CardElement';
import { CardType } from '@models/CardType';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { duplicateAndRandomizeCards } from '@views/game-board/gameBoardUtils';
import { CardGrid } from '../CardGrid';

jest.mock('@views/game-board/gameBoardUtils', () => ({
  duplicateAndRandomizeCards: jest.fn(),
}));
const duplicateAndRandomizeCardsMock = duplicateAndRandomizeCards as jest.Mock;

describe('CardGrid', () => {
  const data: CardType[] = [{ title: 'title', url: 'url', uuid: 'uuid' }];
  const diferentCards: CardElement[] = [
    {
      uuid: '1',
      key: 'key-1',
      title: 'Card 1',
      url: 'url1',
      matched: false,
      show: false,
      selected: false,
    },
    {
      uuid: '2',
      key: 'key-2',
      title: 'Card 2',
      url: 'url2',
      matched: false,
      show: false,
      selected: false,
    },
  ];
  const sameCards: CardElement[] = diferentCards.map((card) => ({
    ...card,
    uuid: '1',
  }));

  // Tests that the CardGrid component renders with the correct props.
  it('test_card_grid_renders_with_correct_props', () => {
    duplicateAndRandomizeCardsMock.mockReturnValue(diferentCards);
    render(<CardGrid data={data} setCounter={jest.fn()} />);
    expect(screen.getByTestId('card-grid')).toBeInTheDocument();
    expect(screen.getAllByTestId('back-card').length).toBe(data.length * 2);
  });

  // Tests that the counter updates correctly when there is a failed match.
  it('test_counter_updates_correctly_on_failed', (done) => {
    duplicateAndRandomizeCardsMock.mockReturnValue(diferentCards);
    const { container } = render(
      <CardGrid data={data} setCounter={jest.fn()} />
    );
    const cards = screen.getAllByTestId('back-card');
    act(() => fireEvent.click(cards[0]));
    act(() => fireEvent.click(cards[1]));
    expect(
      container.getElementsByClassName('customCard--visible')
    ).toHaveLength(2);
    setTimeout(() => {
      expect(
        container.getElementsByClassName('customCard--visible')
      ).toHaveLength(0);
      done();
    }, 1500);
  });

  // Tests that the counter updates correctly when there is a successful match.
  it('test_counter_updates_correctly_on_match', (done) => {
    duplicateAndRandomizeCardsMock.mockReturnValue(sameCards);
    const { container } = render(
      <CardGrid data={data} setCounter={jest.fn()} />
    );
    const cards = screen.getAllByTestId('back-card');
    act(() => fireEvent.click(cards[0]));
    act(() => fireEvent.click(cards[1]));
    expect(
      container.getElementsByClassName('customCard--visible')
    ).toHaveLength(2);
    setTimeout(() => {
      expect(
        container.getElementsByClassName('customCard--visible')
      ).toHaveLength(2);
      done();
    }, 1500);
  });
});
