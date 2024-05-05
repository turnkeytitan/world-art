"use client";
import { getFavorites } from "@/lib/data";
import { Art } from "@/lib/definitions";
import { useEffect, useState } from "react";

const ListFav = () => {
  const [favs, setFavs] = useState<Art[]>([]);
  useEffect(() => {
    const id = localStorage.getItem("userid");
    if (id) {
      getFavorites(id).then((list) => {
        setFavs(list);
      });
    }
  }, []);

  return (
    <ul className="flex justify-center items-center flex-col gap-6">
      {favs.length > 0 ? (
        favs.map(({ artworkId, title, imageUrl, museumUrl, artist }) => (
          <li
            className="flex gap-6 items-center justify-between border-2 p-4 w-11/12 md:w-2/4 shadow-md"
            key={artworkId}>
            <img
              className="object-contain"
              src={imageUrl}
              alt={`${title} by ${artist}`}
              width={50}
              height={50}
            />
            <article className="flex flex-col max-w-96 items-end">
              <h2 className="text-right">{title}</h2>
              <p className="text-right">{artist}</p>
              <a className="text-right text-cyan-600" href={museumUrl}>Go to museum</a>
            </article>
          </li>
        ))
      ) : (
        <p>You don&apos;t have any favorites yet</p>
      )}
    </ul>
  );
};
export default ListFav;
