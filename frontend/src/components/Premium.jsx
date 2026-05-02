import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import Bannerwomen from "./Bannerwomen";

function Premium() {
        const [products, setProducts] = useState([])

        useEffect(() => {
            axios.get("https://thredup-clone.onrender.com/products")
                .then(res => {
                    console.log(res.data);
                    setProducts(res.data);
                })
                .catch(err => console.log(err))
        }, [])

        return (
            <>
                <div className="title-banner">
                    <h1 className="women-title">Premium</h1>
                </div>
                <Bannerwomen />

                {products && products.filter((products) => products.category === 'Premium').map((product) => ( 
                <div className="product-container">

                    <div className="main-product-card" key={product._id}>

                        <div className="product-image">
                            <Link to={`/SingleProductDetail/${product._id}`} >
                                <img src={product.productImage} alt="" />
                            </Link>

                            <img className="wishlist" src="/images/heart-outline.svg" />
                            <button className="add-cart">Add to Cart</button>
                        </div>

                        <div className="product-info">
                            <h4> {product.brand}</h4>
                            <p className="product-name">{product.productName}</p>

                            <div className="price-row">
                                <div className="old-price">{product.oldprice} </div>
                                <div className="new-price">{product.newprice} </div>
                                <div className="discount">{product.discount}off</div>
                            </div>

                            <p className="coupon">with code FIRST50</p>

                        </div>
                    </div>

                    {/* <div className="main-product-card">

                        <div className="product-image">
                            <a href="#">
                                <img src="images/fossilhandbag.webp" alt="" />
                            </a>

                            <img className="wishlist" src="/images/heart-outline.svg" />
                            <button className="add-cart">Add to Cart</button>
                        </div>

                        <div className="product-info">
                            <h4>Fossil</h4>
                            <p className="product-name">One size Crossbody Bag</p>

                            <div className="price-row">
                                <div className="old-price">$84.99</div>
                                <div className="new-price">$42.49</div>
                                <div className="discount">50% off</div>
                            </div>

                            <p className="coupon">with code FIRST50</p>
                        </div>

                    </div> */}


                    {/* <div className="main-product-card">

                        <div className="product-image">
                            <a href="#">
                                <img src="images/alexevenings.webp" alt="" />
                            </a>

                            <img className="wishlist" src="/images/heart-outline.svg" />
                            <button className="add-cart">Add to Cart</button>
                        </div>

                        <div className="product-info">
                            <h4>ALEX EVENINGS</h4>
                            <p className="product-name">Size 12 Coctail dress</p>

                            <div className="price-row">
                                <div className="old-price">$69.99</div>
                                <div className="new-price">$34.49</div>
                                <div className="discount">50% off</div>
                            </div>

                            <p className="coupon">with code FIRST50</p>
                        </div>

                    </div>*/}

{/* 
                    <div className="main-product-card">

                        <div className="product-image">
                            <a href="#">
                                <img src="/images/madewithlove.webp" alt="" />
                            </a>

                            <img className="wishlist" src="/images/heart-outline.svg" />
                            <button className="add-cart">Add to Cart</button>
                        </div>

                        <div className="product-info">
                            <h4>Made With Love</h4>
                            <p className="product-name">Size S Casual dress</p>

                            <div className="price-row">
                                <p className="old-price">$22.99</p>
                                <p className="new-price">$11.49</p>
                                <p className="discount">50% off</p>
                            </div>

                            <p className="coupon">with code FIRST50</p>
                        </div>

                    </div> */}

                    {/* <div className="main-product-card">

                        <div className="product-image">
                            <a href="#">
                                <img src="/images/toryburch.jpg" alt="" />
                            </a>

                            <img className="wishlist" src="/images/heart-outline.svg" />
                            <button className="add-cart">Add to Cart</button>
                        </div>

                        <div className="product-info">
                            <h4>Tory Burch</h4>
                            <p className="product-name">Size 11 Heels</p>

                            <div className="price-row">
                                <p className="old-price">$79.99</p>
                                <p className="new-price">$39.49</p>
                                <p className="discount">50% off</p>
                            </div>

                            <p className="coupon">with code FIRST50</p>
                        </div>

                    </div> */}

                    {/* <div className="main-product-card">

                        <div className="product-image">

                            <a href="#">
                                <img src="/images/margothandbag.webp" alt="" />
                            </a>

                            <img className="wishlist" src="/images/heart-outline.svg" />
                            <button className="add-cart">Add to Cart</button>
                        </div>

                        <div className="product-info">

                            <h4>Tory Burch</h4>
                            <p className="product-name">Size 11 Heels</p>

                            <div className="price-row">
                                <p className="old-price">$79.99</p>
                                <p className="new-price">$39.49</p>
                                <p className="discount">50% off</p>
                            </div>

                            <p className="coupon">with code FIRST50</p>

                        </div>

                    </div> */}
                </div>
                ))}
            </>
        );
    }

export default Premium;