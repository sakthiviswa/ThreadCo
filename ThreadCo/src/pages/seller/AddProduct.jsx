import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { PRODUCTS, CATEGORIES, SIZES } from '../../data/products'
import { ImagePlus, Lightbulb, Weight, Box } from 'lucide-react'
import './AddProduct.css'

export default function AddProduct() {
  const { id } = useParams()
  const isEdit = !!id
  const existing = isEdit ? PRODUCTS.find(p => p.id === +id) : null
  const { toast } = useApp()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: existing?.name || '',
    price: existing?.price || '',
    mrp: existing?.mrp || '',
    category: existing?.category || '',
    sub: existing?.sub || '',
    color: existing?.color || '',
    description: existing?.description || '',
    stock: existing?.stock || '',
    sizes: existing?.sizes || [],
  })
  const [imgPreview, setImgPreview] = useState(existing?.img || '')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const toggleSize = (s) => setForm(f => ({
    ...f,
    sizes: f.sizes.includes(s) ? f.sizes.filter(x => x !== s) : [...f.sizes, s],
  }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.category) {
      toast('Please fill required fields', 'error')
      return
    }
    toast(isEdit ? 'Product updated!' : 'Product added!', 'success')
    navigate('/seller/products')
  }

  return (
    <div className="add-product-page">
      <div className="container">
        <div className="page-header">
          <h1>{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
          <p>{isEdit ? 'Update your product details below.' : 'Fill in the details to list your product.'}</p>
        </div>

        <form className="ap-form" onSubmit={handleSubmit}>
          <div className="ap-layout">
            {/* Left: Main info */}
            <div className="ap-main">
              <div className="card ap-section">
                <h3>Basic Information</h3>
                <div className="divider" />
                <div className="field">
                  <label>Product Name *</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Cotton Oxford Shirt" />
                </div>
                <div className="field">
                  <label>Description</label>
                  <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Describe the product fabric, fit, features..." rows={4} />
                </div>
                <div className="grid-2">
                  <div className="field">
                    <label>Category *</label>
                    <select value={form.category} onChange={e => set('category', e.target.value)}>
                      <option value="">Select Category</option>
                      {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Sub-Category</label>
                    <input value={form.sub} onChange={e => set('sub', e.target.value)} placeholder="e.g. shirts, dresses, tshirts" />
                  </div>
                </div>
                <div className="field">
                  <label>Color</label>
                  <input value={form.color} onChange={e => set('color', e.target.value)} placeholder="e.g. White, Navy Blue" />
                </div>
              </div>

              <div className="card ap-section">
                <h3>Pricing &amp; Stock</h3>
                <div className="divider" />
                <div className="grid-3">
                  <div className="field">
                    <label>Selling Price (₹) *</label>
                    <input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="1299" />
                  </div>
                  <div className="field">
                    <label>MRP / Original Price (₹)</label>
                    <input type="number" value={form.mrp} onChange={e => set('mrp', e.target.value)} placeholder="1799" />
                  </div>
                  <div className="field">
                    <label>Stock Quantity</label>
                    <input type="number" value={form.stock} onChange={e => set('stock', e.target.value)} placeholder="50" />
                  </div>
                </div>
                {form.price && form.mrp && +form.mrp > +form.price && (
                  <div className="disc-preview">
                    <Lightbulb size={14} style={{ marginRight: 6, color: '#f59e0b', verticalAlign: 'middle' }} />
                    Discount: <strong>{Math.round((1 - form.price / form.mrp) * 100)}% off</strong>
                  </div>
                )}
              </div>

              <div className="card ap-section">
                <h3>Sizes Available</h3>
                <div className="divider" />
                <p className="ap-hint">Select all sizes you have in stock</p>
                <div className="sizes-picker">
                  {SIZES.map(s => (
                    <button
                      key={s}
                      type="button"
                      className={`size-pick-btn ${form.sizes.includes(s) ? 'active' : ''}`}
                      onClick={() => toggleSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="divider" />
                <p className="ap-hint">For trousers/jeans, add waist sizes:</p>
                <div className="sizes-picker">
                  {['28', '30', '32', '34', '36', '38', '40'].map(s => (
                    <button
                      key={s}
                      type="button"
                      className={`size-pick-btn ${form.sizes.includes(s) ? 'active' : ''}`}
                      onClick={() => toggleSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Image upload + Shipping */}
            <div className="ap-sidebar">
              <div className="card ap-section">
                <h3>Product Images</h3>
                <div className="divider" />
                <div className="img-upload-area" onClick={() => document.getElementById('img-input').click()}>
                  {imgPreview ? (
                    <img src={imgPreview} alt="Preview" className="img-preview" />
                  ) : (
                    <div className="img-placeholder">
                      <ImagePlus size={32} strokeWidth={1.4} color="var(--light)" />
                      <p>Click to upload</p>
                      <small>JPEG, PNG, WebP – Max 5MB</small>
                    </div>
                  )}
                </div>
                <input
                  id="img-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={e => {
                    const file = e.target.files[0]
                    if (file) setImgPreview(URL.createObjectURL(file))
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline btn-sm btn-full"
                  style={{ marginTop: 10 }}
                  onClick={() => document.getElementById('img-input').click()}
                >
                  <ImagePlus size={14} style={{ marginRight: 6 }} />
                  {imgPreview ? 'Change Image' : 'Upload Image'}
                </button>
                <p className="ap-hint" style={{ marginTop: 8 }}>You can add up to 5 images for your product.</p>
              </div>

              <div className="card ap-section">
                <h3>Shipping Info</h3>
                <div className="divider" />
                <div className="field">
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Weight size={14} />
                    Weight (grams)
                  </label>
                  <input type="number" placeholder="300" />
                </div>
                <div className="field">
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Box size={14} />
                    Package Dimensions
                  </label>
                  <input placeholder="L × W × H (cm)" />
                </div>
                <p className="ap-hint">Accurate dimensions help calculate shipping cost.</p>
              </div>
            </div>
          </div>

          <div className="ap-submit-bar">
            <button type="button" className="btn btn-outline" onClick={() => navigate('/seller/products')}>Cancel</button>
            <button type="submit" className="btn btn-accent btn-lg">
              {isEdit ? 'Save Changes' : 'List Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}