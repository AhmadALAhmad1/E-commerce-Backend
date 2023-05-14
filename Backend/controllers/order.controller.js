const Order = require("../models/order.model.js");
const Cart = require("../models/cart.model.js");
const User = require("../models/user.model.js");
const asyncHandler = require("express-async-handler");



//create Order
// const createOrder = asyncHandler(async (req, res) => {
//     const { UserID, AddressID, products, total } = req.body;

//     const order = await Order.create({ UserID, AddressID, products, total });
//     res.status(201).send(order);
// });
const createOrder = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the cart and user in the database
        let cart = await Cart.findOne({ userId });
        let user = await User.findOne({ _id: userId });

        if (cart) {
            // Create an order using the cart data
            const order = await Order.create({
                UserID: userId,
                AddressID: user.addressId,
                products: cart.products,
                status: "pending",
                total: cart.total
            });

            // Delete the cart after successful checkout
            const data = await Cart.findByIdAndDelete({ _id: cart.id });

            return res.status(201).send(order);
        } else {
            res.status(500).send("You do not have items in cart");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});



//get Orders
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find();
    res.send(orders);
});

//get order by ID
const getOrderById = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send("Order not found");
    }
});



//update order
const updateOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const { UserID, AddressID, products, status, total } = req.body;

    const order = await Order.findById(orderId);
    if (order) {
        order.UserID = UserID;
        order.AddressID = AddressID;
        order.products = products;
        order.status = status;
        order.total = total;

        const updatedOrder = await order.save();
        res.send(updatedOrder);
    } else {
        res.status(404).send("Order not found");
    }
});

//delete order
const deleteOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (order) {
        await order.remove();
        res.send({ message: "Order deleted" });
    } else {
        res.status(404).send("Order not found");
    }
});

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}