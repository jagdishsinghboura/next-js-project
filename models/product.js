import mongoose, { model, Schema } from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,  // Corrected the typo here
    price: Number,
    category: String,
    picture: String
});

const Products = mongoose.models.Products || model("Products", ProductSchema);  

export default Products;
