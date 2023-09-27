const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Define sample data (you can replace this with a database)
const products = [
  {
    id: 1,
    name: "Ketuncky Burger",
    category: "KFC",
    img: "https://images.deliveryhero.io/image/fd-pk/Products/980248.png?width=%s",
  },
  {
    id: 2,
    name: "Big Mack",
    category: "Mcdonalds",
    img: "https://i.insider.com/62212e77d72a250019740059?width=700",
  },
  {
    id: 3,
    name: "zingeratha",
    category: "KFC",
    img: "https://giftsandall.com/wp-content/uploads/2022/10/Zingeratha-Deal-From-KFC-copy-600x600.jpg",
  },
  {
    id: 5,
    name: "Big Mac Deal",
    category: "Mcdonalds",
    img: "https://www.mcdonalds.com/content/dam/sites/usa/nfl/publication/1PUB_PaypalVenmo_v2_2236x1040.jpg",
  },
];

// Get all products
app.get("/products", (req, res) => {
  res.json(products);
});

// Get product by ID
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

// Get all categories
app.get("/categories", (req, res) => {
  // Extract unique categories from products
  const categories = [...new Set(products.map((p) => p.category))];
  res.json(categories);
});

// Search for products by category
app.get("/search", (req, res) => {
  const category = req.query.category;
  const matchingProducts = products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
  res.json(matchingProducts);
});

// Add more routes for CRUD operations as needed

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
