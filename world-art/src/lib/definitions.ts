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
  message: string;
};

export type User = {
  id?: string;
  username: string;
  email: string;
  password: string;
};

export interface ResponseDTO<T> extends Message {
  success: boolean;
  data: T;
};