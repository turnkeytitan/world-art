import axios, { AxiosError } from "axios";
import { Art, Artist, Message, ResponseDTO, User } from "./definitions";

const baseUrl = process.env.NEXT_PUBLIC_BACK;

export async function getArtistList(artist: string): Promise<Artist[]> {
  const url = `${baseUrl}/artists/${artist}`;
  const res = await axios.get(url);
  return res.data;
}
export async function getArtByArtist(artist: string): Promise<Art[]> {
  const url = `${baseUrl}/art/${artist}`;
  const res = await axios.get(url);
  return res.data;
}
export async function setFavorite(piece: Art): Promise<Message | AxiosError> {
  const url = `${baseUrl}/art`;
  const res = await axios.post(url, piece);
  return res.data;
}
export async function getFavorites(id: string): Promise<Art[]> {
  const url = `${baseUrl}/favs/${id}`;
  const res = await axios.get(url);
  return res.data;
}
export async function login(user: User): Promise<ResponseDTO<Omit<User, "password">>> {
  const url = `${baseUrl}/login`;
  const res = await axios.post(url, user);
  return res.data;
}
