import Adminsidebar from "./Adminsidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ManageProducts() {

    const [products, setProducts] = useState([])  
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

    return (
        <>
            <Adminsidebar />

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

                                    <td>
                                        <img
                                            // src={`http://localhost:3001/${product.productImage}`}
                                            
                                            src={`https://thredup-clone.onrender.com/${product.productImage}`}
                                            className="mng-img" alt="" />
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
        </>
    );
}

export default ManageProducts;

// http://localhost:5173/Admin/ManageProducts to open in the browser
