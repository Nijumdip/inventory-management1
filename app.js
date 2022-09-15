const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middleWares

app.use(express.json());
app.use(cors());

// Schema -> Model -> Query
// schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be  at least 3 characters."],
      maxLength: [100, "Name is too large."],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative."],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs.",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative."],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be an integer .",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message:
          "unit value can't be {VALUE}, must be in-stock/out-of-stock/discontinued",
      },
    },
    /* supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    categories: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: mongoose.Schema.Types.ObjectId, 
      },
    ],
    createdAt: {
        type: Date,
        default:  Date.now
    },
    updatedAt: {
        type: Date,
        default:  Date.now
    }, */
  },
  {
    timestamps: true,
  }
);

// mongoose middleWares  for saving data : pre /post
productSchema.pre("save", function (next) {
  console.log("Before saving data");
  if (this.quantity == 0) {
    this.status = "Out-of-stock";
  }

  next();
});

/* productSchema.post("save", function (doc, next) {
  console.log('After saving data');

  next();
}) */

productSchema.methods.logger= function(){
  console.log(`Data saved for ${this.name}`);
}


// Model
const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send("Route is working ! YaY !");
});


// creating to database
app.post("/api/v1/product", async (req, res, next) => {
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
    const result = await Product.create(req.body);
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
});


// getting to database
app.get("/api/v1/product", async (req, res, next) => {
  try {
    // const products = await Product.find({});
    // const products = await Product.find({_id: "6320b9e9fe12ffba777e5996", name:"Chal"});
    // const products = await Product.find({ $or: [{ _id: "6320b9e9fe12ffba777e5996" }, { name: "Chal" }] });
    // const products = await Product.find({ status: {$ne: "out-of-stock"} });
    // const products = await Product.find({ quantity: {$gt: 100} });
    // const products = await Product.find({ quantity: {$gte: 100} });
    // const products = await Product.find({ name: {$in: ["Chal", "Dhal"]} });
    // const products = await Product.find({}, "name quantity");
    // const products = await Product.find({}, "-name -quantity");
    // const products = await Product.find({}).limit(1);
    // const products = await Product.find({}).sort({quantity: -1});
    // const products = await Product.find({}).select({name: 1});
    // const products = await Product.where("name").equals("Chal").where("quantity").gt(100)
    // const products = await Product.where("name").equals(/\w/).where("quantity").gt(100).limit(2)
   /*  const products = await Product
      .where("name").equals(/\w/)
      .where("quantity").gt(100).lt(600)
      .limit(2).sort({quantity: -1}) */
      const product = await Product.findById("6320b9e9fe12ffba777e5996");

    res.status(200).json({
      status: "success",
      message: "Data getting successfully",
      data: product,
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Can't get the data",
      error: error.message,
    });
  }
});




module.exports = app;
