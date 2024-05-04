import axios from "axios";
import { Artist } from "./definitions";

const baseUrl = process.env.NEXT_PUBLIC_BACK;

export async function getArtistList(artist: string): Promise<Artist[]> {
  const url = `${baseUrl}/artists/${artist}`;
  const res = await axios.get(url);
  return res.data;
}
