const asyncHandler = require("express-async-handler");
const Category = require('../models/category.model.js');

// Create a new category
const createCat = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.create({ name });
        res.status(201).json({ category });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all categories
const getallCat = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find();
        res.json( categories );
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a single category by ID
const getCat = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json( category );
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a category by ID
const updateCat = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ category });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a category by ID
const deleteCat = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: 'Category deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = {
    getallCat,
    getCat,
    createCat,
    updateCat,
    deleteCat,
};
