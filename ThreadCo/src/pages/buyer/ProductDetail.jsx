import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Zap, Heart, Star, Truck, RotateCcw, Package } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import ProductCard from '../../component/common/ProductCard'
import { PRODUCTS, REVIEWS } from '../../data/products'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const product = PRODUCTS.find(p => p.id === +id)
  const { addToCart, toggleWishlist, wishlist, toast } = useApp()
  const [selectedSize, setSelectedSize] = useState('')
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('desc')

  if (!product) return (
    <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
      <h2>Product not found</h2>
      <Link to="/shop" className="btn btn-primary" style={{ marginTop: 16 }}>Back to Shop</Link>
    </div>
  )

  const reviews = REVIEWS.filter(r => r.productId === product.id)
  const related  = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const disc     = Math.round((1 - product.price / product.mrp) * 100)
  const liked    = wishlist.includes(product.id)

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 1) { toast('Please select a size', 'error'); return }
    addToCart(product, selectedSize || product.sizes[0], qty)
  }

  return (
    <div className="pd-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link> › <Link to="/shop">Shop</Link> › <Link to={`/shop?category=${product.category}`}>{product.category}</Link> › <span>{product.name}</span>
        </nav>

        <div className="pd-layout">
          {/* Images */}
          <div className="pd-images">
            <div className="pd-main-img">
              <img src={product.img} alt={product.name} />
              {disc >= 10 && <span className="pd-disc-badge">{disc}% OFF</span>}
            </div>
            <div className="pd-thumbs">
              {[product.img, product.img + '?1', product.img + '?2'].map((img, i) => (
                <div key={i} className="pd-thumb"><img src={img} alt="" /></div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="pd-info">
            <div className="pd-seller-tag">{product.seller}</div>
            <h1 className="pd-name">{product.name}</h1>

            <div className="pd-rating-row">
              <span className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14}
                    fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                    stroke="currentColor" />
                ))}
              </span>
              <span className="pd-rating-val">{product.rating}</span>
              <span className="pd-review-cnt">({product.reviews} reviews)</span>
              <span className="pd-stock">
                <Package size={13} style={{ verticalAlign: 'middle', marginRight: 3 }} />
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>

            <div className="pd-price-row">
              <span className="pd-price">₹{product.price.toLocaleString()}</span>
              <span className="pd-mrp">₹{product.mrp.toLocaleString()}</span>
              {disc >= 5 && <span className="pd-save">{disc}% off</span>}
            </div>
            <p className="pd-tax-note">Inclusive of all taxes. Free delivery above ₹599.</p>

            {/* Size */}
            <div className="pd-size-section">
              <div className="pd-size-hd">
                <span>Select Size</span>
                <Link to="/size-guide" className="size-guide-link">Size Guide →</Link>
              </div>
              <div className="size-options">
                {product.sizes.map(s => (
                  <button key={s} className={`size-opt ${selectedSize === s ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s)}>{s}</button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="pd-qty">
              <span>Quantity:</span>
              <div className="qty-ctrl">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="pd-actions">
              <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <Link to="/checkout" className="btn btn-accent btn-lg"
                onClick={() => addToCart(product, selectedSize || product.sizes[0], qty)}>
                <Zap size={16} /> Buy Now
              </Link>
              <button className={`wish-action-btn ${liked ? 'liked' : ''}`} onClick={() => toggleWishlist(product.id)}>
                <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
                {liked ? 'Saved' : 'Wishlist'}
              </button>
            </div>

            {/* Delivery */}
            <div className="pd-delivery card">
              <div className="delivery-row">
                <Truck size={18} className="delivery-icon" />
                <div>
                  <strong>Free Delivery</strong>
                  <p>On orders above ₹599. Standard: 3–5 days</p>
                </div>
              </div>
              <div className="delivery-row">
                <RotateCcw size={18} className="delivery-icon" />
                <div>
                  <strong>7-Day Returns</strong>
                  <p>Easy returns & exchange within 7 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="pd-tabs">
          <div className="tab-bar">
            {['desc', 'specs', 'reviews'].map(t => (
              <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                {t === 'desc' ? 'Description' : t === 'specs' ? 'Details' : `Reviews (${reviews.length})`}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {tab === 'desc' && (
              <div className="tab-desc">
                <p>{product.description}</p>
                <ul>
                  <li>Category: {product.category}</li>
                  <li>Color: {product.color}</li>
                  <li>Available Sizes: {product.sizes.join(', ')}</li>
                  <li>Sold by: {product.seller}</li>
                </ul>
              </div>
            )}

            {tab === 'specs' && (
              <table className="specs-table">
                <tbody>
                  {[
                    ['Product Name', product.name],
                    ['Category', product.category],
                    ['Sub Category', product.sub],
                    ['Color', product.color],
                    ['Available Sizes', product.sizes.join(', ')],
                    ['Seller', product.seller],
                    ['Stock', product.stock],
                  ].map(([k, v]) => (
                    <tr key={k}><th>{k}</th><td>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            )}

            {tab === 'reviews' && (
              <div className="reviews-section">
                <div className="review-summary">
                  <div className="big-rating">{product.rating}</div>
                  <div>
                    <div className="stars big-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={18}
                          fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                          stroke="currentColor" />
                      ))}
                    </div>
                    <div className="review-total">{product.reviews} ratings</div>
                  </div>
                </div>
                <div className="review-list">
                  {reviews.length === 0 && <p style={{ color: 'var(--mid)' }}>No written reviews yet.</p>}
                  {reviews.map(r => (
                    <div key={r.id} className="review-item">
                      <div className="review-top">
                        <strong>{r.user}</strong>
                        <span className="stars">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} size={12} fill="currentColor" stroke="currentColor" />
                          ))}
                        </span>
                        <span className="review-date">{r.date}</span>
                      </div>
                      <p>{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="pd-related">
            <h2 className="section-title" style={{ marginBottom: 20 }}>You May Also Like</h2>
            <div className="grid-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}