import Bannerwomen from "./Bannerwomen";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'

function Womens(){
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("https://thredup-clone.onrender.com/products")
            .then(res => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch(err => console.log(err))
    }, [])
    return(
        <>
          <div className="title-banner">
                <h1 className="women-title">Women</h1>
            </div>
        <Bannerwomen />
        {products && products.filter((products) => products.category === 'Womens').map((product) => ( 
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
                    </div>
                ))
                }
        </>
    );
}

export default Womens;