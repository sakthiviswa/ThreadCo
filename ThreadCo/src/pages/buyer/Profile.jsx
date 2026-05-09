import React, { useState } from 'react'
import { MapPin, Edit2, Trash2, CheckCircle } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import './Profile.css'

export default function Profile() {
  const { user, toast } = useApp()
  const [form, setForm] = useState({
    name:   user?.name  || '',
    email:  user?.email || '',
    phone:  '',
    dob:    '',
    gender: '',
  })
  const [addresses] = useState([
    { id: 1, label: 'Home', name: 'Rahul Kumar', address: 'Flat 12, Anand Nagar, Salem', city: 'Salem', state: 'Tamil Nadu', pincode: '636001', phone: '9876543210', isDefault: true },
  ])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="profile-page">
      <div className="container">
        <div className="page-header"><h1>My Profile</h1></div>
        <div className="profile-layout">

          {/* Sidebar */}
          <div className="profile-sidebar">
            <div className="profile-avatar-card card">
              <div className="big-avatar">{(user?.name || 'U')[0].toUpperCase()}</div>
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
              <span className="badge badge-green">
                <CheckCircle size={12} style={{ verticalAlign: 'middle', marginRight: 3 }} />
                Verified Buyer
              </span>
            </div>
            <div className="card profile-nav">
              {['Personal Info', 'Addresses', 'Orders', 'Wishlist', 'Settings'].map(item => (
                <div key={item} className="pnav-item">{item}</div>
              ))}
            </div>
          </div>

          <div className="profile-content">
            {/* Personal Info */}
            <div className="card profile-section">
              <h3>Personal Information</h3>
              <div className="divider" />
              <div className="grid-2">
                <div className="field"><label>Full Name</label><input value={form.name} onChange={e => set('name', e.target.value)} /></div>
                <div className="field"><label>Email</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} /></div>
                <div className="field"><label>Phone</label><input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="10-digit mobile" /></div>
                <div className="field"><label>Date of Birth</label><input type="date" value={form.dob} onChange={e => set('dob', e.target.value)} /></div>
              </div>
              <div className="field">
                <label>Gender</label>
                <div className="gender-opts">
                  {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(g => (
                    <label key={g} className={`gender-opt ${form.gender === g ? 'active' : ''}`}>
                      <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={() => set('gender', g)} />
                      {g}
                    </label>
                  ))}
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => toast('Profile saved!', 'success')}>Save Changes</button>
            </div>

            {/* Addresses */}
            <div className="card profile-section">
              <div className="section-hd-small">
                <h3>Saved Addresses</h3>
                <button className="btn btn-outline btn-sm">+ Add Address</button>
              </div>
              <div className="divider" />
              {addresses.map(a => (
                <div key={a.id} className="address-card">
                  <div className="addr-top">
                    <span className="badge badge-blue">
                      <MapPin size={11} style={{ verticalAlign: 'middle', marginRight: 3 }} />
                      {a.label}
                    </span>
                    {a.isDefault && <span className="badge badge-green">Default</span>}
                  </div>
                  <p className="addr-name">{a.name} | {a.phone}</p>
                  <p className="addr-detail">{a.address}, {a.city}, {a.state} – {a.pincode}</p>
                  <div className="addr-actions">
                    <button className="btn btn-ghost btn-sm"><Edit2 size={13} /> Edit</button>
                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--red)' }}><Trash2 size={13} /> Remove</button>
                    {!a.isDefault && <button className="btn btn-ghost btn-sm">Set as Default</button>}
                  </div>
                </div>
              ))}
            </div>

            {/* Account Settings */}
            <div className="card profile-section">
              <h3>Account Settings</h3>
              <div className="divider" />
              <div className="acc-setting-row">
                <div><strong>Password</strong><p className="hint">Last changed: Never</p></div>
                <button className="btn btn-outline btn-sm">Change Password</button>
              </div>
              <div className="acc-setting-row">
                <div><strong>Email Notifications</strong><p className="hint">Order updates, offers, and more</p></div>
                <button className="btn btn-outline btn-sm">Manage</button>
              </div>
              <div className="acc-setting-row danger-zone">
                <div><strong>Delete Account</strong><p className="hint">Permanently remove your account and data</p></div>
                <button className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}