const express = require("express");
const {
    addCategory,
    getAllCategories,
    addSubcategory,
    getCategory,
    deleteCategory,
    getAllSubcategories,
    getSubcategory
} = require("../controllers/category");
const router = express.Router();

// Subcategory routes
router.post("/subcategory", addSubcategory);
router.get( "/subcategory", getAllSubcategories);
router.get( "/subcategory/:subcategoryId", getSubcategory);

// Category routes
router.get("/", getAllCategories);
router.post("/", addCategory);
router.get("/:categoryId", getCategory);
router.delete("/:categoryId", deleteCategory);

module.exports = router;
