import { useEffect, useState } from "react";
import { useNavigate , Link} from "react-router-dom";
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

    useEffect(() => {
        axios.get("https://thredup-clone.onrender.com/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleKeyDown = (e) => {

        axios.get("https://thredup-clone.onrender.com/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))

        if (e.key === "Enter") {
            navigate(`/search?q=${query}`);
            setIsOpen(false);
        }
    };

    const searchHandleProductName = (productName) => {
        navigate(`/search?q=${productName}`);
        setIsOpen(false);
    }

    return (
        <>
            <div className="search-box">
                <input type="text"
                    placeholder="Search"
                    onFocus={() => setIsOpen(true)}

                />
                <i className="fa-regular fa-camera" style={{ marginTop: '10px' }}></i>
            </div>

            {isOpen && (
                <div className="search-overlay">

                    <div className="overlay-top">
                        <input type="text"
                            placeholder="Search"
                            onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
                        <span className="close" onClick={() => setIsOpen(false)}>CLOSE</span>
                    </div>

                    <div className="overlay-content">

                        <div className="left">
                            <div className="tabs">
                                <span>Related products</span>

                                <div className="search-links">
                                    {products && products.filter((product) =>
                                        product.productName?.toLowerCase().includes(query.toLowerCase())).slice(0, 5).map((product) => (
                                            <p key={product._id} 
                                            onClick={() => searchHandleProductName(product.productName)}>{product.productName}</p>
                                        ))}
                                </div>
                            </div>
                        </div>

                        <div className="right">
                            {products && products.filter((product) =>
                                product.productName.toLowerCase().includes(query.toLowerCase())).slice(0, 4).map((product) => (
                                    <>
                                      
                                        <Link to={`/SingleProductDetail/${product._id}`} className="search-products">
                                            <img src={product.productImage} style={{ width: '150px' }} alt="" />
                                            <p>{product.productName}</p>
                                            <span>${product.oldprice}</span>
                                        </Link>
                                    </>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default SearchBar;