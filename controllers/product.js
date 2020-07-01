const Product = require('../models/product');
const fs = require('fs');
const path = require('path');

exports.getAllProducts = async(req, res, next) => {
    try {
        const products = await Product.find().populate('category').populate('subcategory');
        res.status(200).json({
            success : true,
            products : products
        });
    } catch (error) {
        next(error);
    }
};

exports.postProduct = async(req, res, next) => {
    const { files } = req;
    const {
        title,
        price,
        category,
        subcategory,
        amount,
        size,
        description,
        details,
        status
    } = req.body;
    const images = [];
    for(const file of files) {
        const url = file.path.replace(/\\/g, '/');
        images.push({path : url});
    };
    try {
        const product = new Product({
            title,
            price,
            category,
            subcategory,
            images,
            amount,
            size,
            description,
            details,
            status
        });
        const newProduct = await product.save();
        return res.status(201).json({
            success : true,
            message : 'New Product created',
            product : newProduct
        })
    } catch (error) {
        next(error);
    }
}

exports.getProduct = async(req, res, next) => {
    const {productId} = req.params;
    try {
        const product = await Product.findById(productId);
        if(!product){
            const error = new Error('Product not found');
            error.code = 404;
            throw error;
        }
        return res.status(200).json({
            success : true,
            product : product
        })
    } catch (error) {
        next(error);
    }
}

exports.updateProduct = async(req, res, next) => {
    const { files } = req;
    const {productId} = req.params;
    const {
        title,
        price,
        category,
        subcategory,
        amount,
        size,
        description,
        details,
        status
    } = req.body;
    const images = req.body.images || [];
    if(files && images.length < 1){
        for(const file of files) {
            const url = file.path.replace(/\\/g, '/');
            images.push({path : url});
        };
    }
    try {
        const product = await Product.findById(productId);
        const imgs = product.images;
        for(const img of imgs){
            clearImage(img.path);
        }
        product.title = title;
        product.price = price;
        product.category = category;
        product.subcategory = subcategory;
        product.amount = amount;
        product.size = size;
        product.description = description;
        product.details = details;
        product.status = status;
        product.images = images; // TODO frontendchi bilan shu joyini kelishib olish
        const updatedProduct = await product.save();
        return res.status(200).json({
            success : true,
            product : updatedProduct
        })
    } catch (error) {
        next(error);
    }

}

exports.deleteProduct = async(req, res, next) => {

}
const clearImage = (filePath) => {
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, (err) => {
        console.log(err);
    });
};
