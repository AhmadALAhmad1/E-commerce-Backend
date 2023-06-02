// const mongoose = require("mongoose");

// const addressSchema = new mongoose.Schema(
//     {
//         userID: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             // required: true,
//         },
//         name: {
//             type: String,
//             required: true,
//         },
//         phone: {
//             type: Number,
//             required: true,
//         },
//         email: {
//             type: String,
//             required: true,
//         },
//         city: {
//             type: String,
//             required: true,
//         },
//         street: {
//             type: String,
//             required: true,
//         },
//         building: {
//             type: String,
//             required: true,
//         },

//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model("Address", addressSchema);

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
      validate: {
        validator: function (value) {
          // Validate phone number format (e.g., 1234567890)
          return /^\d{10}$/.test(value);
        },
        message: "Phone number is invalid",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (value) {
          // Validate email format
          return /\S+@\S+\.\S+/.test(value);
        },
        message: "Email address is invalid",
      },
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    street: {
      type: String,
      required: [true, "Street is required"],
    },
    building: {
      type: String,
      required: [true, "Building is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);


