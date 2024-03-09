import mongoose from "mongoose";
import { Schema } from "mongoose";

const CartSchema = Schema({
    pName: {
        type: String,
        required: true
    },
    count:{
        type: Number,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    
})

export const CartProducts = mongoose.model("cartData", CartSchema)