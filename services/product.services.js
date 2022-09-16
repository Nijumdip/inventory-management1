const Product = require('../models/Product');


exports.getProductsServices = async () => {
    const products = await Product.find({});
    return products
}


exports.createProductService = async (data) => {
    const product = await Product.create(req.data);
    return product
}