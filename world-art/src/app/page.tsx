"use client";
import { useEffect, useState } from "react";
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
import { getArtByArtist, getArtistList, setFavorite } from "@/lib/data";
import { debounce } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

function Home() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [pieces, setPieces] = useState<Art[]>([]);
  useEffect(() => {
    getArtists("");
    if (!localStorage.getItem("userid")) {
      window.location.href = "/login";
    }
  }, []);
  const { toast } = useToast();
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
  const handleFavorite = (piece: Art) => {
    localStorage.setItem("userid", "2");
    const userId = localStorage.getItem("userid");
    userId && (piece.userId = userId);
    setFavorite(piece)
      .then((res) => {
        toast({
          variant: "successful",
          title: "Yayyy!!!",
          description: res.message,
        });
      })
      .catch((res) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: res.response.data.message,
        });
      });
  };
  const debouced = debounce(getArtists, 500);
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

      {!(artists.length > 0) && (
        <section className="flex flex-wrap justify-center items-baseline gap-8 mb-20">
          {pieces.map((piece) => (
            <Card key={piece.artworkId}>
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
                <Toaster />
                <Button onClick={() => handleFavorite(piece)}>Add to favorites</Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      )}
      {!(artists.length > 0) && pieces && <p>No pieces found</p>}
    </div>
  );
}
export default Home;
