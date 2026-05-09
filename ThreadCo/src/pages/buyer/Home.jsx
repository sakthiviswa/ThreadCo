import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Truck, RotateCcw, ShieldCheck, Gift, TrendingUp, Sparkles } from 'lucide-react'
import ProductCard from '../../component/common/ProductCard'
import { PRODUCTS, CATEGORIES, BANNERS } from '../../data/products'
import './Home.css'

const PROMO_ITEMS = [
  { icon: <Truck size={24} />,       title: 'Free Delivery',   sub: 'On orders above ₹599' },
  { icon: <RotateCcw size={24} />,   title: 'Easy Returns',    sub: '7-day hassle-free returns' },
  { icon: <ShieldCheck size={24} />, title: 'Secure Payment',  sub: '100% safe & encrypted' },
  { icon: <Gift size={24} />,        title: 'Gift Wrapping',   sub: 'Available on request' },
]

export default function Home() {
  const [bannerIdx, setBannerIdx] = useState(0)
  const featured   = PRODUCTS.filter((_, i) => i < 8)
  const trending   = PRODUCTS.filter(p => p.rating >= 4.5).slice(0, 4)
  const newArrivals = PRODUCTS.slice(-6)

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i + 1) % BANNERS.length), 4000)
    return () => clearInterval(t)
  }, [])

  const b = BANNERS[bannerIdx]

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero" style={{ background: b.bg }}>
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="hero-tag">New Collection</span>
            <h1>{b.title}</h1>
            <p>{b.sub}</p>
            <Link to={b.link} className="btn btn-accent btn-lg">{b.cta} →</Link>
          </div>
          <div className="hero-img-grid">
            {PRODUCTS.slice(bannerIdx * 2, bannerIdx * 2 + 4).map(p => (
              <div key={p.id} className="hero-thumb">
                <img src={p.img} alt={p.name} />
              </div>
            ))}
          </div>
        </div>
        <div className="banner-dots">
          {BANNERS.map((_, i) => (
            <button key={i} className={`dot ${i === bannerIdx ? 'active' : ''}`} onClick={() => setBannerIdx(i)} />
          ))}
        </div>
      </section>

      {/* Category Pills */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="cat-grid">
            {CATEGORIES.map(c => (
              <Link key={c.id} to={`/shop?category=${c.id}`} className="cat-card card">
                <span className="cat-emoji">{c.icon}</span>
                <span>{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section">
        <div className="container">
          <div className="section-hd">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/shop" className="view-all">View All →</Link>
          </div>
          <div className="grid-4">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Promo strip */}
      <section className="promo-strip">
        <div className="container promo-inner">
          {PROMO_ITEMS.map(f => (
            <div key={f.title} className="promo-item">
              <span className="promo-icon">{f.icon}</span>
              <div>
                <strong>{f.title}</strong>
                <span>{f.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="section">
        <div className="container">
          <div className="section-hd">
            <h2 className="section-title">
              <TrendingUp size={20} style={{ verticalAlign: 'middle', marginRight: 6 }} />
              Trending Now
            </h2>
            <Link to="/shop?sort=rating" className="view-all">See All →</Link>
          </div>
          <div className="grid-4">
            {trending.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Sell Banner */}
      <section className="sell-banner">
        <div className="container sell-inner">
          <div>
            <h2>Start Selling on ThreadCo</h2>
            <p>Join 5,000+ sellers. List your products for free and reach millions of buyers across India.</p>
          </div>
          <Link to="/seller/register" className="btn btn-accent btn-lg">Become a Seller →</Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section">
        <div className="container">
          <div className="section-hd">
            <h2 className="section-title">
              <Sparkles size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} />
              New Arrivals
            </h2>
            <Link to="/shop?sort=newest" className="view-all">View All →</Link>
          </div>
          <div className="grid-3">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </div>
  )
}