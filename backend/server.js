import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// In-memory fruits (kept in backend; frontend will attach images)
let fruits = [
  { id: 1, name: 'Cavendish Banana', price: 45, stock: 8 },
  { id: 2, name: 'Royal Gala Apple', price: 99, stock: 8 },
  { id: 3, name: 'Valencia Orange', price: 89, stock: 7 },
  { id: 4, name: 'Green Grapes', price: 129, stock: 5 },
  { id: 5, name: 'Alphonso', price: 149, stock: 3 },
  { id: 6, name: 'Strawberries', price: 199, stock: 0 },
  { id: 7, name: 'Kesar Mango', price: 159, stock: 6 },
  { id: 8, name: 'Pineapple', price: 119, stock: 4 },
  { id: 9, name: 'Kiwifruit', price: 79, stock: 10 },
  { id: 10, name: 'Pomegranate', price: 139, stock: 5 },
  { id: 11, name: 'Blueberries', price: 249, stock: 2 },
  { id: 12, name: 'Pear', price: 89, stock: 7 },
  { id: 13, name: 'Dragon Fruit', price: 199, stock: 3 },
  { id: 14, name: 'Papaya', price: 99, stock: 6 },
  { id: 15, name: 'Lemon', price: 29, stock: 20 },
  { id: 16, name: 'Lime', price: 25, stock: 18 },
  { id: 17, name: 'Blackberries', price: 279, stock: 1 },
  { id: 18, name: 'Raspberry', price: 169, stock: 5 },
  { id: 19, name: 'Coconut', price: 129, stock: 9 },
  { id: 20, name: 'Apricot', price: 119, stock: 6 },
  { id: 21, name: 'Guava', price: 69, stock: 12 },
  { id: 22, name: 'Fig', price: 189, stock: 4 }
];

// Simple health route
app.get('/', (req, res) => res.send('Fruit Counter backend running'));

// Return available fruits
app.get('/api/fruits', (req, res) => {
  return res.json(fruits);
});

// Decrement stock for a fruit id (no auth required)
app.post('/api/cart/add/:id', (req, res) => {
  const id = Number(req.params.id);
  const fruit = fruits.find(f => f.id === id);
  if (!fruit) {
    return res.status(404).json({ error: 'Fruit not found' });
  }
  if (fruit.stock <= 0) {
    return res.status(400).json({ error: 'Out of stock' });
  }
  fruit.stock -= 1;
  return res.json({ message: 'Added to cart', fruit });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});