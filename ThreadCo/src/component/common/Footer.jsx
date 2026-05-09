import React from 'react'
import { Link } from 'react-router-dom'
import {
  Scissors,
  GitBranch,
  Camera,
  ThumbsUp,
  MessageCircle,
  Play,
  CreditCard,
  Smartphone,
  Landmark,
  Wallet,
  PackageCheck,
  HelpCircle,
  MapPin,
  RotateCcw,
  Ruler,
  Phone,
  Store,
  LayoutDashboard,
  BookOpen,
  DollarSign,
  Info,
  Briefcase,
  Newspaper,
  Shield,
  FileText,
} from 'lucide-react'
import './Footer.css'

const PAYMENT_METHODS = [
  { icon: <CreditCard size={18} />, label: 'Visa' },
  { icon: <CreditCard size={18} />, label: 'Mastercard' },
  { icon: <Smartphone size={18} />, label: 'UPI' },
  { icon: <Landmark size={18} />, label: 'Net Banking' },
  { icon: <Wallet size={18} />, label: 'COD' },
]

const SOCIAL_LINKS = [
  { icon: <GitBranch size={18} />, label: 'GitHub' },
  { icon: <Camera size={18} />, label: 'Instagram' },
  { icon: <ThumbsUp size={18} />, label: 'Facebook' },
  { icon: <Play size={18} />, label: 'YouTube' },
  { icon: <MessageCircle size={18} />, label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">

        {/* Brand col */}
        <div className="footer-col footer-col--brand">
          <div className="footer-logo">
            <Scissors size={20} className="footer-logo-icon" />
            Thread<strong>Co</strong>
          </div>
          <p>Your one-stop destination for all types of clothing. Quality fashion for everyone.</p>
          
        </div>

        {/* Shop */}
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            {["Men's", "Women's", "Kids", "Ethnic", "Sports", "Winter Wear", "Formal", "Sale"].map(c => (
              <li key={c}>
                <Link to={`/shop?category=${c.toLowerCase().replace("'s", '').replace(' ', '')}`}>
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-col">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/track">Track Order</Link></li>
            <li><Link to="/returns">Returns &amp; Exchange</Link></li>
            <li><Link to="/size-guide">Size Guide</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Sell */}
        <div className="footer-col">
          <h4>Sell on ThreadCo</h4>
          <ul>
            <li><Link to="/seller/register">Start Selling</Link></li>
            <li><Link to="/seller">Seller Dashboard</Link></li>
            <li><Link to="/seller-help">Seller Help</Link></li>
            <li><Link to="/fees">Fees &amp; Payments</Link></li>
          </ul>
        </div>

        {/* About */}
        <div className="footer-col">
          <h4>About</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">areers</Link></li>
            <li><Link to="/press">Press</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Use</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© 2026 ThreadCo. All rights reserved.</span>
          <div className="payment-icons">
            {PAYMENT_METHODS.map(({ icon, label }) => (
              <span key={label} className="payment-chip">
                
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}