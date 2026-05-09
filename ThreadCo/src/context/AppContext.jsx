import React, { createContext, useContext, useState, useCallback } from 'react'

const AppCtx = createContext(null)

export function AppProvider({ children }) {
  // Auth
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tc_user')) } catch { return null }
  })

  // Cart
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tc_cart')) || [] } catch { return [] }
  })

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tc_wish')) || [] } catch { return [] }
  })

  // Toast
  const [toasts, setToasts] = useState([])

  const saveCart = (c) => { setCart(c); localStorage.setItem('tc_cart', JSON.stringify(c)) }
  const saveWish = (w) => { setWishlist(w); localStorage.setItem('tc_wish', JSON.stringify(w)) }

  const toast = useCallback((msg, type = 'info') => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('tc_user', JSON.stringify(userData))
  }
  const logout = () => {
    setUser(null)
    localStorage.removeItem('tc_user')
  }

  const addToCart = (product, size, qty = 1) => {
    const key = `${product.id}-${size}`
    setCart(prev => {
      const existing = prev.find(i => i.key === key)
      let next
      if (existing) {
        next = prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i)
      } else {
        next = [...prev, { key, product, size, qty }]
      }
      localStorage.setItem('tc_cart', JSON.stringify(next))
      return next
    })
    toast('Added to cart', 'success')
  }

  const removeFromCart = (key) => {
    setCart(prev => {
      const next = prev.filter(i => i.key !== key)
      localStorage.setItem('tc_cart', JSON.stringify(next))
      return next
    })
  }

  const updateQty = (key, qty) => {
    if (qty < 1) { removeFromCart(key); return }
    setCart(prev => {
      const next = prev.map(i => i.key === key ? { ...i, qty } : i)
      localStorage.setItem('tc_cart', JSON.stringify(next))
      return next
    })
  }

  const clearCart = () => { saveCart([]) }

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const next = prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
      localStorage.setItem('tc_wish', JSON.stringify(next))
      return next
    })
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0)

  return (
    <AppCtx.Provider value={{
      user, login, logout,
      cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal,
      wishlist, toggleWishlist,
      toasts, toast
    }}>
      {children}
    </AppCtx.Provider>
  )
}

export const useApp = () => useContext(AppCtx)