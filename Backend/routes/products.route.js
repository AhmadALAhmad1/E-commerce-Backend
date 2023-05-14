const express = require('express');
const multer = require('multer');
const router = express.Router();

const {
    CreateProduct,
    GetAllProducts,
    GetProductByID,
    UpdateProduct,
    DeleteProduct
} = require('../controllers/products.controller');
// const { protect } = require("../middlewares/authMiddleware.js");

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const uploadMiddlewares = multer({
    storage,
});


router.post('/', uploadMiddlewares.single("image"), CreateProduct)
router.route('/').get(GetAllProducts)
router.route('/:id').get(GetProductByID)
router.route('/:id', uploadMiddlewares.single("image")).put(UpdateProduct)
router.route('/:id').delete(DeleteProduct)

module.exports = router;
