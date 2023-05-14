const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/products.model.js");
const productsModel = require("../models/products.model.js");



// Create a new product
const CreateProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, size, subCatID } = req.body;
        const product = new ProductModel({
            name, description, price, size, subCatID,
            image: req.file.path,

        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
    }
});

// Get all products
const GetAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await ProductModel.find().populate('subCatID');
        const productsWithImage = products.map(item => {
            return {
                _id: item._id,
                name: item.name,
                description: item.description,
                price: item.price,
                size: item.size,
                image: `${req.protocol}://${req.get('host')}/${item.image}`,
                subCatID: item.subCatID
            }
        });
        return res.status(200).json({
            status: 200,
            success: true,
            data: productsWithImage
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
});



// Get a specific product
const GetProductByID = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const product = await ProductModel.findById(id).populate('subCatID');
        if (!product) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: `product with id=${id} doesn't exist`,
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            data: {
                _id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                size: product.size,
                image: `${req.protocol}://${req.get('host')}/${product.image}`,
                subCatID: product.subCatID
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
    }
})

// Update a product
const UpdateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }

        let imageUrl = product.image;
        if (req.file) {
            imageUrl = req.file.path;
        }

        const updatedItem = await productsModel.findByIdAndUpdate(
            id,
            {
                name: req.body.name || product.name,
                description: req.body.description || product.description,
                price: req.body.price || product.price,
                size: req.body.size || product.size,
                image: imageUrl,
                subCatID: product.subCatID

            },
            { new: true }
        );

        return res.status(200).json({ message: "successfully updated", updatedItem });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

const DeleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id).populate('subCatID');
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
    }
});

module.exports = {
    CreateProduct,
    GetAllProducts,
    GetProductByID,
    UpdateProduct,
    DeleteProduct
};
