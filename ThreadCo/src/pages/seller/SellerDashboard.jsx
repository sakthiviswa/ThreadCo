import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { PRODUCTS } from '../../data/products'
import './SellerDashboard.css'

const STATS = [
  { label: 'Total Products', value: '12', icon: '📦', color: '#dbeafe', trend: '+2 this month' },
  { label: 'Total Orders', value: '248', icon: '🛒', color: '#d1fae5', trend: '+18 this week' },
  { label: 'Revenue (₹)', value: '1,24,500', icon: '💰', color: '#fef3c7', trend: '+12% vs last month' },
  { label: 'Avg. Rating', value: '4.6', icon: '⭐', color: '#fee2e2', trend: 'From 312 reviews' },
]

const RECENT_ORDERS = [
  { id: 'TC10001', product: 'Oxford Button-Down Shirt', buyer: 'Rahul M.', date: '2025-01-28', status: 'Processing', amount: 1299 },
  { id: 'TC10002', product: 'Polo T-Shirt × 2', buyer: 'Priya K.', date: '2025-01-27', status: 'Shipped', amount: 1398 },
  { id: 'TC10003', product: 'Slim Fit Chinos', buyer: 'Arjun S.', date: '2025-01-26', status: 'Delivered', amount: 1599 },
  { id: 'TC10004', product: 'Denim Jacket', buyer: 'Meena R.', date: '2025-01-25', status: 'Delivered', amount: 2199 },
  { id: 'TC10005', product: 'Graphic Hoodie', buyer: 'Suresh V.', date: '2025-01-24', status: 'Cancelled', amount: 1099 },
]

const STATUS_COLOR = { 'Processing': 'badge-yellow', 'Shipped': 'badge-blue', 'Delivered': 'badge-green', 'Cancelled': 'badge-red' }

export default function SellerDashboard() {
  const { user } = useApp()
  const myProducts = PRODUCTS.slice(0, 6)

  return (
    <div className="seller-dash">
      <div className="seller-header">
        <div className="container">
          <div className="seller-welcome">
            <div>
              <h1>👋 Welcome back, {user?.name || 'Seller'}!</h1>
              <p>Here's what's happening with your store today.</p>
            </div>
            <Link to="/seller/add-product" className="btn btn-accent btn-lg">+ Add New Product</Link>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Stats */}
        <div className="stats-grid">
          {STATS.map(s => (
            <div key={s.label} className="stat-card card" style={{ borderTop: `3px solid ${s.color === '#dbeafe' ? '#3b82f6' : s.color === '#d1fae5' ? '#10b981' : s.color === '#fef3c7' ? '#f59e0b' : '#ef4444'}` }}>
              <div className="stat-top">
                <span className="stat-icon" style={{ background: s.color }}>{s.icon}</span>
                <span className="stat-val">{s.value}</span>
              </div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-trend">{s.trend}</div>
            </div>
          ))}
        </div>

        <div className="dash-grid">
          {/* Recent Orders */}
          <div className="dash-section card">
            <div className="section-hd-small">
              <h3>Recent Orders</h3>
              <Link to="/seller/orders" className="view-all-sm">View All</Link>
            </div>
            <table className="mini-table">
              <thead>
                <tr><th>Order ID</th><th>Product</th><th>Buyer</th><th>Date</th><th>Status</th><th>Amount</th></tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map(o => (
                  <tr key={o.id}>
                    <td><code>{o.id}</code></td>
                    <td>{o.product}</td>
                    <td>{o.buyer}</td>
                    <td>{o.date}</td>
                    <td><span className={`badge ${STATUS_COLOR[o.status]}`}>{o.status}</span></td>
                    <td><strong>₹{o.amount.toLocaleString()}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Actions + Top Products */}
          <div className="dash-right">
            <div className="card quick-actions">
              <h3>Quick Actions</h3>
              <div className="qa-grid">
                {[
                  { icon: '📦', label: 'Add Product', to: '/seller/add-product' },
                  { icon: '📋', label: 'My Products', to: '/seller/products' },
                  { icon: '🛒', label: 'Orders', to: '/seller/orders' },
                  { icon: '💰', label: 'Payments', to: '/seller/payments' },
                  { icon: '📊', label: 'Analytics', to: '/seller/analytics' },
                  { icon: '⚙️', label: 'Settings', to: '/seller/settings' },
                ].map(a => (
                  <Link key={a.label} to={a.to} className="qa-btn">
                    <span>{a.icon}</span>
                    <span>{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="card inventory-alert">
              <h3> Low Inventory</h3>
              {myProducts.filter(p => p.stock < 20).slice(0, 3).map(p => (
                <div key={p.id} className="inv-item">
                  <span className="inv-name">{p.name}</span>
                  <span className={`badge ${p.stock < 10 ? 'badge-red' : 'badge-yellow'}`}>{p.stock} left</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Products preview */}
        <div className="card products-preview">
          <div className="section-hd-small">
            <h3>My Products</h3>
            <Link to="/seller/products" className="view-all-sm">Manage All</Link>
          </div>
          <div className="products-table-wrap">
            <table className="mini-table">
              <thead>
                <tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {myProducts.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div className="prod-thumb-row">
                        <img src={p.img} alt={p.name} />
                        <span>{p.name}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-gray">{p.category}</span></td>
                    <td>₹{p.price.toLocaleString()}</td>
                    <td><span className={`badge ${p.stock > 20 ? 'badge-green' : p.stock > 10 ? 'badge-yellow' : 'badge-red'}`}>{p.stock}</span></td>
                    <td> {p.rating}</td>
                    <td>
                      <div style={{display:'flex',gap:6}}>
                        <Link to={`/seller/edit-product/${p.id}`} className="btn btn-ghost btn-sm">Edit</Link>
                        <Link to={`/product/${p.id}`} className="btn btn-ghost btn-sm">View</Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}