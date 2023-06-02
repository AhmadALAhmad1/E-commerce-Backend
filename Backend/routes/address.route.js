const express = require("express");
const router = express.Router();
const {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} = require("../controllers/address.controller.js");
// const { protect } = require("../middlewares/authMiddleware.js");

router.post('/createAddress', createAddress)
router.route('/').get(getAddresses)
router.route('/:id').get(getAddressById).patch(updateAddress).delete(deleteAddress)

module.exports = router;
