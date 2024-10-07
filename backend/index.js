const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();  // Initialize express app
const port = process.env.PORT || 3000;  // Declare port

// Middleware
app.use(cors({
  origin: 'https://ecoadapation-eco-new.onrender.com' // Frontend URL
}));
app.use(express.json());  // To parse JSON requests

// MongoDB Connection
mongoose.connect("mongodb+srv://navinv:9788665770@cluster0.d9sg7.mongodb.net/details", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'navinv.22cse@kongu.edu', // Actual email
        pass: '9788665770', // Use an app password if 2FA is enabled
    }
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/images');  // Destination for image uploads
    },
    filename: (req, file, cb) => {
        cb(null, `image_${Date.now()}${path.extname(file.originalname)}`);  // Unique filename
    }
});
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
        cb(null, true);  // Accept file
    } else {
        cb(new Error('Only image files are allowed!'), false);  // Reject file
    }
};
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },  // 2 MB limit
    fileFilter: fileFilter,
});
app.use("/images", express.static('upload/images'));

// Routes
app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        const image_url = `http://localhost:4000/images/${req.file.filename}`;
        return res.json({ success: true, image_url });
    } else {
        return res.status(400).json({ success: false, message: "Image upload failed" });
    }
});

// Send email route
app.post('/send-email', (req, res) => {
    const { to, subject, text, productId } = req.body;
    const mailOptionsUser = {
        from: 'navinv.22cse@kongu.edu',
        to,  // Email from the request
        subject,
        text,
    };
    const mailOptionsAdmin = {
        from: 'navinv.22cse@kongu.edu',
        to: 'navinv.22cse@kongu.edu',
        subject: `New Adoption for a pet order has been placed, for PET ID: ${productId}`,
        text: `An order has been sent to ${to} regarding pet adoption and the PET ID: ${productId}.`,
    };
    transporter.sendMail(mailOptionsUser, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Error sending email', error });
        }
        transporter.sendMail(mailOptionsAdmin, (adminError, adminInfo) => {
            if (adminError) {
                return res.status(500).json({ success: false, message: 'Error sending admin email', adminError });
            }
            res.json({ success: true, message: 'Email sent successfully' });
        });
    });
});

// Product Schema and Model
const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    category: String,
    image: String,
    age: String,
    address: String,
    state: String,
    PhoneNumber: String,
    Email: String,
    District: String,
});
const Product = mongoose.model("Product", productSchema);

// Add product
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const product = new Product({
        id,
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        age: req.body.age,
        address: req.body.address,
        state: req.body.state,
        PhoneNumber: req.body.PhoneNumber,
        Email: req.body.Email,
        District: req.body.District,
    });
    await product.save();
    res.json({ success: true, name: req.body.name });
});

// Remove product
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, id: req.body.id });
});

// Get all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    res.send(products);
});

// Start server
app.listen(port, () => {
    console.log("Server is running on port:", port);
});
