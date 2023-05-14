const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const products = new mongoose.Schema({

    name: {
        type: String,
    },

    description: {
        type: String,
    },

    price: {
        type: Number,
    },

    size: {
        type: String,
    },

    subCatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
        required: true,
    },

    image: {
        type: String,
    },


},
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("Products", products);