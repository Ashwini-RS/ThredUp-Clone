function Brands() {
    return (
      <section className="brands">
        <div className="brand-heading">
          <h2>Top Brands, Low Prices</h2>
          <a href="#" className="shop-all">SHOP ALL</a>
        </div>
  
        <div className="brands-row">
          <div className="brand">
            <a href="#">
              <img 
                src="https://cf-assets-clover-app.thredup.com/uploads/2025-10-31/Card%2011-5d009132.jpg" 
                alt="brand" 
              />
            </a>
          </div>
  
          <div className="brand">
            <a href="#">
              <img src="/images/jcrew.webp" alt="brand" />
            </a>
          </div>
  
          <div className="brand">
            <a href="#">
              <img src="/images/levis.webp" alt="brand" />
            </a>
          </div>
  
          <div className="brand">
            <a href="#">
              <img src="/images/athleta.webp" alt="brand" />
            </a>
          </div>
  
          <div className="brand">
            <a href="#">
              <img src="/images/torrid.webp" alt="brand" />
            </a>
          </div>
  
          <div className="brand">
            <a href="#">
              <img src="/images/nike.webp" alt="brand" />
            </a>
          </div>
        </div>
      </section>
    );
  }
  
  export default Brands;
  