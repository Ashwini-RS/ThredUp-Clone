const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const Products = require('./models/Products');
const User = require('./models/User');
const Order = require('./models/Order')
const OrderProcessingMail = require('./Ordermail/OrderProcessingMail');
const OrderDeliveredMail = require('./Ordermail/OrderDeliveredMail');
const path = require("path")
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Razorpay = require('razorpay');
const crypto = require('crypto');

require('dotenv').config();

var razorpay = new Razorpay({
  key_id: process.env.Test_Key_ID,
  key_secret: process.env.Test_Key_Secret,
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))


// CODE FOR THE login route
const authRoutes = require('./LoginAuth/Auth')
const fs = require('fs')

// creating the app
const app = express()
app.use(express.json())
// app.use(cors())
app.use(cors({
  origin: ["https://thredup-clone-frontend.onrender.com",
    'http://localhost:5173'
  ],

}))

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://thredup-clone-frontend.onrender.com"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }))

// MULTER CODE FOR IMAGE
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // cb(null, uploadPath)
//     // cb(null, './UploadsImage')
//     cb(null, path.join(__dirname, "UploadsImage"))
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname)
//   }
// })

//CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',  // Cloudinary folder name
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
    public_id: (req, file) => path.parse(file.originalname).name
  }
});

const upload = multer({ storage })

// app.use(express.static("UploadsImage"))

// mongoose.connect('mongodb+srv://ashwini:dynamite9845@cluster0.dqo9pwv.mongodb.net/thredup?retryWrites=true&w=majority')
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error("MongoDB Connection Error:", err))

// mongoose.connect('mongodb+srv://ashwini:dynamite9845@cluster0.dqo9pwv.mongodb.net/thredup')
// console.log("MongoDB Connected")
// const dns = require('dns');
// dns.setDefaultResultOrder('ipv4first'); 

// mongoose.connect('mongodb+srv://ashwini:dynamite9845@cluster0.dqo9pwv.mongodb.net/thredup?retryWrites=true&w=majority')
// .then(() => {
//     console.log("MongoDB Connected")
// })
// .catch((err) => {
//     console.error(" MongoDB Connection Error:", err)
// })

app.use('/login', authRoutes)

app.post("/imageUpload", upload.single("image"), async (req, res) => {

  try {

    const productImage = req.file.path
    //  const productImage = req.file.secure_url

    console.log(req.file.path)
    console.log(req.file.secure_url)

    const { productName, brand, productDescription, size, color, quantity, oldprice, newprice, discount, category } = req.body

    const productDetails = new Products({ productImage, productName, brand, productDescription, size, color, quantity, oldprice, newprice, discount, category })

    await productDetails.save()

    res.send({ "msg": "Product Added to db" })

  }
  catch (error) {
    res.status(500).json({ "msg": "Error adding product to db" })
  }
})

// manage orders to DB
app.get('/manageOrders', (req, res) => {
  Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.json(err))
})

app.get('/manageOrders/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const orders = await Order.find({ userEmail: user.email })
    res.json(orders)
  }
  catch (err) {
    res.status(500).json(err)
  }
})

//update order status in the db
app.put('/updateOrderStatus/:id', async (req, res) => {
  const { id } = req.params
  const { orderStatus } = req.body
  const updateOrderStatus = await Order.findByIdAndUpdate(id, {
    orderStatus: orderStatus
  },
    {
      new: true
    })

  if (orderStatus === 'Order Processing') {
    await OrderProcessingMail(updateOrderStatus.userEmail)
  }

  if (orderStatus === 'Order Delivered') {
    await OrderDeliveredMail(updateOrderStatus.userEmail)
  }

  res.status(200).json(updateOrderStatus)
})

// DELETING ORDER of the MANAGE ORDER to DB
app.delete('/deleteOrders/:id', async (req, res) => {
  try {
    const deleteOrders = await Order.findByIdAndDelete(req.params.id)
    res.status(200).json(deleteOrders)
  }
  catch (err) {
    console.log(err)
  }
})

// MANAGE PRODUCTS TO DB
app.get('/ManageProducts', (req, res) => {
  Products.find()
    .then(products => res.json(products))
    .catch(err => res.json(err))
})

// DELETING PART OF THE MANAGE PRODUCTS TO DB
app.delete('/deleteProducts/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Products.findById(id)

    // const imagePath = path.join(__dirname, "UploadsImage", product.productImage)
    // if (fs.existsSync(imagePath)) {
    //   fs.unlinkSync(imagePath)
    // }

    const imageUrl = product.productImage;
    const publicId = "products/" + path.parse(imageUrl.split('/').pop()).name;

    await cloudinary.uploader.destroy(publicId);

    const deleteProduct = await Products.findByIdAndDelete(req.params.id)
    res.status(200).json(deleteProduct)
  }
  catch (err) {
    console.log(err)
  }
})

