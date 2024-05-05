const { sql } = require("@vercel/postgres");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const museumApi = process.env.MUSEUM_API;
const museumKey = process.env.MUSEUM_KEY;
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

function itemProperties(artObject) {
  const item = {
    artworkId: artObject.id,
    title: artObject.title,
    artist: artObject.principalOrFirstMaker,
    imageUrl: artObject.webImage.url,
    museumUrl: artObject.links.web,
  };
  return item;
}

function hasImage(artObject) {
  return !!artObject.hasImage;
}

app.use(express.static("out"));
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "usuario" && password === "contraseña") {
    res.status(200).json({ message: "Login exitoso" });
  } else {
    res.status(401).json({ message: "Credenciales incorrectas" });
  }
});

app.get("/api/artists", async (request, response) => {
  const url = `${museumApi}/en/search/advanced/terms?field=involvedMaker&q=`;
  let res = null;
  try {
    res = await axios.get(url);
  } catch (error) {
    console.error("Something happened with the request...", error);
  }
  response.json(res.data);
});
app.get("/api/artists/:artist", async (request, response) => {
  const artist = request.params.artist;
  const url = `${museumApi}/en/search/advanced/terms?field=involvedMaker&q=${artist}`;
  let res = null;
  try {
    res = await axios.get(url);
  } catch (error) {
    console.error("Something happened with the request...", error);
  }
  response.json(res.data);
});

app.get("/api/art/:artist", async (req, res) => {
  const artist = req.params.artist;
  const url = `${museumApi}/api/nl/collection?key=${museumKey}&involvedMaker=${artist}`;
  try {
    const art = await axios.get(url);
    const items = art.data.artObjects.filter(hasImage).map(itemProperties);
    res.json(items);
  } catch (error) {
    console.error("Error fetching artworks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/art/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await sql`SELECT * FROM favorites WHERE user_id = ${id}`;
    res.json(rows);
  } catch (error) {
    console.error("Error fetching artworks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/art", async (req, res) => {
  const piece = { ...req.body };
  try {
    let client = await sql.connect();
    const { rows } = await client.query(
      "SELECT * FROM favorites WHERE artwork_id = $1 AND user_id = $2",
      [piece.artworkId, piece.userId]
    );
    if (!rows.length) {
      await client.query(
        "INSERT INTO favorites(artwork_id, title, artist, image_url, link_to_museum, user_id) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          piece.artworkId,
          piece.title,
          piece.artist,
          piece.imageUrl,
          piece.museumUrl,
          piece.userId,
        ]
      );
      res.status(200).json({ message: "Successfuly added" });
    } else {
      res.status(409).json({ message: "Already added to your favorites" });
    }
    client.release();
  } catch (error) {
    console.error("Error handling artworks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
