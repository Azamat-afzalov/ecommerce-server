const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './uploads/products');
    },
    filename: function (req,file,cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb(new AppError('Not an image! Please upload an image.',400), false);
    }
};

module.exports = multer({
    storage : storage,
    fileFilter : fileFilter
})