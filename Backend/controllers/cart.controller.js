const asyncHandler = require("express-async-handler");
const Cart = require("../models/cart.model.js");
const Products = require("../models/products.model.js");

const getCart = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart && cart.products.length > 0) {
      res.send(cart);
    }
    else {
      res.send(null);
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
})


const createCart = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let product = await Products.findOne({ _id: productId });
    if (!product) {
      res.status(404).send('product not found!')
    }
    const price = product.price;
    const name = product.name;

    if (cart) {
      // if cart exists for the user
      let productIndex = cart.products.findIndex(p => p.productId == productId);

      // Check if product exists or not
      if (productIndex > -1) {
        let productItem = cart.products[productIndex];
        productItem.quantity += quantity;
        cart.products[productIndex] = productItem;
      }
      else {
        cart.products.push({ productId, name, quantity, price });
      }
      cart.total += quantity * price;
      cart = await cart.save();
      return res.status(201).send(cart);
    }
    else {
      // no cart exists, create one
      const newCart = await Cart.create({
        userId,
        products: [{ productId, name, quantity, price }],
        total: quantity * price
      });
      return res.status(201).send(newCart);
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
})


const deleteCart = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  try {
    let cart = await Cart.findOne({ userId });
    let productIndex = cart.products.findIndex(p => p.productId == productId);
    if (productIndex > -1) {
      let productItem = cart.products[productIndex];
      cart.total -= productItem.quantity * productItem.price;
      cart.products.splice(productIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
})

module.exports = {
  getCart,
  createCart,
  deleteCart
}