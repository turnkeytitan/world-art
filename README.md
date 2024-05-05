# Getting Started

### Set up the .env.local so that it contains the variable for the back:
NEXT_PUBLIC_BACK="/api"

### And the .env in the back:
```
POSTGRES_URL="**************"
POSTGRES_PRISMA_URL="**************"
POSTGRES_URL_NO_SSL="**************"
POSTGRES_URL_NON_POOLING="***************"
POSTGRES_USER="***************"
POSTGRES_HOST="***************"
POSTGRES_PASSWORD="***************"
POSTGRES_DATABASE="***************"
PORT="3001"
MUSEUM_KEY="***************"
MUSEUM_API="https://www.rijksmuseum.nl"
```

### First, run the development server for the back:

```bash
cd server
npm i
npm run dev
```

### Then run the development server for the front:

```bash
cd ../world-art
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Vercel Deployment

To access the next app, go to [Vercel Platform URL1](https://world-art-git-main-samuel-sanchezs-projects.vercel.app/) or [Vercel platform URL2](https://world-art-delta.vercel.app/)

## Railway Deployment 

To take a look into the deployed Express backend go to: [Railway endpoint](https://world-art-production.up.railway.app/)

# API Documentation

## Authentication

### POST /api/login
- Authenticates a user.
- Body Parameters:
  - `username` (string): User's username.
  - `email` (string): User's email.
  - `password` (string): User's password.
- Returns:
  - 200 OK: Successful authentication. Response includes user data.
  - 401 Unauthorized: Incorrect credentials.

## Artwork Endpoints

### GET /api/artists
- Retrieves a list of artists from the museum API.
- Returns:
  - List of artists.

### GET /api/artists/:artist
- Retrieves artist information based on the provided name.
- Path Parameters:
  - `artist` (string): Name of the artist.
- Returns:
  - Information about the artist.

### GET /api/art/:artist
- Retrieves artworks associated with the provided artist.
- Path Parameters:
  - `artist` (string): Name of the artist.
- Returns:
  - List of artworks.

### GET /api/favs/:id
- Retrieves favorite artworks for a user.
- Path Parameters:
  - `id` (integer): User ID.
- Returns:
  - List of favorite artworks for the user.

### POST /api/art
- Adds an artwork to a user's favorites.
- Body Parameters:
  - `artworkId` (string): ID of the artwork.
  - `title` (string): Title of the artwork.
  - `artist` (string): Name of the artist.
  - `imageUrl` (string): URL of the artwork image.
  - `museumUrl` (string): URL of the artwork in the museum.
  - `userId` (integer): ID of the user.
- Returns:
  - 200 OK: Artwork successfully added to favorites.
  - 409 Conflict: Artwork already exists in user's favorites.
