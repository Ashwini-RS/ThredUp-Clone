import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";

function SingleProductDetail() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios.get(`http://127.0.0.1:3001/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    }, [id])

    const addToCart = () => {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(item => item.productId === product._id);
        if (existing) {
            navigate("/addToCart");
        }
        else {
            cart.push({ productId: product._id, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        navigate("/addToCart");

        // localStorage.setItem('userEmail', JSON.stringify(email))
        // let cart = JSON.parse(localStorage.getItem("cart")) || []
        // cart.push(product)
        // localStorage.setItem("cart", JSON.stringify(cart))
        // navigate("/AddToCart")
    }
    return (
        <>
            <div className="details-container">
                {/* src={`http://localhost:3001/${product.productImage}`} */}
                {product && (
                    <>
                        <div className="image-section">
                            <div className="main-image">

                                <img src={`http://localhost:3001/${product.productImage}`} alt="" />
                            </div>
                        </div>

                        <div className="product-details">

                            <h2>{product.productName}</h2>
                            <p className="subtitle">{product.size} (estimated) Jumpsuit</p>
                            <p className="stock">Only 1 Available</p>

                            <div className="product-price">
                                <p className="product-old">${product.oldprice}</p>
                                <p className="product-new">${product.newprice}</p>
                                <p className="product-discount">
                                    {product.oldprice - product.newprice} ({product.discount} %)
                                </p>
                                <p className="product-coupon">FIRST50</p>
                            </div>

                            <Link to="/AddToCart" onClick={addToCart}>
                                <button className="cart-btn">ADD TO CART</button>
                            </Link>

                            <div className="info-row">
                                <img src="/images/flame-thredup.svg" alt="popular" className="icon" />
                                <p>This item is popular! It's likely to sell soon.</p>
                            </div>

                            <hr className="divider" />

                            <div className="condition">
                                <h4>Condition</h4>
                                <p>Still has life left in it, but has visible flaws that may require repair.
                                </p>
                            </div>

                            <div className="item-desc">
                                <h4> Item Details</h4>
                                <p>Material unknown</p>
                                <p>Short sleeve, crew neckline, solid</p>
                            </div>

                            <div className="shipping">
                                <h3>Shipping & returns</h3>
                                <p>Free Shipping on orders above $89 No returns on this item</p>
                            </div>

                        </div>
                    </>
                )}

            </div>
        </>
    );
}

export default SingleProductDetail;

// http://localhost:5173/SingleProductDetail/
