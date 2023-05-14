const asyncHandler = require("express-async-handler");
const express = require('express');
const mongoose = require('mongoose');
const subCategoryModel = require('../models/subCategory.model.js');

// Create a new subcategory
const createSubCat = asyncHandler(async (req, res) => {
  try {
    const { name, CategoryID } = req.body;
    const subCategory = new subCategoryModel({ name, CategoryID });
    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Get all subcategories
const getAllSubCat = asyncHandler(async (req, res) => {
  try {
    const subCategories = await subCategoryModel.find().populate('CategoryID');
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific subcategory
const getSubCat = asyncHandler(async (req, res) => {
  try {
    const subCategory = await subCategoryModel.findById(req.params.id).populate('CategoryID');
    if (!subCategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    res.json(subCategory);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a subcategory
const updateSubCat = asyncHandler(async (req, res) => {
  try {
    const { name, CategoryID } = req.body;
    const subCategory = await subCategoryModel.findByIdAndUpdate(
      req.params.id,
      { name, CategoryID },
      { new: true }
    ).populate('CategoryID');
    if (!subCategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    res.json(subCategory);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Delete a subcategory
const deleteSubCat = asyncHandler(async (req, res) => {
  try {
    const subCategory = await subCategoryModel.findByIdAndDelete(req.params.id).populate('CategoryID');
    if (!subCategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    res.json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

module.exports = {
  createSubCat,
  getAllSubCat,
  getSubCat,
  updateSubCat,
  deleteSubCat
};
