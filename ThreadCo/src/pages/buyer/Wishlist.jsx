import React from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import ProductCard from '../../component/common/ProductCard'
import { PRODUCTS } from '../../data/products'
import './Wishlist.css'

export default function Wishlist() {
  const { wishlist } = useApp()
  const items = PRODUCTS.filter(p => wishlist.includes(p.id))

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="page-header">
          <h1>
            <Heart size={22} style={{ verticalAlign: 'middle', marginRight: 8 }} />
            My Wishlist ({items.length})
          </h1>
        </div>
        {items.length === 0 ? (
          <div className="empty-wish">
            <Heart size={48} strokeWidth={1.2} />
            <h3>Your wishlist is empty</h3>
            <p>Save items you love and buy them later.</p>
            <Link to="/shop" className="btn btn-primary">Explore Products</Link>
          </div>
        ) : (
          <div className="grid-4">
            {items.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}