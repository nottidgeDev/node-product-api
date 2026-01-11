/* controllers/productController.js
   Purpose: Request handlers for Product-related API endpoints.
   Notes:
   - Each handler receives an Express `req` and `res`.
   - Handlers perform Sequelize model operations and send JSON responses.
   - Errors are returned with appropriate HTTP status codes.
*/
import Product from "../models/product.js";

// GET /api/products — return list of all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    // Generic 500 for DB failures; message kept minimal for clients
    res.status(500).json({ error: "Failed to retrieve products." });
  }
};

// GET /api/products/:id — return a single product by primary key
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      // If no row found, send 404
      res.status(404).json({ error: "Product not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve product." });
  }
};

// POST /api/products — create a new product using request body
export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    // Return created resource and 201 status
    res.status(201).json(newProduct);
  } catch (error) {
    // In production, validate payload and return 400 for client errors instead
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/products/:id — update an existing product
export const updateProduct = async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      // Fetch and return updated resource
      const updatedProduct = await Product.findByPk(req.params.id);
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/products/:id — remove a product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: "Product deleted successfully." });
    } else {
      res.status(404).json({ error: "Product not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};    