"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Art, Artist } from "@/lib/definitions";
import { getArtByArtist, getArtistList } from "@/lib/data";
import { debounce } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Home() {
  const getArtists = (artists: string) => {
    getArtistList(artists).then((list) => {
      setArtists(list);
      setPieces([]);
    });
  };
  const getArt = (artist: string) => {
    getArtByArtist(artist).then((list) => {
      setPieces(list);
      setArtists([]);
    });
  };
  const debouced = debounce(getArtists, 500);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [pieces, setPieces] = useState<Art[]>([]);
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
      {pieces && (
        <ul className="flex gap-4 flex-wrap px-10 justify-center">
          {artists.map((artist) => (
            <li
              className="cursor-pointer"
              key={artist.id}
              onClick={() => {
                getArt(artist.name);
              }}>
              {artist.name}
            </li>
          ))}
        </ul>
      )}
      {artists ? (
        <section className="flex flex-wrap justify-center items-baseline gap-8 mb-20">
          {pieces.map((piece) => (
            <Card key={piece.id}>
              <CardHeader>
                <CardTitle className="text-center">{piece.title}</CardTitle>
                <CardDescription className="text-center">
                  {piece.artist}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <img
                  src={piece.imageUrl}
                  alt={`${piece.title} by ${piece.artist}`}
                  width={200}
                  height={200}
                />
              </CardContent>
              <CardFooter className="flex justify-between gap-8">
                <a href={piece.museumUrl}>Go to site</a>
                <Button>Add to favorites</Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      ): (<p>No pieces found</p>)}
    </div>
  );
}
export default Home;
