import { AllProducts } from "../model/ProductsModel.js";
import { CartProducts } from "../model/Cart.js";
export const allProducts = async (req, res) => {
  try {
    const templates = await AllProducts.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export const createCart = async (req, res) => {
  try {
    const { pName } = req.body;
    if (!pName) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const prod = await CartProducts.findOne({ pName });
    if (prod) {
      console.log(req.body);
      prod.count += 1;
      const data = await CartProducts.updateOne(
        { pName: pName },
        { $inc: { count: 1 } }
      );
      res.status(200).json({ data, message: "One More added To Cart" });
    } else {
      const single = await AllProducts.findOne({ pName: pName });
      console.log(single)
      const data = await CartProducts.create({ pName, count: 1,price:single.price });
      res.status(200).json({ data, message: "Added To Cart" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
export const deleteCart = async (req, res) => {
  try {
    const { pName } = req.body;
    if (!pName) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const prod = await CartProducts.findOne({ pName });
    if (prod) {
      console.log(req.body);
      prod.count -= 1;
      const data = await CartProducts.updateOne(
        { pName: pName },
        { $inc: { count: -1 } }
      );
      res.status(200).json({ data, message: "One More added To Cart" });
    } else {
      const data = await CartProducts.create({ pName, count: 1 });
      res.status(200).json({ data, message: "Added To Cart" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};




export const Newcart = async (req, res) => {
  try {
    const data = await CartProducts.deleteMany({});
    res.status(204).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
export const showCart = async (req, res) => {
  let totalPrice = 0;
  let disCountPrice =0;
  try {
    const cartProducts = await CartProducts.find();
    for (const product of cartProducts) {
      const prodprice = await calculatePrice(product);
      totalPrice += prodprice.cp;
      disCountPrice += prodprice.sp;
    }
    if (disCountPrice>150) {
        disCountPrice -=20;
    }
    res.status(200).json({ cartProducts, totalPrice,disCountPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function calculatePrice(product) {
  const single = await AllProducts.findOne({ pName: product.pName });
  if (single) {
    if (product.pName === "A") {
      let discPrice = Math.floor((product.count / 3)) * 75;
      let actPrice = (product.count % 3) * single.price;
      return {sp:discPrice + actPrice,cp:product.count*single.price};
    } else if (product.pName === "B") {
      let discPrice = Math.floor((product.count / 2)) * 35;
      let actPrice = (product.count % 2) * single.price;
      return {sp:discPrice + actPrice,cp:product.count*single.price};
    } else {
      return {sp:product.count*single.price,cp:product.count*single.price};
    }
  }
}
