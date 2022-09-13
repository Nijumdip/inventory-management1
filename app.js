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
  }, {
    timestamps: true,
  }
);

// Model
const Product = mongoose.model('Product', productSchema)

app.get("/", (req, res) => {
  res.send("Route is working ! YaY !");
});

// posting to database
app.post("/api/v1/product", async(req, res,next) => {
    // res.send("It is working ! ");
    // console.log(req.body)
    // save or create
    try {
        // save
       /*  const product = new Product(req.body);
        if (productSchema.quantity == 0) {
            Product.status='Out-of-stock'
        }
        const result = await product.save(); */
        
        // create
        const result = await Product.create(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Data inserted successfully',
            data: result
        })
    }
    catch (error){
        res.status(400).json({
            status: 'failed',
            message: 'Data is not inserted ',
            error: error.message
        })
    }
   
});

module.exports = app;
