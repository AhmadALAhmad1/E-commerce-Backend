const asyncHandler = require("express-async-handler");
const Address = require("../models/address.model.js");
// Create new address


// Create new address
const createAddress = asyncHandler(async (req, res) => {
    const { name, phone, email, city, street, building } = req.body;
    const { userID } = req.params;
  
    const address = await Address.create({
      userID,
      name,
      phone,
      email,
      city,
      street,
      building,
    });
  
    // Populate the userID field with the corresponding user document
    await address.populate('userID');
  
    res.status(201).send({
      message: "Successfully created an address",
      address,
    });
  });
  
// Get all addresses
const getAddresses = asyncHandler(async (req, res) => {
    const addresses = await Address.find();
    res.status(200).json({
        success: true,
        data: addresses,
    });
});

// Get single address
const getAddressById = asyncHandler(async (req, res) => {
    let id = req.params.id;
    const address = await Address.findOne({ userID: id });

    if (address) {
        res.status(200).json({
            success: true,
            data: address,
        });
    } else {
        res.status(404);
        throw new Error("Address not found");
    }
});

// Update an address
const updateAddress = asyncHandler(async (req, res) => {
    let id = req.params.id;

    const address = await Address.findOne({ userID: id });
    if (!address) {
        res.status(400);
        throw new Error("address not found");
    } else {
        address.name = req.body.name;
        address.phone = req.body.phone;
        address.email = req.body.email;
        address.city = req.body.city;
        address.street = req.body.street;
        address.building = req.body.building;
    }

    updated = await address.save();

    res.status(200).json(updated);
});

// Delete an address
const deleteAddress = asyncHandler(async (req, res) => {
    const address = await Address.findByIdAndRemove(req.params.id);

    if (!address) {
        res.status(404);
        throw new Error("Address not found");
    }
    res.status(200).json({
        success: true,
        message: `Address with the id ${req.params.id} removed`,
    });
});

module.exports = {
    createAddress,
    getAddresses,
    getAddressById,
    updateAddress,
    deleteAddress,
};
