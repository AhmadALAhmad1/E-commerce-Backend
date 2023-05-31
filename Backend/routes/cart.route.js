const express = require('express');
const router = express.Router();

const {
    createCart,
    getCart,
    deleteCart
} = require('../controllers/cart.controller');
// const { protect } = require("../middlewares/authMiddleware.js");


router.post('/add/:productId', createCart)
router.route('/get/:cartId').get(getCart)
router.route('/delete').delete(deleteCart)

module.exports = router;
