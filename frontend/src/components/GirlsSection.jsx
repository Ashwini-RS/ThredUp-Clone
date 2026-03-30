function GirlsSection() {
    return (
      <section className="girls-section">
        <h2>Girls' Finds for Less</h2>
  
        <div className="cards-container">
  
          {/* Card 1 */}
          <div className="card">
            <img src="/images/girlsunder5.webp" alt="Girl 1" />
            <div className="price">Under $5</div>
          </div>
  
          {/* Card 2 */}
          <div className="card">
            <img src="/images/girlsunder10.webp" alt="Girl 2" />
            <div className="price">Under $10</div>
          </div>
  
          {/* Card 3 */}
          <div className="card">
            <img src="/images/girlsunder20.webp" alt="Girl 3" />
            <div className="price">Under $20</div>
          </div>
  
          {/* Card 4 */}
          <div className="card">
            <img src="/images/thredupgirls.webp" alt="Girl 4" />
            <div className="price">Under $20</div>
          </div>
  
        </div>
      </section>
    )
  }
  
  export default GirlsSection
  