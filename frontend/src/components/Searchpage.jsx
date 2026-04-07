import { useState } from "react";

function Searchpage() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="search-box">
                <input type="text"
                    placeholder="Search"
                    onFocus={() => setIsOpen(true)} />
                <i className="fa-regular fa-camera" style={{ marginTop: '10px' }}></i>
            </div>

            {isOpen && (
                <div className="search-overlay">

                    <div className="overlay-top">
                        <input type="text" placeholder="Search" />
                        <span onClick={() => setIsOpen(false)}>CLOSE</span>
                    </div>

                    <div className="overlay-content">

                        {/* LEFT */}
                        <div className="left">
                            <div className="tabs">
                                <span className="active">Women</span>
                                <span>Girls</span>
                                <span>Boys</span>
                            </div>

                            <ul>
                                <li>silk skirt</li>
                                <li>statement belt</li>
                                <li>leather jacket</li>
                                <li>work pants</li>
                                <li>cardigan</li>
                            </ul>
                        </div>

                        {/* RIGHT */}
                        <div className="right">
                            <div className="product">
                                <img src="https://via.placeholder.com/120x180" alt="" />
                                <p>Zara</p>
                                {/* <span>$38.99</span> */}
                            </div>

                            <div className="product">
                                <img src="https://via.placeholder.com/120x180" alt="" />
                                <p>Leith</p>
                                {/* <span>$33.99</span> */}
                            </div>

                            <div className="product">
                                <img src="https://via.placeholder.com/120x180" alt="" />
                                <p>Free People</p>
                                {/* <span>$20.99</span> */}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
export default Searchpage;