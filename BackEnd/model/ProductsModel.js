import mongoose from "mongoose";
import { Schema } from "mongoose";

const ProductSchema = Schema({
    pName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    
})

export const AllProducts = mongoose.model("productData", ProductSchema)