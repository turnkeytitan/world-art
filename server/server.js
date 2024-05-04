require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const museumApi = process.env.MUSEUM_API;
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
