const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const Products = require('./models/Products');
const Order = require('./models/Order')
const OrderProcessingMail = require('./Ordermail/OrderProcessingMail'); 
const OrderDeliveredMail = require('./Ordermail/OrderDeliveredMail');
const path = require("path")

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

  
// CODE FOR THE login route
const authRoutes = require('./LoginAuth/Auth')
const fs = require('fs')

// creating the app
const app = express()
app.use(express.json())
app.use(cors())
// app.use(cors({
//   origin: "https://thredup-clone.onrender.com",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }))

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://thredup-clone.onrender.com"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }))


// MULTER CODE FOR IMAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, uploadPath)
    // cb(null, './UploadsImage')
    cb(null, path.join(__dirname, "UploadsImage"))

  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ storage })

app.use(express.static("UploadsImage"))

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
    const productImage = req.file.filename

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

  if(orderStatus === 'Order Processing') {
      await OrderProcessingMail(updateOrderStatus.userEmail)
  }

  if(orderStatus === 'Order Delivered') {
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

    const imagePath = path.join(__dirname, "UploadsImage", product.productImage)
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath)
    }

    const deleteProduct = await Products.findByIdAndDelete(req.params.id)
    res.status(200).json(deleteProduct)
  }
  catch (err) {
    console.log(err)
  }
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

// ORDER PART in Add to cart
app.post('/placeAnOrder', async (req, res) => {
  const { userEmail, products, finalTotal } = req.body

  const orderList = new Order({
    userEmail, products, finalTotal
  })

  await orderList.save()
  res.json({ message: 'order placed successfully' })
})

// EDITING PART OF MANAGEPRODUCTS TO DB
app.put('/imageUpload/:id', upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params
    const product = await Products.findById(id)

    let imageName = product.productImage
    if (req.file) {
      const imagePath = path.join(__dirname, "UploadsImage", product.productImage)
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }

      imageName = req.file.filename
    }

    const updateProduct = await Products.findByIdAndUpdate(id, {
      ...req.body,
      productImage: imageName
    },
      {
        new: true
      })
    res.status(200).json(updateProduct)
  }
  catch (err) {

  }
})

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


app.listen(3001, () => {
  console.log("server is running")
})
