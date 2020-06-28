const Category = require('../models/category');
const Subcategory =  require('../models/subcategory');

exports.addCategory = async(req,res,next) => {
    const {title} = req.body;
    const { subcategories } = req.body; // OPTIONAl
    try {
        let subs;
        if(subcategories){
            subs = subcategories.map(subcategory => (
                {
                    subcategoryId : subcategory
                }
            ))
        }
        const category = new Category({
            title : title,
            subcategories : subcategories ? subs : []
        });
        const newCategory = await category.save();
        subcategories.forEach(async subcategory => {
            const subc = await Subcategory.findByIdAndUpdate(subcategory,{
                categoryId : category._id
            });
            await subc.save();
        })
        return res.status(201).json({
            success : true,
            message : `Added new category ${title}`,
            category : newCategory
        });
    } catch (error) {
        return next(error);
    }
};

exports.getAllCategories = async(req,res,next) => {
    try {
        const categories = await Category.find().populate('subcategories.subcategoryId');
        return res.status(200).json({
            success : true,
            categories : categories
        })
    } catch (error) {
        next(error);
    }
};

exports.deleteCategory = async(req, res, next) => {
    const {categoryId} = req.params;
    try {
        const category = await Category.findOne({_id : categoryId});
        if(!category){
            const error = new Error('category not found');
            error.statusCode = 404;
            throw error;
        }
        await Category.findByIdAndRemove(categoryId);
        return res.status(200).json({
            success : true,
            message : `removed ${category.title} from categories`
        })
    } catch (error) {
        next(error);
    }
};

exports.getCategory = async (req, res, next) => {
    const {categoryId} = req.params;
    try {
        const category = await Category.findById(categoryId);
        if(!category){
            const error = new Error('category not found');
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).send({
            success : true,
            category : category
        })
    } catch (error) {
        next(error);
    }
};

exports.addSubcategory = async(req, res, next) => {
    const {categoryId , subcategoryTitle } = req.body;
    try {
        const category = await Category.findOne({_id : categoryId});
        if(!category){
            const error = new Error('category not found');
            error.statusCode = 404;
            throw error;
        }
        const subcategory = new Subcategory({
            title : subcategoryTitle,
            categoryId : categoryId
        });
        const newSubcategory = await subcategory.save();

        category.subcategories.push({
            subcategoryId : newSubcategory._id
        });
        await category.save();
        res.status(201).json({
            success : true,
            message : `${subcategoryTitle} added to ${category.title}`
        })

    } catch (error) {
        return next(error);
    }
};

exports.getAllSubcategories = async(req, res, next) => {
    try {
        const subcategories = await Subcategory.find().populate('categoryId');
        return res.status(200).json({
            success : true,
            subcategories : subcategories
        })
    } catch (error) {
        next(error);
    }
};

exports.getSubcategory = async (req, res, next) => {
    const {subcategoryId} = req.params;
    try {
        const subcategory = await Subcategory.findById(subcategoryId).populate('categoryId');
        if(!subcategory){
            const error = new Error('subcategory not found');
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({
            success : true,
            subcategory : subcategory
        })
    } catch (error) {
        next(error);
    }
};