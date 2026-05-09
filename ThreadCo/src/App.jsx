import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Navbar from './component/common/Navbar'
import Footer from './component/common/Footer'
import Toast from './component/common/Toast'

// Buyer Pages
import Home from './pages/buyer/Home'
import Shop from './pages/buyer/Shop'
import ProductDetail from './pages/buyer/ProductDetail'
import Cart from './pages/buyer/Cart'
import Checkout from './pages/buyer/Checkout'
import Orders from './pages/buyer/Orders'
import Wishlist from './pages/buyer/Wishlist'
import Profile from './pages/buyer/Profile'

// Auth
import Login, { Register } from './pages/auth/Auth'

// Seller Pages
import SellerDashboard from './pages/seller/SellerDashboard'
import SellerProducts from './pages/seller/SellerProducts'
import SellerOrders from './pages/seller/SellerOrders'
import SellerAnalytics from './pages/seller/SellerAnalytics'
import SellerPayments from './pages/seller/SellerPayments'
import SellerSettings from './pages/seller/SellerSettings'
import AddProduct from './pages/seller/AddProduct'
import SellerRegister from './pages/seller/SellerRegister'

function SellerRoute({ children }) {
  const { user } = useApp()
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'seller') return <Navigate to="/" replace />
  return children
}

function AuthRoute({ children }) {
  const { user } = useApp()
  if (user) return <Navigate to="/" replace />
  return children
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {/* Public / Buyer */}
          <Route path="/"           element={<Home />} />
          <Route path="/shop"       element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart"       element={<Cart />} />
          <Route path="/checkout"   element={<Checkout />} />
          <Route path="/orders"     element={<Orders />} />
          <Route path="/wishlist"   element={<Wishlist />} />
          <Route path="/profile"    element={<Profile />} />

          {/* Auth */}
          <Route path="/login"    element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />

          {/* Seller Registration (public) */}
          <Route path="/seller/register" element={<SellerRegister />} />

          {/* Seller (protected) */}
          <Route path="/seller"                      element={<SellerRoute><SellerDashboard /></SellerRoute>} />
          <Route path="/seller/products"             element={<SellerRoute><SellerProducts /></SellerRoute>} />
          <Route path="/seller/add-product"          element={<SellerRoute><AddProduct /></SellerRoute>} />
          <Route path="/seller/edit-product/:id"     element={<SellerRoute><AddProduct /></SellerRoute>} />
          <Route path="/seller/orders"               element={<SellerRoute><SellerOrders /></SellerRoute>} />
          <Route path="/seller/analytics"            element={<SellerRoute><SellerAnalytics /></SellerRoute>} />
          <Route path="/seller/payments"             element={<SellerRoute><SellerPayments /></SellerRoute>} />
          <Route path="/seller/settings"             element={<SellerRoute><SellerSettings /></SellerRoute>} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </>
  )
}

function NotFound() {
  return (
    <div style={{textAlign:'center',padding:'80px 20px'}}>
      <div style={{fontSize:72}}>🧵</div>
      <h1 style={{fontFamily:'var(--font-head)',fontSize:36,margin:'16px 0 10px'}}>404 – Page Not Found</h1>
      <p style={{color:'var(--mid)',marginBottom:24}}>Looks like this thread doesn't exist.</p>
      <a href="/" className="btn btn-primary btn-lg">Back to Home</a>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}