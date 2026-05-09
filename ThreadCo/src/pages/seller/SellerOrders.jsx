import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './SellerOrders.css'

const ORDERS = [
  { id:'TC10001', product:'Oxford Button-Down Shirt', buyer:'Rahul M.', city:'Chennai', date:'2025-01-28', status:'Processing', amount:1299, size:'L' },
  { id:'TC10002', product:'Polo T-Shirt × 2', buyer:'Priya K.', city:'Bangalore', date:'2025-01-27', status:'Shipped', amount:1398, size:'M' },
  { id:'TC10003', product:'Slim Fit Chinos', buyer:'Arjun S.', city:'Mumbai', date:'2025-01-26', status:'Delivered', amount:1599, size:'32' },
  { id:'TC10004', product:'Denim Jacket', buyer:'Meena R.', city:'Delhi', date:'2025-01-25', status:'Delivered', amount:2199, size:'M' },
  { id:'TC10005', product:'Graphic Hoodie', buyer:'Suresh V.', city:'Hyderabad', date:'2025-01-24', status:'Cancelled', amount:1099, size:'XL' },
  { id:'TC10006', product:'Oxford Button-Down Shirt', buyer:'Kavya L.', city:'Pune', date:'2025-01-23', status:'Delivered', amount:1299, size:'S' },
  { id:'TC10007', product:'Polo T-Shirt', buyer:'Vikram N.', city:'Ahmedabad', date:'2025-01-22', status:'Processing', amount:699, size:'XXL' },
]

const STATUS_COLOR = { 'Processing': 'badge-yellow', 'Shipped': 'badge-blue', 'Delivered': 'badge-green', 'Cancelled': 'badge-red' }
const NEXT_STATUS = { 'Processing': 'Shipped', 'Shipped': 'Delivered' }

export default function SellerOrders() {
  const { toast } = useApp()
  const [orders, setOrders] = useState(ORDERS)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = orders
    .filter(o => filter === 'all' || o.status.toLowerCase() === filter)
    .filter(o => o.id.includes(search) || o.buyer.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase()))

  const updateStatus = (id, newStatus) => {
    setOrders(o => o.map(x => x.id === id ? { ...x, status: newStatus } : x))
    toast(`Order ${id} marked as ${newStatus}`, 'success')
  }

  const counts = ORDERS.reduce((acc, o) => { acc[o.status] = (acc[o.status] || 0) + 1; return acc }, {})

  return (
    <div className="seller-orders-page">
      <div className="container">
        <div className="page-header">
          <h1>Orders</h1>
          <p>Manage and fulfill your customer orders</p>
        </div>

        {/* Summary */}
        <div className="order-summary-pills">
          {[['Processing','🟡'],['Shipped','🔵'],['Delivered','🟢'],['Cancelled','🔴']].map(([s,icon]) => (
            <div key={s} className="order-pill">
              <span>{icon} {s}</span>
              <strong>{counts[s] || 0}</strong>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="sp-controls">
            <input className="sp-search" placeholder="🔍 Search by Order ID, buyer or product..." value={search} onChange={e => setSearch(e.target.value)} />
            <div className="sp-filters">
              {['all','processing','shipped','delivered','cancelled'].map(f => (
                <button key={f} className={`filter-pill ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="table-responsive">
            <table className="sp-table">
              <thead>
                <tr><th>Order ID</th><th>Product</th><th>Buyer</th><th>City</th><th>Size</th><th>Date</th><th>Amount</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id}>
                    <td><code style={{fontSize:12,background:'var(--cream)',padding:'2px 6px',borderRadius:3}}>{o.id}</code></td>
                    <td>{o.product}</td>
                    <td>{o.buyer}</td>
                    <td>{o.city}</td>
                    <td><span className="badge badge-gray">{o.size}</span></td>
                    <td style={{color:'var(--mid)',fontSize:13}}>{o.date}</td>
                    <td><strong>₹{o.amount.toLocaleString()}</strong></td>
                    <td><span className={`badge ${STATUS_COLOR[o.status]}`}>{o.status}</span></td>
                    <td>
                      {NEXT_STATUS[o.status] ? (
                        <button className="btn btn-outline btn-sm" onClick={() => updateStatus(o.id, NEXT_STATUS[o.status])}>
                          Mark {NEXT_STATUS[o.status]}
                        </button>
                      ) : (
                        <span style={{fontSize:12,color:'var(--light)'}}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="sp-empty"><p>No orders found</p></div>
          )}
        </div>
      </div>
    </div>
  )
}