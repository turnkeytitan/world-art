"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Artist } from "@/lib/definitions";
import { getArtistList } from "@/lib/data";
import { debounce } from "@/lib/utils";

function Home() {
  const getArtists = (artists: string) => {
    getArtistList(artists).then((list) => {
      setArtists(list);
    });
  };
  const debouced = debounce(getArtists, 500);
  const [artists, setArtists] = useState<Artist[]>([]);
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <section className=" flex justify-center items-center gap-8">
        <p className="text-center">Search by artist:</p>
        <Input
          className="max-w-72"
          type="text"
          onChange={(e) => {
            debouced(e.target.value);
          }}
        />
      </section>
      <ul className="flex gap-4 flex-wrap px-10 justify-center">
        {artists.map((artist) => (
          <li
            className="cursor-pointer"
            key={artist.id}>
            {artist.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Home;
