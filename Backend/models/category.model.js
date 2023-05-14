const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const category = new mongoose.Schema({

    name: {
        type: String,
    }
},
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Category", category);