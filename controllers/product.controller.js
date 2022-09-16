const { getProductsServices, createProductService } = require("../services/product.services");


exports.getProducts = async (req, res, next) => {
    try {
        const products = await getProductsService();
      res.status(200).json({
        status: "success",
        data: products
      })
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: "Can't get the data",
        error: error.message,
      });
    }
}
  

exports.createProduct=async (req, res, next) => {
    // res.send("It is working ! ");
    // console.log(req.body)
    // save or create
    try {
      // save
      /*  const product = new Product(req.body);
          if (product.quantity == 0) {
              product.status='Out-of-stock'
          }
          const result = await product.save(); */
  
      // create
        const result = await createProductService();
        result.logger()
      res.status(200).json({
        status: "success",
        message: "Data inserted successfully",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: "Data is not inserted ",
        error: error.message,
      });
    }
  }