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

// MongoDB connection
mongoose.connect("mongodb+srv://navinv:9788665770@cluster0.d9sg7.mongodb.net/details", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Check MongoDB connection
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Change this if using a different email service
    auth: {
        user: 'navinv.22cse@kongu.edu',  // Replace with your email
        pass: '9788665770',   // Replace with your email password or app-specific password
    }
});

// Multer storage for file uploads
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });
app.use("/images", express.static('upload/images'));

// Root route
app.get("/", (req, res) => {
    res.send("express app is running");
    console.log("express app is running");
});

// Send Email Route
app.post('/send-email', (req, res) => {
    const { to, subject, text, productId } = req.body;  // Include productId in the request
    console.log("Sending email to:", to);

    // Mail options for the user
    const mailOptionsUser = {
        from: 'navinv.22cse@kongu.edu',
        to,  // Email from the request
        subject,
        text,
    };
    
    // Admin email configuration
    //const adminEmail = 'navinv.22cse@kongu.edu';l
    const mailOptionsAdmin = {
        from: 'navinv.22cse@kongu.edu',
        to:'navinv.22cse@kongu.edu',
        subject: `New Adoption Inquiry for Product ID: ${productId}`,  // Email subject for admin
        text: `An email has been sent to ${to} regarding their inquiry for product ID: ${productId}.`,  // Message for admin
    };
    console.log("dcwv");

    // Send email to the user
    transporter.sendMail(mailOptionsUser, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
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
            res.json({ success: true, message: 'Email sent successfully' });
        });
    });
});


// Product Schema (assuming you have a schema like this in mongoose)
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
