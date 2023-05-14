const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const subCategory = new mongoose.Schema({

    name: {
        type: String,
    },

    CategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },

},

    { timestamps: true, }

);
module.exports = mongoose.model("subCategory", subCategory);