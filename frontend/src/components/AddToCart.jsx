import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

function AddToCart() {
    // const userEmail = JSON.parse(localStorage.getItem('userEmail'))

    const [showCheckoutModal, setShowCheckoutModal] = useState(false);

    // const [user, setUser] = useState({})
    const address = user?.address?.[0]
    const navigate = useNavigate()
    const location = useLocation();

    const [cartItems, setCartItems] = useState([])

    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const cartItemsCount = cart.length

    // function checkout(){
    //     navigate('/Checkout')
    // }

    useEffect(() => {
        if (location.state?.openPayment) {
            setShowPaymentModal(true);
        }
    }, [location.state]);

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
        localStorage.removeItem("userId")
        localStorage.removeItem('cart')
        window.location.reload()
    }

    const continueShopping = () => {
        navigate('/')
    }

    const quantity = (index, quant) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart[index].quantity = Number(quant);
        localStorage.setItem("cart", JSON.stringify(cart));

        const updatedItems = [...cartItems];
        updatedItems[index].quantity = Number(quant);
        setCartItems(updatedItems);
    }

    const removeCartItem = (index) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = cart.filter((item, i) => i !== index);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        const updatedItems = cartItems.filter((item, i) => i !== index);
        setCartItems(updatedItems);
    }

    //CALCULATION

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

        const user = localStorage.getItem('userId')
        if (!user) {
            navigate('/login')
            return
        }

        try {
            const res = await axios.post("https://thredup-clone.onrender.com/placeAnOrder", {
                userId: user,
                products: cartItems,
                finalTotal: finalTotal,
                paymentMode: 'Cash On Delivery',
                paymentId: null,
                paymentStatus: 'Pending'
            })

            await axios.post("https://thredup-clone.onrender.com/sendGSTInvoice", {
                    userId: user
            })

            alert("Order placed successfully")
            navigate('/Order')
        }
        catch (err) {
            console.log("order failed: ", err)
        }
    }

    const proceedTopay = async () => {
        const userId = localStorage.getItem("userId")

        if(!userId) {
            navigate('/login')
        }
        
        if (!address?.pincode) {
            navigate('/Address')
            return
        }
        setShowCheckoutModal(true)
    }

    const payNow = async () => {
        const userId = localStorage.getItem("userId")

        try {
            //create razorpay order
            const res = await axios.post('https://thredup-clone.onrender.com/createOrder', {
                finalTotal: finalTotal
            })

            const { order, razorpayKeyId } = res.data

            const options = {
                key: razorpayKeyId,
                amount: order.amount,
                currency: 'INR',
                name: 'ThredUp',
                description: 'Order Payment',
                order_id: order.id,

                handler: async function (response) {
                    try {
                        const verify = await axios.post('https://thredup-clone.onrender.com/verifyPayment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            userId: userId,
                            products: cartItems,
                            finalTotal: finalTotal
                        })

                        if (verify.data.success) {

                            await axios.post('https://thredup-clone.onrender.com/sendGSTInvoice', {
                                userId: userId
                            })

                            alert('Payment Successfull and Invoice send to mail')
                            navigate('/Order')
                        }
                    }
                    catch (err) {
                        console.log(err)
                    }
                }
            }
            const rzp = new window.Razorpay(options)
            rzp.open()
        }
        catch (err) {
            console.log(err)
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
                                    <img src={item.productImage} alt="product" />

                                    <div className="item-details">
                                        <h3>{item.productName}</h3>
                                        <p>Size: {item.size} {item.productDescription}</p>
                                        <p>₹{item.newprice}</p>

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
                                <span>₹{subTotal}</span>
                            </div>

                            <div className="summary-row">
                                <span>Shipping</span>
                                <p> {shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}</p>
                            </div>

                            <div className="summary-row">
                                <span>Tax</span>
                                <span>₹{taxAmount.toFixed(2)}</span>
                            </div>

                            <hr />

                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₹{finalTotal}</span>
                            </div>

                            <button className="checkout-btn"
                                onClick={proceedTopay} >
                                PROCEED TO PAY
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/*----------- CHECKOUT PAGE ------------*/}

            {
                showCheckoutModal && (
                    <div className="modal-overlay">
                        <div className="modal-box">

                            <button className="checkout-close-btn" onClick={() => setShowCheckoutModal(false)}>
                                X
                            </button>

                            <div className="checkout-container">
                                <div className="checkout-header">
                                    {/* <FaShieldAlt className="secure-icon" /> */}
                                    <div>
                                        <h2>Secure Checkout</h2>
                                        <p>Your information is safe and secure</p>
                                    </div>
                                </div>

                                <div className="top-grid">

                                    <div className="shipping-box">
                                        <h3>
                                            {/* <FaMapMarkerAlt /> */}
                                            Shipping Details</h3>

                                        <div className="shipping-content">
                                            <div className="shipping-block">
                                                <p className="name">Jane Smith</p>
                                                <p>742 Evergreen Terrace</p>
                                                <p>Unit 12, Seattle, WA 98101</p>
                                                <p><strong>(206) 555-0199</strong></p>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="order-box">
                                        <h3>Your Order</h3>

                                        <div className="checkout-order-item">

                                            <img src="/images/madwell.webp" alt="product" />
                                            <div className="chechout-order-details">
                                                <p>Blazer </p>
                                                <p>$25.09</p>
                                            </div>
                                        </div>

                                        <h2 className="checkout-total">Total: $25.99</h2>
                                    </div>

                                </div>

                                <div className="checkout-pay-card">
                                    <h3>
                                        {/* <FaCreditCard /> */}
                                        Payment Methods</h3>

                                    {/* <label className="payment-option">
                                        <input type="radio" name="pay" />
                                        <span>Cash on Delivery</span>
                                    </label>

                                    <label className="payment-option">
                                        <input type="radio" name="pay" />
                                        <span>Online Payment</span>
                                    </label> */}
                                </div>

                                <div className="checkout-buttons">
                                    <button type="submit" onClick={placeAnOrder} className="place-order">PLACE AN ORDER - COD</button>
                                    <button type="submit" onClick={payNow} className="pay-now">PAY NOW - Online</button>
                                </div>

                            </div>

                        </div>
                    </div>
                )
            }
        </>
    );
}

export default AddToCart