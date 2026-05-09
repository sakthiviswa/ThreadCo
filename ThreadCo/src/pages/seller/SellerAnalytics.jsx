import React from 'react'
import './SellerAnalytics.css'

const MONTHLY = [
  { month: 'Aug', sales: 8200, orders: 64 },
  { month: 'Sep', sales: 11400, orders: 89 },
  { month: 'Oct', sales: 9800, orders: 76 },
  { month: 'Nov', sales: 18600, orders: 142 },
  { month: 'Dec', sales: 24500, orders: 198 },
  { month: 'Jan', sales: 16200, orders: 124 },
]

const TOP_PRODUCTS = [
  { name: 'Floral Wrap Dress', revenue: 32400, orders: 18, rating: 4.8 },
  { name: 'Oxford Button-Down Shirt', revenue: 28600, orders: 22, rating: 4.3 },
  { name: 'Slim Fit Chinos', revenue: 22400, orders: 14, rating: 4.5 },
  { name: 'Polo T-Shirt', revenue: 18200, orders: 26, rating: 4.1 },
  { name: 'Graphic Hoodie', revenue: 14300, orders: 13, rating: 4.2 },
]

const maxSales = Math.max(...MONTHLY.map(m => m.sales))

export default function SellerAnalytics() {
  return (
    <div className="analytics-page">
      <div className="container">
        <div className="page-header">
          <h1>Analytics</h1>
          <p>Track your store's performance</p>
        </div>

        {/* KPI Row */}
        <div className="kpi-grid">
          {[
            { label: 'Total Revenue', value: '₹1,24,500', change: '+12%', up: true },
            { label: 'Total Orders', value: '693', change: '+8%', up: true },
            { label: 'Avg Order Value', value: '₹1,796', change: '+4%', up: true },
            { label: 'Return Rate', value: '2.3%', change: '-0.5%', up: false },
            { label: 'Conversion Rate', value: '3.8%', change: '+0.2%', up: true },
            { label: 'Avg Rating', value: '4.6 ', change: '+0.1', up: true },
          ].map(k => (
            <div key={k.label} className="kpi-card card">
              <div className="kpi-label">{k.label}</div>
              <div className="kpi-value">{k.value}</div>
              <div className={`kpi-change ${k.up ? 'up' : 'down'}`}>{k.up ? '▲' : '▼'} {k.change} vs last month</div>
            </div>
          ))}
        </div>

        <div className="analytics-grid">
          {/* Bar Chart */}
          <div className="card analytics-chart">
            <div className="section-hd-small">
              <h3>Monthly Revenue (₹)</h3>
              <select style={{fontSize:13,border:'1px solid var(--border)',borderRadius:5,padding:'4px 8px'}}>
                <option>Last 6 months</option>
                <option>Last 12 months</option>
              </select>
            </div>
            <div className="bar-chart">
              {MONTHLY.map(m => (
                <div key={m.month} className="bar-col">
                  <div className="bar-val">₹{(m.sales/1000).toFixed(1)}k</div>
                  <div className="bar-wrap">
                    <div className="bar-fill" style={{height: `${(m.sales / maxSales) * 100}%`}} />
                  </div>
                  <div className="bar-label">{m.month}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Orders line */}
          <div className="card analytics-chart">
            <div className="section-hd-small">
              <h3>Orders per Month</h3>
            </div>
            <div className="bar-chart">
              {MONTHLY.map(m => (
                <div key={m.month} className="bar-col">
                  <div className="bar-val">{m.orders}</div>
                  <div className="bar-wrap">
                    <div className="bar-fill orders-bar" style={{height: `${(m.orders / Math.max(...MONTHLY.map(x => x.orders))) * 100}%`}} />
                  </div>
                  <div className="bar-label">{m.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="card" style={{padding:22, marginTop:20}}>
          <div className="section-hd-small">
            <h3>Top Performing Products</h3>
          </div>
          <table className="sp-table">
            <thead>
              <tr><th>#</th><th>Product</th><th>Revenue</th><th>Orders</th><th>Rating</th><th>Revenue Share</th></tr>
            </thead>
            <tbody>
              {TOP_PRODUCTS.map((p, i) => {
                const total = TOP_PRODUCTS.reduce((s, x) => s + x.revenue, 0)
                const share = Math.round((p.revenue / total) * 100)
                return (
                  <tr key={p.name}>
                    <td><strong style={{color:'var(--mid)'}}>{i + 1}</strong></td>
                    <td><strong>{p.name}</strong></td>
                    <td><strong>₹{p.revenue.toLocaleString()}</strong></td>
                    <td>{p.orders}</td>
                    <td>⭐ {p.rating}</td>
                    <td>
                      <div className="share-bar-wrap">
                        <div className="share-bar-fill" style={{width:`${share}%`}} />
                        <span>{share}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Category breakdown */}
        <div className="card" style={{padding:22, marginTop:20}}>
          <h3 style={{fontFamily:'var(--font-head)',fontSize:17,marginBottom:16}}>Sales by Category</h3>
          <div className="cat-breakdown">
            {[
              {cat:'Men\'s Wear', pct:32, color:'#3b82f6'},
              {cat:'Women\'s Wear', pct:28, color:'#ec4899'},
              {cat:'Ethnic Wear', pct:18, color:'#f59e0b'},
              {cat:'Sports', pct:12, color:'#10b981'},
              {cat:'Kids', pct:6, color:'#8b5cf6'},
              {cat:'Winter Wear', pct:4, color:'#6b7280'},
            ].map(c => (
              <div key={c.cat} className="cat-row">
                <span className="cat-row-name">{c.cat}</span>
                <div className="cat-row-bar">
                  <div style={{width:`${c.pct}%`, background:c.color, height:'100%', borderRadius:4, transition:'width .4s'}} />
                </div>
                <span className="cat-row-pct">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}