const Product = require('../models/product');
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
    const {files} = req;
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
    console.log('REQ BODY : \n' , req.body);
    const images = [];
    for(const file of files) {
        const url = file.path.replace(/\\/g, '/');
        images.push({path : url});
    };

    try {
        // const product = new Product({
        //     title : title,
        //     price : price,
        //     category : category,
        //     subcategory : subcategory,
        //     images : images,
        //     amount : amount,
        //     size : size,
        //     description : description,
        //     details : details,
        //     status : status
        // })
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

}