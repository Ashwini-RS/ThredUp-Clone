import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import SearchBar from "./SearchBar";

function Header() {

  const userEmail = JSON.parse(localStorage.getItem('userEmail'))
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsCount = cart.length;

  const handleLogout = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem('cart')
    window.location.reload()
}

  return (
    <>
      <div className="top-bar">
        FREE CLEAN OUT BAG & 50% OFF FEES WHEN YOU SELL WITH US!
        <Link > ORDER A CLEAN OUT BAG</Link>
      </div>

      <header className="header">
        <div className="header-row">

          <div className="toggle">
            <button className="active">SHOP</button>
            <button>SELL</button>
          </div>

          <div className="logo">THREDUP</div>


          {/* <div className="search-box">
            <input type="text" placeholder="Search" />
            <i className="fa-regular fa-camera" style={{ marginTop: '10px' }}></i>
          </div> */}
          <SearchBar />
        </div>

        <div className="nav-row">

          <nav className="nav-menu">
            <a href="#">New Arrivals</a>
            <Link to="/Womens">Women</Link>
            <Link to="/Designer">Designer</Link>
            <Link to="/Premium">Premium</Link>
            <Link to="/TheDresses">Dresses</Link>
            {/* <Link href="#">Shoes</Link>
            <Link href="#">Handbags</Link>
            <Link href="#">Accessories</Link> */}
            <Link to="/kids">Kids</Link>
            {/* <a href="#">Sale</a>
            <a href="#">Brands</a> */}
          </nav>

          <div className="icons">

            <i className="fa-regular fa-heart"></i>

            {userEmail ? (
              <Link className="user-icon" onClick={handleLogout}>
                <CiLogout />
              </Link>

            ) : (
              <>
              <Link to="/Login" className="user-icon">
                <i className="fa-regular fa-user">
                  <div className="dropdown">

                    <div className="dropdown-content">
                      <Link to="/UserPage">My Account </Link>
                      <Link to="/Order">My Orders</Link>
                      <Link to="/">My Address</Link>
                      <Link onClick={handleLogout}>Logout</Link>
                    </div>

                  </div>
                </i>
              </Link>
              </>
            )}

            {/* {userEmail ? (
                <Link to="/" onClick={handleLogout}>
                  <CiLogout />
                </Link>

            ) : (
              <Link to="/Login" className="user-icon">
                 <i className="fa-regular fa-user"></i>
               </Link>
            )} */}


            <Link to="/AddToCart" className="cart-icon">

              <i className="fa-solid fa-cart-arrow-down"></i>
              <span className="cart-item-len">
                {cartItemsCount}
              </span>

            </Link>

          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
