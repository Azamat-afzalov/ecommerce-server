const express = require('express');
const upload = require('../middlewares/imageUpload');
const {
    getAllProducts,
    postProduct,
    getProduct,
    updateProduct
} = require('../controllers/product');


const router = express.Router();

router.post('/',upload.array('products',8),postProduct);
router.get('/',getAllProducts);
router.get('/:productId',getProduct);
router.patch('/:productId',upload.array('products',8),updateProduct);

module.exports = router;