// ORDER PART in Add to cart
app.post('/placeAnOrder', async (req, res) => {
  const { userId, products, finalTotal, paymentMode } = req.body

  const user = await User.findById(userId)

  const orderList = new Orders({
      userEmail: user.email,
      products: products,
      finalTotal: finalTotal,
      paymentMode: paymentMode,
      paymentId: null,
      paymentStatus: 'Pending'
  })

  await orderList.save()
  res.json({ message: 'order placed successfully' })
})

// app.get('/products/:id', async (req, res) => {
//   try {
//     const product = await Products.findById(req.params.id)
//     res.json(product)
//   } catch (err) {
//     console.log(err)
//   }
// })

app.get('/products/:id', async (req, res) => {
  const { id } = req.params
  try {
    const product = await Products.findById(id)
    res.json(product)
  }
  catch (err) {
    console.log(err)
  }
})

// EDITING PART OF MANAGEPRODUCTS TO DB
app.put('/imageUpload/:id', upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params
    const product = await Products.findById(id)
    let imageUrl = product.productImage

    const publicId = "products/" + path.parse(product.productImage.split('/').pop()).name;
    if (req.file) {
      // delete old image
      await cloudinary.uploader.destroy(publicId)
      // new image 
      imageUrl = req.file.path;
    }

    const updateProduct = await Products.findByIdAndUpdate(id, {
      ...req.body,
      productImage: imageUrl
    },
      { new: true }
    );
    res.status(200).json(updateProduct)
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get("/imageUpload/:id", async (req, res) => {
  const { id } = req.params
  try {
    const product = await Products.findById(id)
    if (!product) res.send({ "msg": "Product not uploaded" })

    res.json(product)

    // const imagePath = path.join(__dirname, "UploadsImage", image.productImage)
    // res.sendFile(imagePath)
  }
  catch (err) {
    console.log(err)
  }
})

// CODE FOR THE PRODUCTS FOR THE DB TO FRONTEND
app.get('/products', (req, res) => {
  Products.find()
    .then(products => res.json(products))
    .catch(err => res.json(err))
})

//SEARCH PRODUCT
app.get('/search', async (req, res) => {
  try {
    const { q } = req.query

    const products = await Products.find({
      $or: [
        { productName: { $regex: q || "", $options: "i" } },
        { productDescription: { $regex: q || "", $options: "i" } }
      ]
    })

    res.status(200).json({ products })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// USER PROFILE 
app.get('/userData/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);

  } catch (err) {
    res.status(500).json(err);
  }
})

// edit profile connection
app.put('/editProfile/:id', async (req, res) => {
  try {

    const { id } = req.params
    const { username, phonenumber } = req.body
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        username: username,
        phonenumber: phonenumber
      },
      { new: true }
    );

    res.status(200).json(updateUser);

  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
})

// ADD NEW ADDRESS CONNECTION
app.put('/profile/myaddress/:id', async (req, res) => {
  try {
    const { pincode, location, city, state, username, phonenumber } = req.body
    const user = await User.findById(req.params.id);

    user.username = username,
      user.phonenumber = phonenumber
    user.address[0].pincode = pincode;
    user.address[0].city = city;
    user.address[0].location = location;
    user.address[0].state = state;

    await user.save();

    res.status(200).json(user)

  } catch (error) {
    console.log(error)
  }
})

//user side address data
app.get('/manageUsers/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  }
  catch (err) {
    console.log(err)
  }
})

//  RAZORPAY-PAYMENT   CREATE ORDER API

app.post('/createOrder', async (req, res) => {
  const { finalTotal } = req.body

  try {
    const order = await razorpay.orders.create({
      amount: finalTotal * 100,
      currency: 'INR',
      receipt: 'receipt_' + Date.now()
    })
    res.status(200).json({
      order,
      razorpayKeyId: process.env.Test_Key_ID
    })
  }
  catch (err) {
    console.log(err)
  }
})

// VERIFY PAYMENT
app.post("/verifyPayment", async (req, res) => {

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    products,
    finalTotal
  } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.Test_Key_Secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex")

  const user = await User.findById(userId)
  const userEmail = user?.email

  if (generated_signature === razorpay_signature) {

    await Order.create({
      userEmail,
      products,
      finalTotal,
      paymentId: razorpay_payment_id,
      paymentStatus: "Success",
      paymentMode: 'Online Payment'
    });

    res.status(200).json({
      success: true,
      message: "Payment Successful and order stored"
    });

  } else {
    await Order.create({
      userEmail,
      products,
      finalTotal,
      paymentStatus: "Failed"
    });

    res.status(400).json({
      success: false,
      message: "Payment verification failed"
    });
  }
})

app.listen(3001, () => {
  console.log("server is running")
})
