import express, { type Request, type Response } from 'express';

const app = express();
const PORT = 3000;

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: 101, name: "Mechanical Keyboard", price: 120, inStock: true },
  { id: 102, name: "Wireless Mouse", price: 50, inStock: true },
  { id: 103, name: "UltraWide Monitor", price: 450, inStock: false }
];


app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express!');
});

// Returns all products
app.get('/api/products', (req: Request, res: Response) => {
  res.json(products);
});

// Returns a single product by ID
app.get('/api/products/:id', (req: Request, res: Response) => {

 // If id is undefined, it uses ""
const productID = parseInt(req.params.id || "");

  const product = products.find((p) => p.id === productID);

  if (!product) {
    // If product is not found, send a 404 status code
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

app.use(express.json());
app.post('/api/submit', (req: Request, res: Response) => {
  // Access the data sent by the client
  const incomingData = req.body;

  // Log it to the console
  console.log('📦 Received POST Data:', incomingData);

  // Send a response back to the client
  res.status(201).json({
    message: "Received!",
    youSent: incomingData
  });
});
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});