import axios from "axios";
import { Art, Artist } from "./definitions";

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
