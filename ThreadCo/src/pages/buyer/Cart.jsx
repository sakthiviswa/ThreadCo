import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Trash2, ArrowLeft, ShieldCheck, CreditCard } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import './Cart.css'

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal, clearCart } = useApp()

  const shipping = cartTotal >= 599 ? 0 : 49
  const total = cartTotal + shipping

  if (cart.length === 0) return (
    <div className="container empty-cart">
      <ShoppingCart size={48} strokeWidth={1.2} />
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added anything yet.</p>
      <Link to="/shop" className="btn btn-primary btn-lg">Start Shopping</Link>
    </div>
  )

  return (
    <div className="cart-page">
      <div className="container">
        <div className="page-header">
          <h1>Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h1>
        </div>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.key} className="cart-item card">
                <div className="ci-img">
                  <img src={item.product.img} alt={item.product.name} />
                </div>
                <div className="ci-info">
                  <div className="ci-seller">{item.product.seller}</div>
                  <Link to={`/product/${item.product.id}`} className="ci-name">{item.product.name}</Link>
                  <div className="ci-meta">
                    <span className="badge badge-gray">Size: {item.size}</span>
                    <span className="badge badge-gray">Color: {item.product.color}</span>
                  </div>
                  <div className="ci-bottom">
                    <div className="qty-ctrl">
                      <button onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                    </div>
                    <div className="ci-price">
                      <span className="ci-total">₹{(item.product.price * item.qty).toLocaleString()}</span>
                      <span className="ci-unit">₹{item.product.price.toLocaleString()} each</span>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.key)}>
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="cart-actions">
              <button className="btn btn-ghost" onClick={clearCart}>
                <Trash2 size={15} /> Clear Cart
              </button>
              <Link to="/shop" className="btn btn-outline">
                <ArrowLeft size={15} /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div className="cart-summary card">
            <h3>Order Summary</h3>
            <div className="divider" />

            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="free-ship">FREE</span> : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <div className="ship-note">Add ₹{(599 - cartTotal).toLocaleString()} more for free shipping!</div>
              )}
              <div className="divider" />
              <div className="summary-row total-row">
                <strong>Total</strong>
                <strong>₹{total.toLocaleString()}</strong>
              </div>
            </div>

            <Link to="/checkout" className="btn btn-accent btn-lg btn-full">Proceed to Checkout →</Link>

            <div className="secure-note">
              <ShieldCheck size={14} /> Secure checkout. All payments encrypted.
            </div>

            <div className="payment-methods">
              <span>We accept:</span>
              <div className="pay-chips">
                <span><CreditCard size={13} /> Visa</span>
                <span><CreditCard size={13} /> Mastercard</span>
                <span>UPI</span>
                <span>COD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}