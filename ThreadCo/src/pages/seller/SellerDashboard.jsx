import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { PRODUCTS } from '../../data/products'
import {
  Package,
  ShoppingCart,
  DollarSign,
  Star,
  Plus,
  AlertTriangle,
  BarChart2,
  Settings,
  CreditCard,
  ClipboardList,
} from 'lucide-react'
import './SellerDashboard.css'

const STATS = [
  { label: 'Total Products', value: '12', Icon: Package, color: '#dbeafe', borderColor: '#3b82f6', trend: '+2 this month' },
  { label: 'Total Orders', value: '248', Icon: ShoppingCart, color: '#d1fae5', borderColor: '#10b981', trend: '+18 this week' },
  { label: 'Revenue (₹)', value: '1,24,500', Icon: DollarSign, color: '#fef3c7', borderColor: '#f59e0b', trend: '+12% vs last month' },
  { label: 'Avg. Rating', value: '4.6', Icon: Star, color: '#fee2e2', borderColor: '#ef4444', trend: 'From 312 reviews' },
]

const RECENT_ORDERS = [
  { id: 'TC10001', product: 'Oxford Button-Down Shirt', buyer: 'Rahul M.', date: '2025-01-28', status: 'Processing', amount: 1299 },
  { id: 'TC10002', product: 'Polo T-Shirt × 2', buyer: 'Priya K.', date: '2025-01-27', status: 'Shipped', amount: 1398 },
  { id: 'TC10003', product: 'Slim Fit Chinos', buyer: 'Arjun S.', date: '2025-01-26', status: 'Delivered', amount: 1599 },
  { id: 'TC10004', product: 'Denim Jacket', buyer: 'Meena R.', date: '2025-01-25', status: 'Delivered', amount: 2199 },
  { id: 'TC10005', product: 'Graphic Hoodie', buyer: 'Suresh V.', date: '2025-01-24', status: 'Cancelled', amount: 1099 },
]

const STATUS_COLOR = {
  'Processing': 'badge-yellow',
  'Shipped': 'badge-blue',
  'Delivered': 'badge-green',
  'Cancelled': 'badge-red',
}

const QUICK_ACTIONS = [
  { Icon: Package, label: 'Add Product', to: '/seller/add-product' },
  { Icon: ClipboardList, label: 'My Products', to: '/seller/products' },
  { Icon: ShoppingCart, label: 'Orders', to: '/seller/orders' },
  { Icon: CreditCard, label: 'Payments', to: '/seller/payments' },
  { Icon: BarChart2, label: 'Analytics', to: '/seller/analytics' },
  { Icon: Settings, label: 'Settings', to: '/seller/settings' },
]

export default function SellerDashboard() {
  const { user } = useApp()
  const myProducts = PRODUCTS.slice(0, 6)

  return (
    <div className="seller-dash">
      <div className="seller-header">
        <div className="container">
          <div className="seller-welcome">
            <div>
              <h1>Welcome back, {user?.name || 'Seller'}!</h1>
              <p>Here's what's happening with your store today.</p>
            </div>
            <Link to="/seller/add-product" className="btn btn-accent btn-lg">
              <Plus size={16} style={{ marginRight: 6 }} />
              Add New Product
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Stats */}
        <div className="stats-grid">
          {STATS.map(({ label, value, Icon, color, borderColor, trend }) => (
            <div
              key={label}
              className="stat-card card"
              style={{ borderTop: `3px solid ${borderColor}` }}
            >
              <div className="stat-top">
                <span className="stat-icon" style={{ background: color }}>
                  <Icon size={20} strokeWidth={1.8} color={borderColor} />
                </span>
                <span className="stat-val">{value}</span>
              </div>
              <div className="stat-label">{label}</div>
              <div className="stat-trend">{trend}</div>
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
                <tr>
                  <th>Order ID</th><th>Product</th><th>Buyer</th>
                  <th>Date</th><th>Status</th><th>Amount</th>
                </tr>
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

          {/* Quick Actions + Low Inventory */}
          <div className="dash-right">
            <div className="card quick-actions">
              <h3>Quick Actions</h3>
              <div className="qa-grid">
                {QUICK_ACTIONS.map(({ Icon, label, to }) => (
                  <Link key={label} to={to} className="qa-btn">
                    <Icon size={20} strokeWidth={1.6} />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="card inventory-alert">
              <h3>
                <AlertTriangle size={16} style={{ marginRight: 6, color: '#f59e0b', verticalAlign: 'middle' }} />
                Low Inventory
              </h3>
              {myProducts.filter(p => p.stock < 20).slice(0, 3).map(p => (
                <div key={p.id} className="inv-item">
                  <span className="inv-name">{p.name}</span>
                  <span className={`badge ${p.stock < 10 ? 'badge-red' : 'badge-yellow'}`}>
                    {p.stock} left
                  </span>
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
                <tr>
                  <th>Product</th><th>Category</th><th>Price</th>
                  <th>Stock</th><th>Rating</th><th>Actions</th>
                </tr>
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
                    <td>
                      <span className={`badge ${p.stock > 20 ? 'badge-green' : p.stock > 10 ? 'badge-yellow' : 'badge-red'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td>
                      <Star size={13} style={{ verticalAlign: 'middle', marginRight: 3, color: '#f59e0b' }} />
                      {p.rating}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
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