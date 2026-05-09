import Adminsidebar from "./Adminsidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ManageProducts() {

    const [products, setProducts] = useState([])
    const [query, setQuery] = useState("")

    // https://thredup-clone.onrender.com

    useEffect(() => {
        // axios.get("http://127.0.0.1:3001/ManageProducts")

        axios.get("https://thredup-clone.onrender.com/ManageProducts")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, [])

    const deleteProduct = async (id) => {
        // axios.delete(`http://127.0.0.1:3001/deleteProducts/${id}`)

        axios.delete(`https://thredup-clone.onrender.com/deleteProducts/${id}`)
        alert("Product Deleted")
        window.location.reload();
    }

    const handleSearch = async (e) => {
        const value = e.target.value
        setQuery(value)
        if (value === "") {
          axios.get("https://thredup-clone.onrender.com/manageProducts")
            .then(products => setProducts(products.data))
            .catch(err => console.log(err))
        }
        else {
          try {
            const res = await axios.get(`https://thredup-clone.onrender.com/search?q=${value}`)
            setProducts(res.data.products)
          }
          catch (error) {
            console.log(error)
          }
        }
      }
    return (
        <>
            <Adminsidebar />

            <div className="manages">
            <div className="manage-header">
                <div className="manage-title">
                    <h4>Manage Products</h4>
                </div>

                <div className="admin-search">
                    <input type="text" 
                    value={query}  placeholder="Search"
                    onChange={handleSearch} />
                </div>
            </div>

            <div className="admin-layout">
                <table>
                    <thead>
                        <tr>
                            <th>Product Image</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Description</th>
                            <th>Size</th>
                            <th>Color</th>
                            <th>Quantity</th>
                            <th>Old Price</th>
                            <th>New Price</th>
                            <th>Discount</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {products.map((product) => (
                            <tr key={product._id}>

                                <td><img
                                        // src={`http://localhost:3001/${product.productImage}`}

                                        src={product.productImage}
                                        className="mng-img" alt={product.productName} />
                                </td>
                                <td>{product.productName}</td>
                                <td>{product.brand}</td>
                                <td>{product.productDescription}</td>
                                <td>{product.size}</td>
                                <td>{product.color}</td>
                                <td>{product.quantity}</td>
                                <td>{product.oldprice}</td>
                                <td>{product.newprice}</td>
                                <td>{product.discount}</td>
                                <td>{product.category}</td>

                                <td className="action-btn-icons">
                                    <Link to={'/Admin/Editproducts/' + product._id}>
                                        <i className="fas fa-edit edit"></i>
                                    </Link>

                                    <button onClick={() => deleteProduct(product._id)}>
                                        <i className="fas fa-trash delete"></i>
                                    </button>
                                </td>

                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>
            </div>
        </>
    );
}

export default ManageProducts;

// http://localhost:5173/Admin/ManageProducts to open in the browser
