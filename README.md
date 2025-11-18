# Fruit Counter V2

Lightweight full-stack demo: an Express + Mongo backend and a static frontend that displays fruits, images, cart and simple auth (JWT). Designed for local development and quick prototyping.

## Features
- In-memory fruit catalog (backend) with images in frontend
- User registration & login (bcrypt + JWT)
- Protected `/api/me` and optional cart stock decrement endpoint
- Client-side cart with persistent localStorage
- Graceful image fallbacks for broken URLs

## Repo layout
- `/backend` — Express server (primary file: `server.js`)
- `/frontend` — Static UI (primary file: `index.html`)

## Prerequisites
- macOS (commands below assume mac terminal)
- Node.js (v18+ recommended) and npm
- MongoDB (local or remote) — optional for running auth & users

## Quick start (mac)
1. Start MongoDB (if using local):
   - If installed via Homebrew:
     - brew services start mongodb-community@6.0
2. Start backend:
   - Open terminal and run:
     - cd /Users/rubhamsoni/Desktop/Fruit-Counter-V2/backend
     - npm install
     - Create a `.env` (see example below)
     - node server.js
   - Backend default: http://localhost:4000

3. Open frontend:
   - The frontend is a static `index.html`. For best results serve it with a static server:
     - cd /Users/rubhamsoni/Desktop/Fruit-Counter-V2/frontend
     - npx http-server -c-1 3000
     - open http://localhost:3000
   - Or simply open the file in your browser: open index.html

## .env example (backend)
Create `/backend/.env` with:
```env
MONGO_URI=mongodb://127.0.0.1:27017/fruitcounter
PORT=4000
JWT_SECRET=change_this_secret
```

## API (examples)
- GET /api/fruits
  - Returns fruits array
  - curl: curl http://localhost:4000/api/fruits

- POST /api/register
  - Body: { "name": "...", "email": "...", "password": "..." }
  - curl:
    curl -X POST http://localhost:4000/api/register -H "Content-Type: application/json" -d '{"email":"a@a.com","password":"pass"}'

- POST /api/login
  - Body: { "email": "...", "password": "..." }
  - Response contains `token` and `user`

- GET /api/me
  - Header: Authorization: Bearer <token>

- POST /api/cart/add/:id
  - Decrements in-memory stock for given fruit id (optionally protected with token)

## Images
- Frontend uses direct URLs (Wikimedia Commons / reliable sources) and a placeholder fallback (`via.placeholder.com`) when an image fails to load.

## Updating fruits
- Edit the `fruits` array in `/backend/server.js` to add/remove/update fruit entries (id, name, price, stock).
- Frontend fetches `/api/fruits` on load; it also uses a local DEFAULT_FRUITS fallback for instant UI.

## Troubleshooting
- Mongo connection errors: verify `MONGO_URI` and that Mongo is running.
- CORS: backend already enables CORS.
- Images not appearing: check network access to the external image URLs; broken remote URLs will be replaced by placeholder images in the UI.

## Development notes
- Backend uses Mongoose, bcrypt, jsonwebtoken.
- Frontend is plain HTML/CSS/JS — easy to port into frameworks.
- For quick iterations, use `nodemon` in backend: `npx nodemon server.js`

## License
MIT — adapt and reuse.
