import express from "express"
import mongoose from "mongoose"

import cors from "cors"
import product from "./routes/product.js"

const server = express()

server.use(express.json());
server.use(cors());
main()
async function main() {
    await mongoose.connect("mongodb+srv://shivamdevhare:T0pIrhCznohJdlxE@cluster0.gq6xcsk.mongodb.net/Wolf-it-Ecommers?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log("database connected"));
}


server.use("/", product)




server.listen(8080, () => {
    console.log(`server started at port 8080`);
});