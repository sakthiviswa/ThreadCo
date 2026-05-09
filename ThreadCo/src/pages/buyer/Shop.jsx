import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../../component/common/ProductCard'
import { PRODUCTS, CATEGORIES } from '../../data/products'
import './Shop.css'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortBy, setSortBy] = useState(params.get('sort') || 'popular')
  const [selectedSizes, setSelectedSizes] = useState([])

  const category = params.get('category') || ''
  const query    = params.get('q') || ''

  const filtered = useMemo(() => {
    let res = [...PRODUCTS]
    if (category) res = res.filter(p => p.category === category || p.sub === category)
    if (query)    res = res.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.seller.toLowerCase().includes(query.toLowerCase()))
    res = res.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (selectedSizes.length) res = res.filter(p => p.sizes.some(s => selectedSizes.includes(s)))
    switch (sortBy) {
      case 'price-low':  res.sort((a, b) => a.price - b.price); break
      case 'price-high': res.sort((a, b) => b.price - a.price); break
      case 'rating':     res.sort((a, b) => b.rating - a.rating); break
      case 'newest':     res.sort((a, b) => b.id - a.id); break
      default:           res.sort((a, b) => b.reviews - a.reviews)
    }
    return res
  }, [category, query, priceRange, selectedSizes, sortBy])

  const toggleSize = (s) => setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  return (
    <div className="shop-page">
      <div className="container shop-layout">
        {/* Sidebar Filters */}
        <aside className="filters">
          <div className="filter-header">
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </div>

          <div className="filter-section">
            <h3>Categories</h3>
            <ul className="filter-list">
              <li>
                <button className={!category ? 'active' : ''} onClick={() => setParams({})}>All Clothes</button>
              </li>
              {CATEGORIES.map(c => (
                <li key={c.id}>
                  <button
                    className={category === c.id ? 'active' : ''}
                    onClick={() => setParams({ category: c.id })}
                  >
                    <span className="filter-cat-icon">{c.icon}</span> {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-inputs">
              <input type="number" placeholder="Min" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} />
              <span>–</span>
              <input type="number" placeholder="Max" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} />
            </div>
            <input type="range" min="0" max="10000" step="100" value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="range-slider" />
            <div className="price-label">Up to ₹{priceRange[1].toLocaleString()}</div>
          </div>

          <div className="filter-section">
            <h3>Size</h3>
            <div className="size-grid">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'].map(s => (
                <button key={s} className={`size-btn ${selectedSizes.includes(s) ? 'active' : ''}`}
                  onClick={() => toggleSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          {(category || query || selectedSizes.length) && (
            <button className="btn btn-outline btn-sm btn-full"
              onClick={() => { setParams({}); setSelectedSizes([]) }}>
              <X size={13} /> Clear All Filters
            </button>
          )}
        </aside>

        {/* Product Grid */}
        <div className="products-area">
          <div className="shop-top">
            <div className="results-info">
              {query && <strong>Results for "{query}"</strong>}
              {!query && <strong>{category ? CATEGORIES.find(c => c.id === category)?.label || category : 'All Clothes'}</strong>}
              <span> — {filtered.length} products found</span>
            </div>
            <div className="sort-wrap">
              <label>Sort:</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="rating">Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <SlidersHorizontal size={40} strokeWidth={1.2} />
              <h3>No products found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid-4">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}