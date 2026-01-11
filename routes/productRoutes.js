/* routes/productRoutes.js
   Purpose: Define express routes for product-related endpoints.
   Notes:
   - This router is mounted at `/api/products` in `index.js`.
   - Each route delegates request handling to `controllers/productController.js`.
*/
import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;