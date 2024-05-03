import axios from "axios";
import { Artist } from "./definitions";

const baseUrl = "/api/artists";

export async function getArtistList(artist: string): Promise<Artist[]> {
  const url = `${baseUrl}/${artist}`;
  const res = await axios.get(url);
  return res.data;
}
