const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartSchema = new Schema(
    {

        UserID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, 'Quantity can not be less then 1.'],
                    default: 1
                },
                price: { Number }
            }],

        total: {
            type: Number,
            default: 0.0
        },
    },
    { timestamps: true }
);

module.exports = model("Cart", cartSchema);
