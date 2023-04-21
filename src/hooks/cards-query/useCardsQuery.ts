import { useQuery } from 'react-query';
import { CardType } from '@models/CardType';

type Entry = {
  fields: {
    image: {
      url: string;
      uuid: string;
      title: string;
    };
  };
};

type Response = {
  entries: Entry[];
};

async function parseCards(response: Response): Promise<CardType[]> {
  const cards = response.entries.map((entry) => {
    const { uuid, url, title } = entry.fields.image;
    return { uuid, url, title };
  });
  return cards;
}

async function getCards(numberOfCards: number) {
  const response = await fetch(
    `https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=${numberOfCards}`
  );
  if (!response.ok) throw new Error('Error fetching cards');
  return parseCards(await response.json());
}

export function useGetCards(numberOfCards: number) {
  return useQuery(['cards', numberOfCards], () => getCards(numberOfCards), {
    refetchOnWindowFocus: false,
  });
}
