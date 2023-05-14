const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
    {
        UserID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        AddressID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: true,
        },

        products: [
            {
                productID: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, 'Quantity can not be less then 1.']
                },
                price: { Number }
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
