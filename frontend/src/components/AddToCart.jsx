import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import { checkout } from "../../../server/LoginAuth/Auth";

function AddToCart() {
    // const userEmail = JSON.parse(localStorage.getItem('userEmail'))

    const navigate = useNavigate()

    const [cartItems, setCartItems] = useState([])

    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const cartItemsCount = cart.length

    function checkout(){
        navigate('/Checkout')
    }

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const fetchProducts = async () => {
            let data = [];

            for (const item of cart) {
                const res = await axios.get(`https://thredup-clone.onrender.com/products/${item.productId}`);
                data.push({ ...res.data, quantity: item.quantity });
            }

            setCartItems(data);
        };

        fetchProducts();
    }, []);

    //     const storedItems = JSON.parse(localStorage.getItem("cart")) || []
    //     const quantityCalculate = storedItems.map(item => ({
    //         ...item, quantity: item.quantity || 1
    //     }))
    //     setCartItems(quantityCalculate)
    // }, [])

    const handleLogout = () => {
        localStorage.removeItem("userEmail")
        window.location.reload()
    }

    const continueShopping = () => {
        navigate('/')
    }

    const quantity = (index, quant) => {
        const cart = [...cartItems]
        cart[index].quantity = Number(quant)
        setCartItems(cart)
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    const removeCartItem = (index) => {
        const cart = cartItems.filter((item, i) => i !== index)
        setCartItems(cart)
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    // const subTotal = cartItems.reduce((total, item) => {
    //     const price = parseFloat(item.newprice) || 0;
    //     const qty = Number(item.quantity) || 0;
    //     return total + price * qty;
    // }, 0);

    // const subTotal = cartItems.reduce((total, item) => {
    //     return total + Number(item.newprice) * item.quantity
    // }, 0)

    const subTotal = cartItems.reduce((total, item) => {
        const price = Number(item.newprice) || 0;
        const qty = Number(item.quantity) || 0;
        return total + price * qty;
    }, 0)
    
    const shippingCharge = subTotal > 1500 ? 0 : 200;

    // const finalTotal = subTotal + shippingCharge;

    const taxRate = subTotal > 1000 ? 0.10 : 0.05;

    const taxAmount = subTotal * taxRate;

    // const finalTotal = subTotal + shippingCharge + taxAmount;
    const finalTotal = Number(subTotal + shippingCharge + taxAmount)

    const placeAnOrder = async () => {
            const user = JSON.parse(localStorage.getItem('userEmail'))
            if (!user) {
                navigate('/login')
                return
            }

        try {
            const res = await axios.post("https://thredup-clone.onrender.com/placeAnOrder", {
                userEmail: user,
                products: cartItems,
                finalTotal: finalTotal
            })

            alert("Order placed successfully")
        }
        catch (err) {
            console.log("order failed: ", err)
        }
    }

    return (
        <>
            <div className="cart-container">

                {/* to show there is no items in cart page */}
                {cartItems.length === 0 ? (
                    <div className="empty-cart-container">
                        <div className="empty-cart-content">

                            <div className="icon">
                                <img src="/images/search-cart.svg" alt="" />
                            </div>

                            <h1>Shopping Cart</h1>
                            <p>Your cart is empty! Fill it with like-new styles.</p>

                            <button onClick={continueShopping}> SHOP NOW </button>
                        </div>
                    </div>

                ) : (

                    <>
                        {/* to show the items when there is an items in the cart */}
                        <div className="cart-left">
                            <h2>YOUR CART ({cartItems.length})</h2>

                            {cartItems.map((item, index) => (
                                <div className="cart-item" key={index}>
                                    <img src={`https://thredup-clone.onrender.com/${item.productImage}`} alt="product" />

                                    <div className="item-details">
                                        <h3>{item.productName}</h3>
                                        <p>Size: {item.size} {item.productDescription}</p>
                                        <p>${item.newprice}</p>

                                        <div className="quantity-box">
                                            <label>Quantity: </label>
                                            <select name="Quantity" value={item.quantity}
                                                onChange={(e) => quantity(index, e.target.value)}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>

                                        {/* <div className="qty-remove">
                                            <button className="remove" onClick={() => removeCartItem(index)}>
                                                <img src="/images/trash-remove.svg" alt="remove" /></button>
                                        </div> */}
                                    </div>
                                    <button className="remove" onClick={() => removeCartItem(index)}>
                                        <img src="/images/trash-remove.svg" alt="remove" /></button>

                                </div>

                            ))}

                        </div>

                        <div className="cart-right">
                            <h3>ORDER SUMMARY</h3>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${subTotal}</span>
                            </div>

                            <div className="summary-row">
                                <span>Shipping</span>
                                <p> {shippingCharge === 0 ? "FREE" : `$${shippingCharge}`}</p>
                            </div>

                            <div className="summary-row">
                                <span>Tax</span>
                                <span>${taxAmount.toFixed(2)}</span>
                            </div>

                            <hr />

                            <div className="summary-row total">
                                <span>Total</span>
                                <span>{finalTotal}</span>
                            </div>

                            <button className="checkout-btn" onClick={checkout}>
                                PROCEED TO PAY
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default AddToCart