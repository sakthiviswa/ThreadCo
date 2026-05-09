import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import {
  Search,
  Heart,
  ShoppingCart,
  LayoutDashboard,
  ShoppingBag,
  LogOut,
  User,
  Package,
  Store,
  Scissors,
} from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
  const { user, logout, cartCount, wishlist } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) navigate(`/shop?q=${encodeURIComponent(search.trim())}`)
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <Link to="/" className="logo">
          {/* Keep the thread/needle icon — lucide has Scissors or Shirt as closest match */}
          <Scissors className="logo-icon" size={20} />
          <span className="logo-text">Thread<strong>Co</strong></span>
        </Link>

        {/* Search */}
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search clothes, brands, categories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit">
            <Search size={18} />
          </button>
        </form>

        {/* Actions */}
        <div className="nav-actions">
          {user?.role === 'seller' ? (
            <Link to="/seller" className="btn btn-outline btn-sm">
              <LayoutDashboard size={15} style={{ marginRight: 5, verticalAlign: 'middle' }} />
              Seller Dashboard
            </Link>
          ) : (
            <Link to="/shop" className="nav-link">
              <ShoppingBag size={18} style={{ marginRight: 4, verticalAlign: 'middle' }} />
              Shop
            </Link>
          )}

          <Link to="/wishlist" className="nav-icon-btn" title="Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && <span className="badge-dot">{wishlist.length}</span>}
          </Link>

          <Link to="/cart" className="nav-icon-btn" title="Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="badge-dot">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="user-menu-wrap">
              <button className="user-avatar" onClick={() => setMenuOpen(o => !o)}>
                {user.name[0].toUpperCase()}
              </button>
              {menuOpen && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                  <div className="divider" />
                  {user.role === 'buyer' && (
                    <>
                      <Link to="/orders" onClick={() => setMenuOpen(false)}>
                        <Package size={15} />
                        My Orders
                      </Link>
                      <Link to="/profile" onClick={() => setMenuOpen(false)}>
                        <User size={15} />
                        Profile
                      </Link>
                    </>
                  )}
                  {user.role === 'seller' && (
                    <Link to="/seller" onClick={() => setMenuOpen(false)}>
                      <LayoutDashboard size={15} />
                      Dashboard
                    </Link>
                  )}
                  <button className="logout-btn" onClick={() => { logout(); setMenuOpen(false) }}>
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">Sign In</Link>
          )}
        </div>
      </div>

      {/* Category bar */}
      <div className="cat-bar">
        <div className="container cat-bar-inner">
          {['Men', 'Women', 'Kids', 'Ethnic', 'Sports', 'Winter', 'Formal', 'Casual'].map(c => (
            <Link key={c} to={`/shop?category=${c.toLowerCase()}`} className="cat-link">{c}</Link>
          ))}
          <Link to="/seller/register" className="cat-link sell-link">
            <Store size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
            Sell on ThreadCo
          </Link>
        </div>
      </div>
    </nav>
  )
}