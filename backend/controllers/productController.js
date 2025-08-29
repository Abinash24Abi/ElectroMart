const Product = require("../models/Product");

// Get all products with filters
exports.getProducts = async function(req, res) {
  try {
    const { search, brand, category, stock } = req.query;
    let filter = {};

    if (search) filter.name = { $regex: search, $options: "i" };
    if (brand) filter.brand = brand;
    if (category) filter.category = category;
    if (stock === "in") filter.stock = { $gt: 0 };
    if (stock === "out") filter.stock = 0;

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new product
exports.addProduct = async function(req, res) {
  try {
    const productData = req.body;

    if (req.file) {
      productData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const product = new Product(productData);
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update product
exports.updateProduct = async function(req, res) {
  try {
    const id = req.params.id;
    const productData = req.body;

    if (req.file) {
      productData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(id, productData, { new: true });
    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete product
exports.deleteProduct = async function(req, res) {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
