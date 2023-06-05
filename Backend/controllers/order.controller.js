const Order = require("../models/order.model.js");
const Cart = require("../models/cart.model.js");
const User = require("../models/user.model.js");
const Product = require("../models/products.model.js");
const Address = require("../models/address.model.js");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
    try {
        const { cart, total, UserID, AddressID } = req.body;

        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ error: 'Invalid cart items' });
        }

        const orderItems = cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            product_id: item.product_id,

        }));

        const order = await Order.create({
            UserID: UserID,
            AddressID: AddressID,
            cart: orderItems,
            total: total,

        });

        // Retrieve the populated order
        const orders = await Order.find()
            .populate('AddressID')
            .populate('UserID')
            .exec();

        res.send(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});





const getOrders = asyncHandler(async function (req, res) {
    try {
        const orders = await Order.find()
            .populate('AddressID')
            .populate('UserID')
            .exec();

        res.send(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


//get order by ID
const getOrderById = asyncHandler(async (req, res) => {
    const { UserID } = req.params;
    try {

        const order = await Order.findById(UserID).lean()
            .populate('AddressID')
            .populate('UserID');

        if (order) {
            res.send(order);
        }

    }
    catch (error) {
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
    try {
        const orderId = req.params.id;

        const order = await Order.findById(orderId);
        if (order) {
            await order.remove();
            res.send({ message: "Order deleted" });
        } else {
            res.status(404).send("Order not found");
        }
    } catch (error) {
        res.status(500).send("Error deleting order");
    }
});


module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}