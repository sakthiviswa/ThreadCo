import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin, ClipboardList, CreditCard,
  Check, Smartphone, Landmark, Wallet,
  ShieldCheck, Truck,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import './Checkout.css'

const STEP_META = [
  { label: 'Delivery Address', icon: <MapPin size={15} /> },
  { label: 'Order Review',     icon: <ClipboardList size={15} /> },
  { label: 'Payment',          icon: <CreditCard size={15} /> },
]

const PAY_METHODS = [
  { id: 'upi',     icon: <Smartphone size={18} />, label: 'UPI',                  sub: 'GPay, PhonePe, Paytm' },
  { id: 'card',    icon: <CreditCard size={18} />, label: 'Credit / Debit Card',  sub: 'Visa, Mastercard, Rupay' },
  { id: 'netbank', icon: <Landmark size={18} />,   label: 'Net Banking',           sub: 'All major banks' },
  { id: 'cod',     icon: <Wallet size={18} />,     label: 'Cash on Delivery',      sub: 'Pay when you receive' },
]

export default function Checkout() {
  const { cart, cartTotal, clearCart, toast, user } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [payMethod, setPayMethod] = useState('upi')
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '', phone: '',
    address: '', city: '', state: '', pincode: '',
  })

  const shipping = cartTotal >= 599 ? 0 : 49
  const total = cartTotal + shipping
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handlePlaceOrder = () => {
    const orderId = 'TC' + Date.now().toString().slice(-8)
    clearCart()
    toast('Order placed successfully!', 'success')
    navigate(`/orders?new=${orderId}`)
  }

  if (cart.length === 0) { navigate('/cart'); return null }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="page-header"><h1>Checkout</h1></div>

        {/* Steps indicator */}
        <div className="steps">
          {STEP_META.map((s, i) => (
            <div key={s.label} className={`step ${step > i + 1 ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
              <div className="step-num">
                {step > i + 1 ? <Check size={14} /> : (i + 1)}
              </div>
              <span className="step-icon-label">{s.icon}{s.label}</span>
            </div>
          ))}
        </div>

        <div className="checkout-layout">
          <div className="checkout-main">

            {/* Step 1: Address */}
            {step === 1 && (
              <div className="step-box card">
                <h3>Delivery Address</h3>
                <div className="divider" />
                <div className="grid-2">
                  <div className="field"><label>Full Name</label><input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" /></div>
                  <div className="field"><label>Phone</label><input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="10-digit mobile" /></div>
                </div>
                <div className="field"><label>Email</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" /></div>
                <div className="field"><label>Address (House/Flat/Street)</label><textarea value={form.address} onChange={e => set('address', e.target.value)} placeholder="Flat no., building name, street..." rows={3} /></div>
                <div className="grid-3">
                  <div className="field"><label>City</label><input value={form.city} onChange={e => set('city', e.target.value)} placeholder="City" /></div>
                  <div className="field"><label>State</label>
                    <select value={form.state} onChange={e => set('state', e.target.value)}>
                      <option value="">Select State</option>
                      {['Tamil Nadu','Karnataka','Maharashtra','Delhi','Gujarat','Rajasthan','West Bengal','Kerala','Telangana','Uttar Pradesh'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="field"><label>Pincode</label><input value={form.pincode} onChange={e => set('pincode', e.target.value)} placeholder="6-digit" /></div>
                </div>
                <button className="btn btn-primary btn-lg" onClick={() => {
                  if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) { toast('Please fill all fields', 'error'); return }
                  setStep(2)
                }}>Continue to Review →</button>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="step-box card">
                <h3>Review Your Order</h3>
                <div className="divider" />
                <div className="review-addr">
                  <strong><MapPin size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />Delivering to:</strong>
                  <p>{form.name} | {form.phone}</p>
                  <p>{form.address}, {form.city} – {form.pincode}, {form.state}</p>
                  <button className="btn btn-ghost btn-sm" onClick={() => setStep(1)}>Edit</button>
                </div>
                <div className="divider" />
                <div className="review-items">
                  {cart.map(item => (
                    <div key={item.key} className="review-item">
                      <img src={item.product.img} alt={item.product.name} />
                      <div>
                        <p className="ri-name">{item.product.name}</p>
                        <p className="ri-meta">Size: {item.size} | Qty: {item.qty}</p>
                      </div>
                      <strong className="ri-price">₹{(item.product.price * item.qty).toLocaleString()}</strong>
                    </div>
                  ))}
                </div>
                <div className="divider" />
                <div className="review-total">
                  <span>Total Amount:</span>
                  <strong>₹{total.toLocaleString()}</strong>
                </div>
                <button className="btn btn-primary btn-lg" onClick={() => setStep(3)}>Continue to Payment →</button>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="step-box card">
                <h3>Payment</h3>
                <div className="divider" />
                <div className="pay-methods">
                  {PAY_METHODS.map(m => (
                    <label key={m.id} className={`pay-option ${payMethod === m.id ? 'active' : ''}`}>
                      <input type="radio" name="pay" value={m.id} checked={payMethod === m.id} onChange={() => setPayMethod(m.id)} />
                      <span className="pay-method-icon">{m.icon}</span>
                      <div>
                        <strong>{m.label}</strong>
                        <span>{m.sub}</span>
                      </div>
                    </label>
                  ))}
                </div>

                {payMethod === 'upi' && (
                  <div className="field" style={{ marginTop: 16 }}>
                    <label>UPI ID</label>
                    <input placeholder="yourname@upi" />
                  </div>
                )}
                {payMethod === 'card' && (
                  <div style={{ marginTop: 16 }}>
                    <div className="field"><label>Card Number</label><input placeholder="1234 5678 9012 3456" /></div>
                    <div className="grid-2">
                      <div className="field"><label>Expiry</label><input placeholder="MM/YY" /></div>
                      <div className="field"><label>CVV</label><input placeholder="***" type="password" /></div>
                    </div>
                  </div>
                )}

                <button className="btn btn-accent btn-lg" style={{ marginTop: 8 }} onClick={handlePlaceOrder}>
                  Place Order — ₹{total.toLocaleString()}
                </button>
                <p className="secure-pay-note">
                  <ShieldCheck size={13} /> Your payment info is encrypted and secure
                </p>
              </div>
            )}
          </div>

          {/* Order Summary sidebar */}
          <div className="checkout-summary card">
            <h3>Order Summary</h3>
            <div className="divider" />
            {cart.map(item => (
              <div key={item.key} className="cs-item">
                <span className="cs-name">{item.product.name} × {item.qty}</span>
                <span>₹{(item.product.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="divider" />
            <div className="cs-item"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
            <div className="cs-item">
              <span><Truck size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div className="divider" />
            <div className="cs-item cs-total"><strong>Total</strong><strong>₹{total.toLocaleString()}</strong></div>
          </div>
        </div>
      </div>
    </div>
  )
}