import React, { useState } from 'react'
import './SellerPayments.css'

const PAYOUTS = [
  { id: 'PO-2025-001', period: '01–15 Jan 2025', orders: 42, revenue: 68400, platformFee: 3420, settled: 64980, status: 'Paid', paidOn: '2025-01-20' },
  { id: 'PO-2024-024', period: '16–31 Dec 2024', orders: 58, revenue: 92100, platformFee: 4605, settled: 87495, status: 'Paid', paidOn: '2025-01-05' },
  { id: 'PO-2024-023', period: '01–15 Dec 2024', orders: 71, revenue: 114200, platformFee: 5710, settled: 108490, status: 'Paid', paidOn: '2024-12-20' },
  { id: 'PO-2025-002', period: '16–31 Jan 2025', orders: 28, revenue: 44200, platformFee: 2210, settled: 41990, status: 'Processing', paidOn: '—' },
]

export default function SellerPayments() {
  const [bankForm, setBankForm] = useState({ acNo: '', ifsc: '', acName: '', bank: '' })
  const set = (k, v) => setBankForm(f => ({ ...f, [k]: v }))

  return (
    <div className="payments-page">
      <div className="container">
        <div className="page-header">
          <h1>Payments</h1>
          <p>Track your earnings and settlement history</p>
        </div>

        <div className="payments-layout">
          <div className="payments-main">
            {/* Wallet summary */}
            <div className="wallet-card">
              <div className="wallet-item">
                <span className="wallet-label">Available Balance</span>
                <span className="wallet-val big">₹41,990</span>
                <button className="btn btn-accent">Withdraw</button>
              </div>
              <div className="wallet-divider" />
              <div className="wallet-item">
                <span className="wallet-label">Processing</span>
                <span className="wallet-val">₹2,210</span>
              </div>
              <div className="wallet-divider" />
              <div className="wallet-item">
                <span className="wallet-label">Total Earned</span>
                <span className="wallet-val">₹2,60,965</span>
              </div>
            </div>

            {/* Payout history */}
            <div className="card">
              <div className="section-hd-small" style={{padding:'18px 20px 0'}}>
                <h3>Payout History</h3>
              </div>
              <table className="sp-table">
                <thead>
                  <tr>
                    <th>Payout ID</th>
                    <th>Period</th>
                    <th>Orders</th>
                    <th>Gross Revenue</th>
                    <th>Platform Fee (5%)</th>
                    <th>Net Settled</th>
                    <th>Status</th>
                    <th>Paid On</th>
                  </tr>
                </thead>
                <tbody>
                  {PAYOUTS.map(p => (
                    <tr key={p.id}>
                      <td><code style={{fontSize:12,background:'var(--cream)',padding:'2px 6px',borderRadius:3}}>{p.id}</code></td>
                      <td style={{fontSize:13}}>{p.period}</td>
                      <td>{p.orders}</td>
                      <td>₹{p.revenue.toLocaleString()}</td>
                      <td style={{color:'var(--red)'}}>-₹{p.platformFee.toLocaleString()}</td>
                      <td><strong>₹{p.settled.toLocaleString()}</strong></td>
                      <td>
                        <span className={`badge ${p.status === 'Paid' ? 'badge-green' : 'badge-yellow'}`}>{p.status}</span>
                      </td>
                      <td style={{fontSize:13,color:'var(--mid)'}}>{p.paidOn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="payments-sidebar">
            {/* Bank Account */}
            <div className="card" style={{padding:22}}>
              <h3 style={{fontFamily:'var(--font-head)',fontSize:17,marginBottom:16}}>🏦 Bank Account</h3>
              <div className="linked-bank">
                
                <div>
                  <strong>HDFC Bank – ****4821</strong>
                  <p>Rahul Kumar | IFSC: HDFC0001234</p>
                </div>
              </div>
              <div className="divider" />
              <p style={{fontSize:13,color:'var(--mid)',marginBottom:12}}>Update your bank details:</p>
              <div className="field"><label>Account Number</label><input value={bankForm.acNo} onChange={e => set('acNo', e.target.value)} placeholder="Enter account number" /></div>
              <div className="field"><label>IFSC Code</label><input value={bankForm.ifsc} onChange={e => set('ifsc', e.target.value)} placeholder="e.g. HDFC0001234" /></div>
              <div className="field"><label>Account Holder Name</label><input value={bankForm.acName} onChange={e => set('acName', e.target.value)} placeholder="As per bank records" /></div>
              <button className="btn btn-outline btn-full">Update Bank Details</button>
            </div>

            {/* Fee breakdown */}
            <div className="card" style={{padding:22}}>
              <h3 style={{fontFamily:'var(--font-head)',fontSize:17,marginBottom:14}}>Fee Structure</h3>
              {[
                ['Platform Commission', '5% of order value'],
                ['Payment Gateway Fee', '1.5% + ₹3 per txn'],
                ['Shipping Label Fee', '₹0 (ThreadCo covers)'],
                ['GST on Fees', '18% on commission'],
              ].map(([k,v]) => (
                <div key={k} className="fee-row">
                  <span>{k}</span>
                  <strong>{v}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}