export type Artist = {
  id: string;
  name: string;
};

export type Art = {
  id: number;
  title: string;
  artist: string;
  imageUrl?: string;
  museumUrl?: string;
};

// Define type for the favorites entity
export type Favorite = {
  id: number;
  userId: number;
  artId: number;
  timestamp: Date;
};
