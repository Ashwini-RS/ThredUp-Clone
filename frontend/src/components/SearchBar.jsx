import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);

    // const inputRef = useRef(null);

    const [query, setQuery] = useState("")
    const [products, setProducts] = useState([])

    const navigate = useNavigate();

    // useEffect(() => {
    //     inputRef.current.focus();
    // }, []);

    const handleKeyDown = (e) => {

        axios.get("/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))

        if (e.key === "Enter") {
            navigate(`/search?q=${query}`);
            closeSearchModal();
        }
    };

    const searchHandleProductName = (productName) => {
        navigate(`/search?q=${productName}`);
        closeSearchModal();
    }

    return (
        <>
            <div className="search-box">
                <input type="text"
                    placeholder="Search"
                    onFocus={() => setIsOpen(true)}
                    onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown}
                />
                <i className="fa-regular fa-camera" style={{ marginTop: '10px' }}></i>
            </div>

            {isOpen && (
                <div className="search-overlay">

                    <div className="overlay-top">
                        <input type="text" placeholder="Search" />
                        <span className="close" onClick={() => setIsOpen(false)}>CLOSE</span>
                    </div>

                    <div className="overlay-content">

                        <div className="left">
                            <div className="tabs">
                                <span>Related products</span>
                                {products && products.filter((product) =>
                                    product.productName.toLowerCase().includes(query.toLowerCase())).slice(0, 5).map((product) => (
                                        <p key={product._id}>{product.productName}</p>
                                    ))}
                            </div>
                        </div>

                        {/*  <div className="search-links">
                                 <a href="#">Dress</a>
                                 <a href="#">Tops</a>
                                 <a href="#">Cardigan</a>
                                 <a href="#">Pants</a>
                                 <a href="#">Jeans</a>
                            </div> */}


                        {/* <div className="right">
                        {products && products.filter((product) =>
                            product.productName.toLowerCase().includes(query.toLowerCase())).slice(0, 3).map((product) => (
                            <>
                            <a href="#" className="search-products">
                                <img src="images/athleta7.webp" alt="" />
                                <p>{product.productName}</p>
                                <span>${product.oldPrice}</span>
                            </a>
                            </>
                              ))}
                        </div> */}
                    </div>
                </div>
            )}
        </>
    );
}
export default SearchBar;