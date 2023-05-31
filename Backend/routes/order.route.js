const express = require('express');
const router = express.Router();

const {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/order.controller');
// const { protect } = require("../middlewares/authMiddleware.js");


router.post('/create', createOrder)
router.route('/').get(getOrders)
router.route('/:id').get(getOrderById)
router.route('/:id').put(updateOrder)
router.route('/:id').delete(deleteOrder)

module.exports = router;
