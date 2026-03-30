import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";


function FavoritesSection() {
    const [products, setProducts] = useState([])

    // useEffect(() => {
    //     axios.get("http://127.0.0.1:3001/products")
    //         .then(res => setProducts(res.data))
    //         .catch(err => console.log(err))
    // }, [])

    useEffect(() => {
        axios.get("http://127.0.0.1:3001/products")
            .then(res => {
                console.log(res.data); 
                setProducts(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    return (

        <section className="favorites-section">
            <div className="section-header">
                <h2>Most Favorited Under $100</h2>
                <a href="#" className="shop-all">SHOP ALL</a>
            </div>

            <div className="carousel">
                {products && products.map((product) => (
                    <div className="product-card" key={product._id}>
                        <Link to={`/SingleProductDetail/${product._id}`}>
                        <img src={`http://localhost:3001/${product.productImage}`}  alt={product.productName} />
                        </Link>

                        <h3>Betsey Johnson</h3>
                        <p className="size">{product.productName}</p>
                        <h3> {product.brand}</h3>
                        <p> {product.productDescription}</p>
                        <p className="old-price">{product.oldprice} off</p>
                        <p className="new-price">{product.newprice} off</p>
                        <p className="code">{product.discount}with code FIRST50</p>
                    </div>
                ))}

            </div>
        </section>

    );
}

export default FavoritesSection;