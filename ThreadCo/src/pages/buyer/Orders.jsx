import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  PartyPopper, ShoppingBag, ChevronUp, ChevronDown,
  FileDown, Star, RefreshCw, XCircle,
} from 'lucide-react'
import './Orders.css'

const MOCK_ORDERS = [
  { id: 'TC12345678', date: '2025-01-15', status: 'Delivered',        items: [{ name: 'Oxford Button-Down Shirt', qty: 1, price: 1299, size: 'L',  img: 'https://picsum.photos/seed/shirt1/80/100'   }], total: 1299 },
  { id: 'TC87654321', date: '2025-01-20', status: 'Out for Delivery', items: [{ name: 'Floral Wrap Dress',        qty: 1, price: 1799, size: 'M',  img: 'https://picsum.photos/seed/dress7/80/100'   }, { name: 'Polo T-Shirt', qty: 2, price: 699, size: 'L', img: 'https://picsum.photos/seed/polo3/80/100' }], total: 3197 },
  { id: 'TC11223344', date: '2025-01-25', status: 'Processing',       items: [{ name: 'Anarkali Suit Set',        qty: 1, price: 2999, size: 'M',  img: 'https://picsum.photos/seed/anarkali16/80/100'}], total: 2999 },
]

const STATUS_COLOR = {
  'Delivered':        'badge-green',
  'Out for Delivery': 'badge-blue',
  'Processing':       'badge-yellow',
  'Cancelled':        'badge-red',
}

const STATUS_STEPS = ['Order Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered']

export default function Orders() {
  const [params] = useSearchParams()
  const newOrderId = params.get('new')
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="orders-page">
      <div className="container">
        <div className="page-header">
          <h1>My Orders</h1>
          <p>Track and manage your purchases</p>
        </div>

        {newOrderId && (
          <div className="order-success-banner">
            <PartyPopper size={24} />
            <div>
              <strong>Order placed successfully!</strong>
              <p>Order ID: <code>{newOrderId}</code> — You'll receive a confirmation shortly.</p>
            </div>
          </div>
        )}

        {MOCK_ORDERS.length === 0 ? (
          <div className="empty-orders">
            <ShoppingBag size={48} strokeWidth={1.2} />
            <h3>No orders yet</h3>
            <p>Start shopping and your orders will appear here.</p>
            <Link to="/shop" className="btn btn-primary">Shop Now</Link>
          </div>
        ) : (
          <div className="orders-list">
            {MOCK_ORDERS.map(order => (
              <div key={order.id} className="order-card card">
                <div className="order-header" onClick={() => setExpanded(e => e === order.id ? null : order.id)}>
                  <div className="order-meta">
                    <div className="order-id">Order #{order.id}</div>
                    <div className="order-date">Placed on {order.date}</div>
                  </div>
                  <div className="order-info-right">
                    <span className={`badge ${STATUS_COLOR[order.status] || 'badge-gray'}`}>{order.status}</span>
                    <span className="order-total">₹{order.total.toLocaleString()}</span>
                    <span className="expand-icon">
                      {expanded === order.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </div>
                </div>

                {expanded === order.id && (
                  <div className="order-body">
                    {/* Tracking */}
                    <div className="tracking-bar">
                      {STATUS_STEPS.map((s, i) => {
                        const done = STATUS_STEPS.indexOf(order.status) >= i
                        return (
                          <div key={s} className={`track-step ${done ? 'done' : ''}`}>
                            <div className="track-dot" />
                            <span>{s}</span>
                          </div>
                        )
                      })}
                    </div>

                    <div className="divider" />

                    {/* Items */}
                    <div className="order-items">
                      {order.items.map((item, i) => (
                        <div key={i} className="order-item">
                          <img src={item.img} alt={item.name} />
                          <div>
                            <p className="oi-name">{item.name}</p>
                            <p className="oi-meta">Size: {item.size} | Qty: {item.qty}</p>
                          </div>
                          <div className="oi-price">₹{(item.price * item.qty).toLocaleString()}</div>
                        </div>
                      ))}
                    </div>

                    <div className="divider" />

                    <div className="order-footer-actions">
                      {order.status === 'Delivered' && (
                        <>
                          <button className="btn btn-outline btn-sm"><Star size={13} /> Write Review</button>
                          <button className="btn btn-ghost btn-sm"><RefreshCw size={13} /> Return / Exchange</button>
                        </>
                      )}
                      {order.status === 'Processing' && (
                        <button className="btn btn-danger btn-sm"><XCircle size={13} /> Cancel Order</button>
                      )}
                      <button className="btn btn-ghost btn-sm"><FileDown size={13} /> Download Invoice</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}