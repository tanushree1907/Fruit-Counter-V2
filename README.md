# Fruit Counter V2

Lightweight full-stack demo: an Express backend (ES modules) and a static frontend that displays fruits, images and a client-side cart. Project was simplified: MongoDB and the login/register (auth) features were removed — the app now uses an in-memory fruit catalog on the backend and client-side cart persistence.

## Summary of changes
- Removed MongoDB, Mongoose and all authentication (register/login) code.
- Backend rewritten as an ES module (import syntax) and now serves an in-memory fruits array.
- Frontend uses Unsplash images for fruits, has robust image fallbacks, and no auth UI (login/register removed).
- Cart is stored in localStorage and the backend exposes a simple endpoint to decrement stock.

## Repo layout
- `/backend` — Express server (ES module). Primary file: `server.js`
- `/frontend` — Static UI. Primary file: `index.html`

## Features
- In-memory fruit catalog served by backend
- Frontend displays images from Unsplash (with placeholder fallback)
- Client-side cart persisted in localStorage
- Endpoint to decrement fruit stock: POST /api/cart/add/:id
- No user accounts or authentication

## Prerequisites
- macOS (commands below assume mac terminal)
- Node.js (v18+ recommended) and npm

## Quick start (mac)
1. Start backend:
   - cd /Users/rubhamsoni/Desktop/Fruit-Counter-V2/backend
   - npm install
   - node server.js
   - Backend default: http://localhost:4000

2. Serve frontend (recommended) or open directly:
   - cd /Users/rubhamsoni/Desktop/Fruit-Counter-V2/frontend
   - npx http-server -c-1 3000
   - open http://localhost:3000
   - (Or open the file in your browser: open index.html)

## API
- GET /api/fruits
  - Returns the current fruits array (id, name, price, stock).
  - Example: curl http://localhost:4000/api/fruits

- POST /api/cart/add/:id
  - Decrements in-memory stock for the given fruit id (no auth).
  - Body: none
  - Example: curl -X POST http://localhost:4000/api/cart/add/3

## Frontend notes
- index.html attaches Unsplash images to fruit names (source.unsplash.com) and uses a placeholder when images fail to load.
- The frontend maintains a local DEFAULT_FRUITS fallback for instant UI while fetching /api/fruits.
- Cart state is persisted in localStorage (no server-side user/cart persistence).

## Environment
- The backend only needs an optional PORT environment variable.
- No MongoDB or JWT secrets are required anymore.

## Troubleshooting
- If the frontend shows stale stock, refresh the page to fetch the latest /api/fruits.
- If images do not load, the app will show a placeholder image.
- If backend endpoints return errors, check backend console where server.js is running.

## Development notes
- Backend: plain Express (ES modules). Simple in-memory data — good for prototyping and tests.
- Frontend: plain HTML/CSS/JS — easy to convert to frameworks or add features like search/filtering.

## License
MIT — adapt and reuse.
