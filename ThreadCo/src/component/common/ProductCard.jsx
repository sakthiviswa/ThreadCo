import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist, addToCart } = useApp()
  const liked = wishlist.includes(product.id)
  const disc = Math.round((1 - product.price / product.mrp) * 100)

  return (
    <div className="pcard card">
      <div className="pcard-img-wrap">
        <Link to={`/product/${product.id}`}>
          <img src={product.img} alt={product.name} loading="lazy" />
        </Link>
        <button
          className={`wish-btn ${liked ? 'liked' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          title={liked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
        </button>
        {disc >= 10 && <span className="disc-badge">{disc}% OFF</span>}
      </div>

      <div className="pcard-body">
        <span className="pcard-seller">{product.seller}</span>
        <Link to={`/product/${product.id}`} className="pcard-name">{product.name}</Link>

        <div className="pcard-rating">
          <span className="stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                stroke="currentColor"
              />
            ))}
          </span>
          <span className="rating-val">{product.rating}</span>
          <span className="review-cnt">({product.reviews})</span>
        </div>

        <div className="pcard-price">
          <span className="price">₹{product.price.toLocaleString()}</span>
          <span className="mrp">₹{product.mrp.toLocaleString()}</span>
        </div>

        <button
          className="btn btn-primary btn-sm btn-full pcard-cta"
          onClick={() => addToCart(product, product.sizes[0])}
        >
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  )
}