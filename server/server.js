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
    id: artObject.id,
    title: artObject.title,
    artist: artObject.principalOrFirstMaker,
    imageUrl: artObject.webImage.url,
    museumUrl: artObject.links.web,
  };
  return item
}

function hasImage(artObject) {
  return !!artObject.hasImage
}

app.use(express.static("out"));
app.use(cors());
app.use(express.json());
app.use(requestLogger);

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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
