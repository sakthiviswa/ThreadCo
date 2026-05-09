import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Scissors,
  ShoppingBag,
  Store,
  Globe,
  Smartphone,
  Mail,
  Lock,
  User,
  Phone,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import './Auth.css'

export default function Login() {
  const { login, toast } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', role: 'buyer' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { toast('Please fill all fields', 'error'); return }
    login({ name: form.email.split('@')[0], email: form.email, role: form.role })
    toast('Logged in successfully!', 'success')
    navigate(form.role === 'seller' ? '/seller' : '/')
  }

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo">
          <Scissors size={22} className="auth-logo-icon" />
          Thread<strong>Co</strong>
        </div>
        <h2>Sign In</h2>
        <p className="auth-sub">Welcome back! Please sign in to continue.</p>

        <div className="role-tabs">
          {['buyer', 'seller'].map(r => (
            <button
              key={r}
              className={`role-tab ${form.role === r ? 'active' : ''}`}
              onClick={() => set('role', r)}
            >
              {r === 'buyer'
                ? <><ShoppingBag size={15} /> Buyer</>
                : <><Store size={15} /> Seller</>}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email Address</label>
            <div className="input-wrap">
              <Mail size={15} className="input-icon" />
              <input type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Password</label>
            <div className="input-wrap">
              <Lock size={15} className="input-icon" />
              <input type="password" placeholder="Your password" value={form.password} onChange={e => set('password', e.target.value)} />
            </div>
          </div>
          <div className="auth-forgot"><Link to="/forgot-password">Forgot password?</Link></div>
          <button type="submit" className="btn btn-primary btn-lg btn-full">Sign In</button>
        </form>

        <div className="auth-divider"><span>or continue with</span></div>
        <div className="social-auth">
          <button className="btn btn-outline"><Globe size={15} /> Google</button>
          <button className="btn btn-outline"><Smartphone size={15} /> OTP</button>
        </div>

        <p className="auth-switch">Don't have an account? <Link to="/register">Create one →</Link></p>
      </div>
    </div>
  )
}

export function Register() {
  const { login, toast } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'buyer', phone: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { toast('Please fill all fields', 'error'); return }
    if (form.password !== form.confirm) { toast('Passwords do not match', 'error'); return }
    login({ name: form.name, email: form.email, role: form.role })
    toast('Account created!', 'success')
    navigate(form.role === 'seller' ? '/seller' : '/')
  }

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo">
          <Scissors size={22} className="auth-logo-icon" />
          Thread<strong>Co</strong>
        </div>
        <h2>Create Account</h2>
        <p className="auth-sub">Join thousands of shoppers and sellers.</p>

        <div className="role-tabs">
          {['buyer', 'seller'].map(r => (
            <button
              key={r}
              className={`role-tab ${form.role === r ? 'active' : ''}`}
              onClick={() => set('role', r)}
            >
              {r === 'buyer'
                ? <><ShoppingBag size={15} /> I want to buy</>
                : <><Store size={15} /> I want to sell</>}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Full Name</label>
            <div className="input-wrap">
              <User size={15} className="input-icon" />
              <input placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Email</label>
            <div className="input-wrap">
              <Mail size={15} className="input-icon" />
              <input type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Phone</label>
            <div className="input-wrap">
              <Phone size={15} className="input-icon" />
              <input placeholder="10-digit mobile number" value={form.phone} onChange={e => set('phone', e.target.value)} />
            </div>
          </div>
          <div className="grid-2">
            <div className="field">
              <label>Password</label>
              <div className="input-wrap">
                <Lock size={15} className="input-icon" />
                <input type="password" placeholder="Min 8 characters" value={form.password} onChange={e => set('password', e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label>Confirm Password</label>
              <div className="input-wrap">
                <Lock size={15} className="input-icon" />
                <input type="password" placeholder="Re-enter password" value={form.confirm} onChange={e => set('confirm', e.target.value)} />
              </div>
            </div>
          </div>
          <p className="terms-note">By signing up, you agree to our <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>.</p>
          <button type="submit" className="btn btn-primary btn-lg btn-full">Create Account</button>
        </form>

        <p className="auth-switch">Already have an account? <Link to="/login">Sign in →</Link></p>
      </div>
    </div>
  )
}