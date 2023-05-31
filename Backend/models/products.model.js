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

    CatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },

    image: {
        type: String,
    },

    // quantity: {
    //     type: String,
    // },

},
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("Products", products);