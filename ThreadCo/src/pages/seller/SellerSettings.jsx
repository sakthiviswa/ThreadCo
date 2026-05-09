import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './SellerSettings.css'

export default function SellerSettings() {
  const { user, toast } = useApp()
  const [profile, setProfile] = useState({
    storeName: 'KartikFashions',
    ownerName: user?.name || '',
    email: user?.email || '',
    phone: '9876543210',
    gst: '29ABCDE1234F1Z5',
    address: '42, Gandhi Nagar, Bengaluru',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    bio: 'Quality fashion for everyone. We specialize in men\'s formal and casual wear.',
  })
  const [notifs, setNotifs] = useState({ newOrder: true, lowStock: true, payment: true, review: false, promo: false })
  const set = (k, v) => setProfile(p => ({ ...p, [k]: v }))
  const setN = (k) => setNotifs(n => ({ ...n, [k]: !n[k] })  )

  return (
    <div className="settings-page">
      <div className="container">
        <div className="page-header"><h1>Store Settings</h1><p>Manage your seller account</p></div>

        <div className="settings-layout">
          {/* Nav */}
          <nav className="settings-nav card">
            {['Store Profile','Notifications','Security','Shipping'].map((item, i) => (
              <a key={item} href={`#section-${i}`} className="snav-item">{item}</a>
            ))}
          </nav>

          <div className="settings-content">
            {/* Store Profile */}
            <div id="section-0" className="card settings-section">
              <h3>Store Profile</h3>
              <div className="divider" />

              <div className="store-logo-row">
                <div className="store-logo-preview">
                  <span>{profile.storeName[0]}</span>
                </div>
                <div>
                  <button className="btn btn-outline btn-sm">Upload Logo</button>
                  <p className="hint">Recommended: 200×200px PNG or JPG</p>
                </div>
              </div>

              <div className="grid-2">
                <div className="field"><label>Store Name *</label><input value={profile.storeName} onChange={e => set('storeName', e.target.value)} /></div>
                <div className="field"><label>Owner Name</label><input value={profile.ownerName} onChange={e => set('ownerName', e.target.value)} /></div>
              </div>
              <div className="grid-2">
                <div className="field"><label>Email</label><input type="email" value={profile.email} onChange={e => set('email', e.target.value)} /></div>
                <div className="field"><label>Phone</label><input value={profile.phone} onChange={e => set('phone', e.target.value)} /></div>
              </div>
              <div className="field"><label>GST Number</label><input value={profile.gst} onChange={e => set('gst', e.target.value)} placeholder="29ABCDE1234F1Z5" /></div>
              <div className="field"><label>Store Bio</label><textarea value={profile.bio} onChange={e => set('bio', e.target.value)} rows={3} /></div>
              <div className="field"><label>Address</label><input value={profile.address} onChange={e => set('address', e.target.value)} /></div>
              <div className="grid-3">
                <div className="field"><label>City</label><input value={profile.city} onChange={e => set('city', e.target.value)} /></div>
                <div className="field"><label>State</label><input value={profile.state} onChange={e => set('state', e.target.value)} /></div>
                <div className="field"><label>Pincode</label><input value={profile.pincode} onChange={e => set('pincode', e.target.value)} /></div>
              </div>
              <button className="btn btn-primary" onClick={() => toast('Profile saved!', 'success')}>Save Profile</button>
            </div>

            {/* Notifications */}
            <div id="section-1" className="card settings-section">
              <h3>Notifications</h3>
              <div className="divider" />
              <div className="notif-list">
                {[
                  ['newOrder', 'New Order Received', 'Get notified when a customer places an order'],
                  ['lowStock', 'Low Stock Alert', 'Alert when a product has fewer than 10 items'],
                  ['payment', 'Payment Settled', 'Notify when payment is transferred to your account'],
                  ['review', 'New Review Posted', 'When a buyer leaves a review on your product'],
                  ['promo', 'Promotional Updates', 'ThreadCo platform news and offers'],
                ].map(([key, title, sub]) => (
                  <div key={key} className="notif-item">
                    <div>
                      <strong>{title}</strong>
                      <p>{sub}</p>
                    </div>
                    <button className={`toggle-btn ${notifs[key] ? 'on' : ''}`} onClick={() => setN(key)}>
                      <span className="toggle-knob" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div id="section-2" className="card settings-section">
              <h3>Security</h3>
              <div className="divider" />
              <div className="grid-2">
                <div className="field"><label>Current Password</label><input type="password" placeholder="••••••••" /></div>
                <div />
                <div className="field"><label>New Password</label><input type="password" placeholder="Min 8 characters" /></div>
                <div className="field"><label>Confirm New Password</label><input type="password" placeholder="Re-enter password" /></div>
              </div>
              <button className="btn btn-primary" onClick={() => toast('Password updated!', 'success')}>Update Password</button>
              <div className="divider" />
              <div className="twofa-row">
                <div>
                  <strong>Two-Factor Authentication</strong>
                  <p className="hint">Add an extra layer of security to your account</p>
                </div>
                <button className="btn btn-outline btn-sm">Enable 2FA</button>
              </div>
            </div>

            {/* Shipping */}
            <div id="section-3" className="card settings-section">
              <h3>Shipping Preferences</h3>
              <div className="divider" />
              <div className="field">
                <label>Default Shipping Provider</label>
                <select>
                  <option>ThreadCo Logistics (Recommended)</option>
                  <option>Delhivery</option>
                  <option>BlueDart</option>
                  <option>DTDC</option>
                  <option>India Post</option>
                </select>
              </div>
              <div className="grid-2">
                <div className="field"><label>Processing Time</label>
                  <select>
                    <option>Same day</option>
                    <option>1 business day</option>
                    <option>2 business days</option>
                    <option>3-5 business days</option>
                  </select>
                </div>
                <div className="field"><label>Free Shipping Threshold (₹)</label><input type="number" defaultValue="599" /></div>
              </div>
              <button className="btn btn-primary" onClick={() => toast('Shipping settings saved!', 'success')}>Save Settings</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}