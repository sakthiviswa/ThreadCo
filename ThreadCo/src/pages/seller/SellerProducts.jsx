import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../../data/products'
import { useApp } from '../../context/AppContext'
import './SellerProducts.css'

export default function SellerProducts() {
  const { toast } = useApp()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = PRODUCTS
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => filter === 'all' ? true : filter === 'low' ? p.stock < 15 : filter === 'out' ? p.stock === 0 : true)

  return (
    <div className="seller-products-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>My Products</h1>
            <p>Manage your product listings</p>
          </div>
          <Link to="/seller/add-product" className="btn btn-accent">+ Add Product</Link>
        </div>

        <div className="card">
          <div className="sp-controls">
            <input
              className="sp-search"
              placeholder="🔍 Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="sp-filters">
              {[['all','All'],['low','Low Stock'],['out','Out of Stock']].map(([v,l]) => (
                <button key={v} className={`filter-pill ${filter === v ? 'active' : ''}`} onClick={() => setFilter(v)}>{l}</button>
              ))}
            </div>
          </div>

          <div className="table-responsive">
            <table className="sp-table">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>MRP</th>
                  <th>Discount</th>
                  <th>Stock</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => {
                  const disc = Math.round((1 - p.price / p.mrp) * 100)
                  return (
                    <tr key={p.id}>
                      <td><input type="checkbox" /></td>
                      <td>
                        <div className="sp-prod-cell">
                          <img src={p.img} alt={p.name} />
                          <div>
                            <p className="sp-name">{p.name}</p>
                            <p className="sp-color">{p.color}</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="badge badge-gray">{p.category}</span></td>
                      <td><strong>₹{p.price.toLocaleString()}</strong></td>
                      <td><span style={{textDecoration:'line-through',color:'var(--light)'}}>₹{p.mrp.toLocaleString()}</span></td>
                      <td><span className="badge badge-green">{disc}%</span></td>
                      <td>
                        <span className={`badge ${p.stock > 20 ? 'badge-green' : p.stock > 5 ? 'badge-yellow' : 'badge-red'}`}>
                          {p.stock}
                        </span>
                      </td>
                      <td>{p.rating} <span style={{color:'var(--light)',fontSize:12}}>({p.reviews})</span></td>
                      <td>
                        <div className="sp-actions">
                          <Link to={`/seller/edit-product/${p.id}`} className="btn btn-outline btn-sm">Edit</Link>
                          <Link to={`/product/${p.id}`} className="btn btn-ghost btn-sm">View</Link>
                          <button className="btn btn-ghost btn-sm" style={{color:'var(--red)'}} onClick={() => toast('Product deleted', 'error')}>Del</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="sp-empty">
              <p>No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}