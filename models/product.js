/* models/product.js
   Purpose: Define the Product model used by Sequelize to map JS objects to DB rows.
   Summary:
   - Each key below becomes a database column
   - Sequelize will pluralize model name to form the table name by default (e.g., "Products")
   - Add `autoIncrement: true` to `id` if you want automatic id assignment
*/
import { DataTypes } from "sequelize";
import sequelize from "../config.js";

/* Product model fields:
   - id: integer primary key (consider `autoIncrement` to auto-assign ids)
   - name: required product name
   - description: optional detailed text
   - price: decimal price with 2 decimals, defaults to 0.00
   - quantity: available stock count, defaults to 0
*/
const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default Product;
