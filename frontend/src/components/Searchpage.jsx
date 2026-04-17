import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function SearchPage() {
    const [products, setProducts] = useState([])
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get("q");

    useEffect(() => {
        if (searchQuery) {
            axios.get(`https://thredup-clone-frontend.onrender.com/search?q=${searchQuery}`)
                .then((res) => setProducts(res.data.products))
                .catch(err => console.log(err));
        }

    }, [urlParams]);

    return (
        <>
            <div className="product-page">
                <h2 className="product-title">{searchQuery}</h2>
            </div>

            <div className="products-grid">
                {products && products.map((product) => (
                    <Link to={`/singleProductPage/${product._id}`} className="product-list" key={product._id}>
                        <div className="products-card">

                            <img src={product.productImage} />
                            <p className="brand-title">{product.brand}</p>
                            <p className="desc">{product.productName}</p>
                            <p className="price-section">
                                <span className="old">${product.oldprice}</span>
                                <span className="new">${product.newprice}</span>
                                <span className="off">50% off</span>
                            </p>
                            <p className="code-p">with code FIRST50</p>

                        </div>
                    </Link>
                ))}
            </div>

        </>
    );
}

export default SearchPage;