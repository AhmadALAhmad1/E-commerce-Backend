const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user.route.js")
const addressRoute = require("./routes/address.route.js")
const categoryRoute = require("./routes/category.route.js")
const subCategoryRoute = require("./routes/subCategory.route.js")
const productsRoute = require("./routes/products.route.js")
const cartRoute = require("./routes/cart.route.js")
const orderRoute = require("./routes/order.route.js")

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();
const corsOptions = {
    origin: "*",
};
app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
// To parse URL encoded data
app.use(express.urlencoded({ extended: false }))

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//Multer
app.use('/uploads',express.static('uploads'))
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
//API'S
app.use('/users', userRoute);
app.use('/address', addressRoute);
app.use('/cat', categoryRoute);
app.use('/subCat', subCategoryRoute);
app.use('/products', productsRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
