import express from 'express';
import { services } from './backend products/data.js';
import { products } from './backend products/products.js';

const router = express.Router();

// mounted at /api
router.get('/about', (req, res) => {
  res.status(200).json({
    app: "PrimeNexus",
    version: "1.0.0",
    description: "PrimeNexus is a cutting-edge platform designed to streamline project management and enhance team collaboration through intuitive tools and real-time communication.",
    poweredby: "Nottidge.dev platform",
  });
});

router.get('/about/services', (req, res) => {
  res.status(200).json(services);
});

//GET all products with all details
router.get('/about/products', (req, res) => {
  res.status(200).json(products);
});

//GET all products with limited details
router.get('/about/productdetail', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, image, name } = product;
    return { id, image, name };
  });
  res.status(200).json(newProducts);
});

//GET specific product and its details based on their id (route parameter)
router.get('/about/productdetail/:productID', (req, res) => {
  console.log(req.params);
  const { productID } = req.params;
  const singleProduct = products.find((product) => product.id === productID);
  if (!singleProduct) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json(singleProduct);
  //NB: the route parameter is always a string, so sometimes you might want to Number(productID)
  //  and the name of the placeholder(:productID) can be anything
});

// GET specific products using query string parameters
router.get('/about/products/query', (req, res) => {
  console.log(req.query);
  const { search, limit } = req.query;
  let sortedProducts = [...products]; // create a copy to avoid mutating original

  if (search) { // if search param exists
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.toLowerCase().startsWith(search.toLowerCase());
    });
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  if (sortedProducts < 1) {
    // return res.status(200).send('no products matched your search');
    return res.status(200).json({ success: true, data: [] });
  }

  res.status(200).json(sortedProducts);
});

//NB: whenever you have multiple routes, order matters. Place more specific routes
//  first before general ones. also, always 'return' after sending a response (mostly with IF conditions) to 
// avoid errors or clashes with the res.json() commands because res.json() is also terminal command just like res.send() and return statements.
// nothing runs after they are executed.

export default router; 