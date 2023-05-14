const express = require("express");
const router = express.Router();
const {
    
    getallCat,
    getCat,
    createCat,
    updateCat,
    deleteCat,

} = require("../controllers/category.controller.js");
// const { protect } = require("../middlewares/authMiddleware.js");

router.post('/', createCat)
router.route('/').get(getallCat)
router.route('/:id').get(getCat).put(updateCat).delete(deleteCat)

module.exports = router;
