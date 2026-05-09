import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Check, BadgeCheck, Users, Clock, Headphones, RefreshCw, BarChart2 } from 'lucide-react'
import './SellerRegister.css'

const STEPS = ['Basic Info', 'Business Details', 'Bank Account', 'Done!']

const PERKS = [
  { Icon: BadgeCheck, label: 'Zero listing fees' },
  { Icon: Users, label: 'Reach crores of buyers' },
  { Icon: Clock, label: 'Payments in 7 days' },
  { Icon: Headphones, label: 'Free seller support' },
  { Icon: RefreshCw, label: 'Easy returns management' },
  { Icon: BarChart2, label: 'Powerful analytics dashboard' },
]

export default function SellerRegister() {
  const { login, toast } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '',
    storeName: '', gst: '', category: '', address: '', city: '', state: '', pincode: '',
    acNo: '', ifsc: '', acName: '', bank: '',
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const next = () => {
    if (step < 3) setStep(s => s + 1)
    if (step === 2) {
      login({ name: form.name || 'Seller', email: form.email, role: 'seller' })
      toast('Welcome to ThreadCo! Your seller account is active.', 'success')
    }
  }

  return (
    <div className="sr-page">
      <div className="container sr-inner">
        <div className="sr-left">
          <div className="sr-brand">🧵 ThreadCo</div>
          <h1>Start Selling on ThreadCo</h1>
          <p>Join over 5,000 sellers reaching millions of buyers across India.</p>
          <ul className="sr-perks">
            {PERKS.map(({ Icon, label }) => (
              <li key={label}>
                <Icon size={16} strokeWidth={1.8} style={{ marginRight: 8, flexShrink: 0 }} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="sr-form card">
          {/* Progress */}
          <div className="sr-steps">
            {STEPS.map((s, i) => (
              <div key={s} className={`sr-step ${i <= step ? 'active' : ''}`}>
                <div className="sr-step-dot">
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span>{s}</span>
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="sr-step-content">
              <h2>Your Details</h2>
              <div className="field"><label>Full Name *</label><input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" /></div>
              <div className="field"><label>Email Address *</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" /></div>
              <div className="field"><label>Mobile Number *</label><input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="10-digit mobile" /></div>
              <div className="field"><label>Create Password *</label><input type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 8 characters" /></div>
            </div>
          )}

          {step === 1 && (
            <div className="sr-step-content">
              <h2>Business Details</h2>
              <div className="field"><label>Store / Brand Name *</label><input value={form.storeName} onChange={e => set('storeName', e.target.value)} placeholder="e.g. KartikFashions" /></div>
              <div className="field"><label>GST Number (optional)</label><input value={form.gst} onChange={e => set('gst', e.target.value)} placeholder="29ABCDE1234F1Z5" /></div>
              <div className="field">
                <label>Primary Category</label>
                <select value={form.category} onChange={e => set('category', e.target.value)}>
                  <option value="">Select main category</option>
                  {["Men's Wear", "Women's Wear", "Kids", "Ethnic Wear", "Sports", "Winter Wear", "Formal Wear", "Casual Wear"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="field"><label>Business Address</label><input value={form.address} onChange={e => set('address', e.target.value)} placeholder="Street address" /></div>
              <div className="grid-3">
                <div className="field"><label>City</label><input value={form.city} onChange={e => set('city', e.target.value)} /></div>
                <div className="field"><label>State</label><input value={form.state} onChange={e => set('state', e.target.value)} /></div>
                <div className="field"><label>Pincode</label><input value={form.pincode} onChange={e => set('pincode', e.target.value)} /></div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="sr-step-content">
              <h2>Bank Account</h2>
              <p className="sr-hint">This is where we'll transfer your earnings.</p>
              <div className="field">
                <label>Bank Name</label>
                <select value={form.bank} onChange={e => set('bank', e.target.value)}>
                  <option value="">Select bank</option>
                  {['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'PNB', 'Canara Bank', 'Bank of Baroda'].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div className="field"><label>Account Number *</label><input value={form.acNo} onChange={e => set('acNo', e.target.value)} placeholder="Enter account number" /></div>
              <div className="field"><label>IFSC Code *</label><input value={form.ifsc} onChange={e => set('ifsc', e.target.value)} placeholder="e.g. HDFC0001234" /></div>
              <div className="field"><label>Account Holder Name *</label><input value={form.acName} onChange={e => set('acName', e.target.value)} placeholder="As per bank records" /></div>
            </div>
          )}

          {step === 3 && (
            <div className="sr-success">
              <div className="sr-success-icon">
                <BadgeCheck size={56} color="#10b981" strokeWidth={1.5} />
              </div>
              <h2>You're All Set!</h2>
              <p>Your seller account has been created. Start listing your products and reach millions of buyers.</p>
              <button className="btn btn-accent btn-lg" onClick={() => navigate('/seller')}>
                Go to Seller Dashboard →
              </button>
            </div>
          )}

          {step < 3 && (
            <div className="sr-nav">
              {step > 0 && <button className="btn btn-outline" onClick={() => setStep(s => s - 1)}>← Back</button>}
              <button className="btn btn-primary btn-lg" style={{ marginLeft: 'auto' }} onClick={next}>
                {step === 2 ? 'Create Account →' : 'Continue →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}