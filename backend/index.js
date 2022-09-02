const express = require("express");
const cors = require("cors");

require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();

app.use(express.json());
app.use(cors());

// Register Or add New User Api
app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
});

// LogIN Api
app.post("/login", async (req, resp) => {

    if (req.body.password && req.body.email) {

        let user = await User.findOne(req.body).select("-password");

        if (user) {
            resp.send(user);
        } else {
            resp.send({ result: "No User Found" });
        }

    } else {
        resp.send({ result: "No User Found" });
    }

});

// Add Produt Api
app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

// Show All Products Api
app.get("/products", async (res, resp) => {
    const products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "No Product Found." });
    }
});

// Delete Product Api
app.delete("/product/:id", async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(req.params);
});

// Get Single Product Api
app.get("/product/:id", async (res, resp) => {
    let result = await Product.findOne({ _id: res.params.id });

    if (result) {
        resp.send(result);
    } else {
        resp.send({ "Result": "No Record Found." })
    }

});

// Update Product Api
app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { id: req.params.id },
        { $set: req.body }
    )

    resp.send(result);

});

// Api For Search Product
app.get('/search/:key', async (req, resp) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            },
        ]
    });
    resp.send(result);
});

app.listen( 5000 );