const port = 4000;
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer = require("multer");
const path=require("path");
const cors=require("cors");

 
app.use(express.json());
app.use(cors());


  
mongoose.connect("mongodb+srv://navinv:9788665770@cluster0.d9sg7.mongodb.net/details")





app.get("/",(req,res)=>{
    res.send("express app is running")
    console.log("express app is running");

})
// to store image
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload =multer({storage:storage})
//end point
app.use("/images",express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});
//schema


 const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
   name:{
    type:String,
    required:true,


   } ,

   category:{
    type:String,
    required:true,
   },
   image:{
    type:String,
    required:true,
   } ,
   age:{
    type:Number,
    required:true,
},
address:{
    type:String,
    required:true,
},

state:{
    type:String,
    required:true,
},
PhoneNumber:{
    type:String,
    required:true,
},
Email:{
    type:String,
    required:true,
},
District:{
    type:String,
    required:true,
},

 })
 app.post('/addproduct',async (req,res)=>{
    let products= await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array=products.slice(-1);
        let last_product = last_product_array[0];
        id=last_product.id+1;
    }
    else{
        id=1;
    }
    const product= new Product({
        
// id: 1,
//     name: "dog",
//     category: "dog",
//     image: ad1,
//     age: "2",
//     address: "abc",
//     state: "Tamil Nadu",
//     PhoneNumber: "000000000000",
//     Email: "sample@gmail.com",
//     District: "Erode",
        id:id,
        name:req.body.name,
        category:req.body.category,
        image:req.body.image,
       age:req.body.age,
       address:req.body.address,
       state:req.body.state,
       PhoneNumber:req.body.PhoneNumber,
       Email:req.body.Email,
       District:req.body.District,


    });
  console.log(product);
  await  product.save();
  console.log("saved");
  res.json({
    success:true,
    name:req.body.name,


  })

 })
 app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
      success:true,
      name:req.body.name
    })
 })

 app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("All products are displayed from database");
    res.send(products);
 })
app.listen(port,(e)=>{
    if (!e){
        console.log("Server is running on the port:"+port);

    }
    else{
        console.log("Error on mongoDB connection"+e);
    }
 
})