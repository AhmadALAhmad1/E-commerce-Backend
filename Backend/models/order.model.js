const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
    {
        UserID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            // required: true,
        },

        AddressID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            // required: true,
        },

        cart: [{
            product_id: {
                type: Schema.Types.ObjectId,
                ref: 'Products'
            },
            name: {
                type: String,
                // required: true
            },
            size: {
                type: String,
                // required: true
            },
            quantity: {
                type: Number,
                // required: true,
                min: 0
            },
            price: {
                type: Number,
                // required: true
            }
        }],

        status: {
            type: String,
            enum: ["pending", "completed", "cancelled"],
            default: "pending",
        },

        total: {
            type: Number,
            // required: true,
        },

    },
    { timestamps: true }
);

module.exports = model("Order", orderSchema);
