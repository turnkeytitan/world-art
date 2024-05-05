export type Artist = {
  id: string;
  name: string;
};

export type Art = {
  id: number;
  artworkId: string;
  title: string;
  artist: string;
  imageUrl?: string;
  museumUrl?: string;
  userId?: string;
};

export type Message = {
  message: string
}

