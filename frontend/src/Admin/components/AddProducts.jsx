import React, { useEffect, useState } from "react";
import Adminsidebar from "./Adminsidebar";


function AddProducts() {
    const [image, setImage] = useState(null)
    const [name, setName] = useState()
    const [brand, setBrand] = useState()
    const [description, setDescription] = useState()
    const [size, setSize] = useState()
    const [color, setColor] = useState()
    const [quantity, setQuantity] = useState()
    const [oldprice, setOldprice] = useState()
    const [newprice, setNewprice] = useState()
    const [discount, setDiscount] = useState()
    const [category, setCategory] = useState()

    const handleClick = (e) => {
        e.preventDefault()

        const formdata = new FormData()

        formdata.append("image", image)
        formdata.append("productName", name)
        formdata.append("brand", brand)
        formdata.append("productDescription", description)
        formdata.append("size", size)
        formdata.append("color", color)
        formdata.append("quantity", quantity)
        formdata.append("oldprice", oldprice)
        formdata.append("newprice", newprice)
        formdata.append("discount", discount)
        formdata.append("category", category)

        // fetch("http://127.0.0.1:3001/imageUpload", {

        fetch("https://thredup-clone.onrender.com/imageUpload", {
            method: "POST",
            body: formdata
        })
            .then((res) => res.json())
            .then((data) => {

                console.log(data.msg)
                alert("Product added")

                setImage(null)
                setName("")
                setBrand("")
                setDescription("")
                setSize("")
                setColor("")
                setQuantity("")
                setNewprice("")
                setOldprice("")
                setDiscount("")
                setCategory("")
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            <Adminsidebar />
            <div className="addproduct-section">
                <form className="addproduct-form" onSubmit={handleClick}>

                    <h2 className="addproduct-title">ADD PRODUCT</h2>

                    <label>Image Upload</label> <br />
                    <input type="file"
                        name="image"
                        id="imageupload"
                        onChange={(e) => setImage(e.target.files[0])}
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
                    <select
                        name="brand"   placeholder="Brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}>
                        <option value="">Select Brands</option>
                        <option value="Anthropologie">Anthropologie</option>
                        <option value="Athleta">Athleta</option>
                        <option value="BDG">BDG</option>
                        <option value="Unbranded">Unbranded</option>
                        <option value="Ideology">Ideology</option>
                        <option value="Lulus">Lulus</option>
                        <option value="Madwell">Madwell</option>
                        <option value="Betsy & Adam">Betsy & Adam</option>
                        <option value="Abercrombie & Fitch">Abercrombie & Fitch</option>
                    </select>

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
                        <option value="White">White</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Pink">Pink</option>
                        <option value="Green">Green</option>
                    </select>
                    <br />

                    <label>Quantity</label> <br />
                    <input type="number"
                        name="quantity"
                        id="quantity"
                        placeholder="Quantity"
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
                        <option value="NewArrival">New Arrivals</option>
                        <option value="Womens">Womens</option>
                        <option value="Designer">Designer</option>
                        <option value="Premium">Premium</option>
                        <option value="Dresses">Dresses</option>
                        <option value="Kids">Kids</option>
                    </select>
                    <br />

                    <button type="submit" className="admin-btn-addproducts">ADD</button>

                </form>
            </div>
        </>
    );

}
export default AddProducts;

// to open the http://localhost:5173/Admin/AddProducts