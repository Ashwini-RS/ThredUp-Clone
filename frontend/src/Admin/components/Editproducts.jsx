import React, { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Adminsidebar from './Adminsidebar';
import { useState } from 'react';
import axios from 'axios'

// https://thredup-clone.onrender.com

function Editproducts() {
    const [image, setImage] = useState(null)
    const [name, setName] = useState()
    const [brand, setBrand] = useState()
    const [description, setDescription] = useState()
    const [size, setSize] = useState()
    const [color, setColor] = useState()
    const [quantity, setQuantity] = useState()
    const [newprice, setNewprice] = useState()
    const [oldprice, setOldprice] = useState()
    const [discount, setDiscount] = useState()
    const [category, setCategory] = useState()
    // const [preview, setPreview] = useState()

    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        // axios.get(`http://127.0.0.1:3001/imageUpload/${id}`)

        axios.get(`https://thredup-clone.onrender.com/imageUpload/${id}`)
            .then((res) => {
                const data = res.data

                setImage(data.productImage)
                setName(data.productName)
                setBrand(data.brand)
                setDescription(data.productDescription)
                setSize(data.size)
                setColor(data.color)
                setQuantity(data.quantity)
                setNewprice(data.newPrice)
                setOldprice(data.oldPrice)
                setDiscount(data.discount)
                setCategory(data.category)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()

        // appending form data 
        const formdata = new FormData()

        formdata.append("image", image)
        formdata.append("productName", name)
        formdata.append("brand", brand)
        formdata.append("productDescription", description)
        formdata.append("size", size)
        formdata.append("color", color)
        formdata.append("quantity", quantity)
        formdata.append("newprice", newprice)
        formdata.append("oldprice", oldprice)
        formdata.append("discount", discount)
        formdata.append("category", category)

        // fetch(`http://127.0.0.1:3001/imageUpload/${id}`, {

        fetch(`https://thredup-clone.onrender.com/imageUpload/${id}`, {
            method: "put",
            body: formdata
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.msg)
                alert("Product Updated")
                navigate("/admin/ManageProducts")

            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <Adminsidebar />

            <div className="addproduct-section">
                <form className="addproduct-form" onSubmit={handleSubmit}>

                    <h2 className="addproduct-title">EDIT PRODUCTS</h2>

                    <label>Image Upload</label> <br />
                    <input type="file"
                        name="image"
                        id="imageupload"
                        onChange={(e) => {
                            setImage(e.target.files[0])
                        }}
                    />
                    <br />

                    <label>Product Name</label> <br />
                    <input type="text"
                        name="product-name"
                        id="product-name"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <br />

                    <label>Brand</label> <br />
                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />

                    <br />

                    <label>Product Description</label> <br />
                    <input type="text"
                        name="description"
                        id="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <br />

                    <label>Size</label> <br />
                    <select
                        name="size"
                        id="size"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}>
                        <option value="">Select Size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>

                    <br />

                    <label>Color</label> <br />
                    <select
                        name="color"
                        id="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}>
                        <option value="">Select Color</option>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Black">Black</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Pink">Pink</option>
                        <option value="Green">Green</option>
                    </select>
                    <br />

                    <label>Quantity</label> <br />
                    <input type="text"
                        name="quantity"
                        id="quantity"
                        placeholder="Quality"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />

                    <br />

                    <label>Old Price</label> <br />
                    <input
                        type="number"
                        name="oldprice"
                        placeholder="Old Price"
                        value={oldprice}
                        onChange={(e) => setOldprice(e.target.value)}
                    />

                    <br />

                    <label>New Price</label> <br />
                    <input
                        type="number"
                        name="newprice"
                        placeholder="New Price"
                        value={newprice}
                        onChange={(e) => setNewprice(e.target.value)}
                    />

                    <br />

                    <label>Discount</label> <br />
                    <input
                        type="number"
                        name="discount"
                        placeholder="Discount %"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                    />

                    <br />

                    <label className="category-label">Category</label>  <br />
                    <select
                        name="category"
                        className="category-box"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="dress">Dress</option>
                        <option value="tops">Tops</option>
                        <option value="jeans">Jeans</option>
                        <option value="kids">Kids</option>
                    </select>

                    <br />

                    <button type="submit" className="admin-btn-addproducts">ADD-UPDATE</button>

                </form>
            </div>
        </>
    )
}

export default Editproducts;
