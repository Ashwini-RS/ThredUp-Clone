function SearchPage() {
    return (
        <>
            <div className="product-page">
                <h2 className="product-title">Athleta</h2>
            </div>

            <div className="products-grid">
                <div className="products-card">

                        <img src="images/athleta1.webp" />
                        <p className="brand-title">Athleta</p>
                        <p className="desc">Size M Casual Dress</p>
                        <p className="price-section">
                            <span className="old">$43.99</span>
                            <span className="new">$21.99</span>
                            <span className="off">50% off</span>
                        </p>
                        <p className="code-p">with code FIRST50</p>

                </div>

                <div className="products-card">
                     
                     <img src="images/athleta2.webp" />
                     <p className="brand-title">Athleta</p>
                     <p className="desc">Shirt</p>
                     <p className="price-section">
                         <span className="old">$43.99</span>
                         <span className="new">$21.99</span>
                         <span className="off">50% off</span>
                     </p>
                     <p className="code-p">with code FIRST50</p>

             </div>

             <div className="products-card">
                     
                     <img src="images/athleta4.webp" />
                     <p className="brand-title">Athleta</p>
                     <p className="desc">Shirts</p>
                     <p className="price-section">
                         <span className="old">$43.99</span>
                         <span className="new">$21.99</span>
                         <span className="off">50% off</span>
                     </p>
                     <p className="code-p">with code FIRST50</p>

             </div>

             <div className="products-card">
                     
                     <img src="images/athleta5.webp" />
                     <p className="brand-title">Athleta</p>
                     <p className="desc">Tanl top</p>
                     <p className="price-section">
                         <span className="old">$43.99</span>
                         <span className="new">$21.99</span>
                         <span className="off">50% off</span>
                     </p>
                     <p className="code-p">with code FIRST50</p>

             </div>

            </div>
        </>
    );
}

export default SearchPage;