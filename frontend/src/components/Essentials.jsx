
function Essentials() {
  return (
    <section className="essentials">
      
      {/* Heading Row */}
      <div className="heading">
        <h3>Style Essentials on sale</h3>
        <button className="button">Shop All</button>
      </div>

      {/* Categories */}
      <div className="categories">
        <a href="#">
          <img src="/images/dresses.webp" alt="dresses" />
          <p>Dresses</p>
        </a>
      </div>

      <div className="categories">
        <a href="#">
          <img src="/images/sweaters.webp" alt="Sweaters" />
          <p>Sweaters</p>
        </a>
      </div>

      <div className="categories">
        <a href="#">
          <img src="/images/denim.jpeg" alt="Denim" />
          <p>Denim</p>
        </a>
      </div>

      <div className="categories">
        <a href="#">
          <img src="/images/coats.webp" alt="Coats" />
          <p>Coats</p>
        </a>
      </div>

      <div className="categories">
        <a href="#">
          <img src="/images/activewear.webp" alt="Activewear" />
          <p>Activewear</p>
        </a>
      </div>

      <div className="categories">
        <a href="#">
          <img src="/images/shopall.webp" alt="Shop All Sale" />
          <p>Shop All Sale</p>
        </a>
      </div>

    </section>
  );
}

export default Essentials;
