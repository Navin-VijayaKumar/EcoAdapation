const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());



mongoose.connect('mongodb+srv://navinv:9788665770@cluster0.rgu11.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'navinv.22cse@kongu.edu', // Use your actual email
        pass: '9788665770', // Use an app password if 2FA is enabled
    }
});

// Multer storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/images');  // Set the destination folder for image uploads
    },
    filename: (req, file, cb) => {
        // Use a unique filename format
        cb(null, `image_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// File filter to only allow specific image formats (e.g., .png, .jpg, .jpeg)
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
    limits: { fileSize: 2 * 1024 * 1024 },  // 2 MB file size limit
    fileFilter: fileFilter,
});

app.use("/images", express.static('upload/images'));

app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        const image_url = `https://eco-adapation.onrender.com/images/${req.file.filename}`;
        return res.json({ success: true, image_url });
    } else {
        return res.status(400).json({ success: false, message: "Image upload failed" });
    }
});

// Root route
app.get("/", (req, res) => {
    res.send("Express app is running");
    console.log("Express app is running");
});

// Send Email Route
app.post('/send-email', (req, res) => {
    const { to, subject, text, productId } = req.body;  
    console.log("Sending email to:", to);

    const mailOptionsUser = {
        from: 'navinv.22cse@kongu.edu',
        to,  // User email from the request
        subject,
        text,
    };
    
    // Admin email configuration with a default email
    const mailOptionsAdmin = {
        from: 'navinv.22cse@kongu.edu',
        to: 'navinv.22cse@kongu.edu', // Replace with your default admin email
        subject: `New Adoption for a pet order has been placed, for PET ID: ${productId}`,
        text: `An order has been sent to ${to} regarding pet adoption and the PET ID: ${productId}.`,
    };

    // Send email to the user
    transporter.sendMail(mailOptionsUser, (error, info) => {
        if (error) {
            console.error('Error sending email to user:', error);
            return res.status(500).json({ success: false, message: 'Error sending email', error });
        }
        console.log('Email sent to user:', info.response);

        // Send notification email to the admin
        transporter.sendMail(mailOptionsAdmin, (adminError, adminInfo) => {
            if (adminError) {
                console.error('Error sending notification email to admin:', adminError);
                return res.status(500).json({ success: false, message: 'Error sending notification email', adminError });
            }
            console.log('Notification email sent to admin:', adminInfo.response);
            res.json({ success: true, message: 'Emails sent successfully' });
        });
    });
});

// Product Schema
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

// Add Product
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
    console.log("Product saved:", product);
    res.json({ success: true, name: req.body.name });
});

// Remove Product
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Product removed:", req.body.id);
    res.json({ success: true, id: req.body.id });
});

// Get All Products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All products are displayed from database");
    res.send(products);
});

// Start the server
app.listen(port, (e) => {
    if (!e) {
        console.log("Server is running on port:", port);
    } else {
        console.error("Error starting server:", e);
    }
});