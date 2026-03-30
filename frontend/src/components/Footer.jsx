function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-column">
                    <h3>The Company</h3>
                    <ul>
                        <li>About Us</li>
                        <li>Blog</li>
                        <li>Resale Report</li>
                        <li>Our Impact</li>
                        <li>Careers</li>
                        <li>Resale-as-a-Service</li>
                        <li>Newsroom</li>
                        <li>Investors</li>
                        <li>FAQ</li>
                        <li>Return Policy</li>
                        <li>Reviews</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Shop Departments</h3>
                    <ul>
                        <li>Women</li>
                        <li>Kids</li>
                        <li>Juniors</li>
                        <li>Designer</li>
                        <li>Maternity</li>
                        <li>Plus</li>
                        <li>Shoes</li>
                        <li>Handbags</li>
                        <li>Accessories</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Top Brands</h3>
                    <ul>
                        <li>J.Crew</li>
                        <li>Ann Taylor LOFT</li>
                        <li>Banana Republic</li>
                        <li>BCBGMAXAZRIA</li>
                        <li>Lululemon Athletica</li>
                        <li>Talbots</li>
                        <li>Free People</li>
                        <li>Lilly Pulitzer</li>
                        <li>Madewell</li>
                        <li>Shop All Brands</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Discover</h3>
                    <ul>
                        <li>Rescues</li>
                        <li>Size Guide</li>
                        <li>ThredUp Insider</li>
                        <li>Gift Cards</li>
                        <li>Discount Codes</li>
                        <li>Sitemap</li>
                    </ul>

                    <h3 className="sell-title">Sell</h3>
                    <ul>
                        <li>Order a Bag</li>
                        <li>Selling Guide</li>
                        <li>All About Earnings</li>
                    </ul>
                </div>

                <div className="footer-column wide">
                    <h3>Sign Up, Save More</h3>
                    <p>
                        New here? Sign up to receive our emails and get extra deals on your first order. Read terms
                    </p>

                    <div className="signup-box">
                        <input type="email" placeholder="Enter your email" />
                        <button>SIGN UP</button>
                    </div>

                    <h3 className="mobile-title">It’s easier to shop on mobile</h3>
                    <p>
                        Download the app and get notified when your order ships and get personalized recommendations
                    </p>

                    <div className="app-section">
                        <img src="images/qr-footer.webp" alt="QR Code" />
                        <div className="app-buttons">
                            <button className="app-btn">Download on the App Store</button>
                            <button className="app-btn">Get it on Google Play</button>
                        </div>
                    </div>

                    <h3 className="connect-title">Connect with Us</h3>

                    <div className="social-icons">
                        <div className="icon">
                            <i className="fa-brands fa-instagram"></i>
                        </div>

                        <div className="icon">
                            <i className="fa-brands fa-facebook"></i>
                        </div>

                        <div className="icon">
                            <i className="fa-brands fa-pinterest"></i>
                        </div>

                        <div className="icon">
                            <i className="fa-brands fa-square-x-twitter"></i>
                        </div>

                    </div>
                </div>
            </div>

            <hr className="footer-line" />

            <div className="footer-inner">
                <p className="footer-title">
                    Discover one of the world’s largest online consignment {"&"} thrift stores.
                </p>

                <p className="footer-desc">
                    As one of the world’s largest online resale platforms for women’s and kids’ apparel,
                    shoes, and accessories, our mission is to inspire a new generation of shoppers
                    to think secondhand clothes first. You can shop like-new and used women’s clothes
                    and kids’ clothes at up to 90% off estimated retail at our online thrift store
                    and consignment shop. From Gap to Gucci, we have all your favorite brands for less.
                    Plus, enjoy thousands of arrivals every day. Happy thrifting!
                </p>

                <div className="footer-notes">
                    <p>* While supplies last
                        <br />
                        ** % of estimated retail. See our Terms of Use for more information.
                        <br />
                        All brand names and logos are trademarks of their respective owners.</p>
                </div>
            </div>

            <div className="footer-links">
                <a href="#">Terms of Use</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Accessibility</a>
                <a href="#">Do Not Sell My Personal Information</a>
                <a href="#">Your Privacy Choices</a>
                <div className="footer-rights">
                    <i className="fa-regular fa-copyright"></i>{" "}ThredUp Inc. All Rights Reserved
                </div>
            </div>
            
        </footer>
    );
}

export default Footer;
