import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaImage, FaArrowLeft } from 'react-icons/fa';
import '../Css/AdminProducts.css';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    discount: '',
    category: '',
    stock: '',
    sizes: '',
    colors: '',
    features: '',
    is_new: false,
    is_featured: false,
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      toast.error('Please login as admin');
      navigate('/admin/login');
      return;
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/products`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data) {
        setProducts(response.data.products || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) return [];

    const token = localStorage.getItem('adminToken');
    const formData = new FormData();

    imageFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/upload/images`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data.images.map(img => img.url);
    } catch (error) {
      console.error('Error uploading images:', error);
      throw new Error('Failed to upload images');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const token = localStorage.getItem('adminToken');

      // Upload images first (but don't fail if upload fails)
      let imageUrls = [];
      if (imageFiles.length > 0) {
        toast.loading('Uploading images...');
        try {
          imageUrls = await uploadImages();
          toast.dismiss();
          toast.success('Images uploaded successfully!');
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          toast.dismiss();
          toast.error('Image upload failed. Product will be created without images. Please set up Supabase Storage bucket.');
          // Continue with product creation even if images fail
        }
      }

      // Prepare product data
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        discount: formData.discount ? parseInt(formData.discount) : 0,
        category: formData.category,
        stock: parseInt(formData.stock),
        images: imageUrls,
        sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()) : [],
        colors: formData.colors ? formData.colors.split(',').map(c => c.trim()) : [],
        features: formData.features ? formData.features.split('\n').filter(f => f.trim()) : [],
        is_new: formData.is_new,
        is_featured: formData.is_featured,
      };

      let response;
      if (editingProduct) {
        // Update existing product
        response = await axios.put(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/products/${editingProduct.id}`,
          productData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success('Product updated successfully!');
      } else {
        // Create new product
        response = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/products`,
          productData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success('Product created successfully!');
      }

      setShowModal(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.response?.data?.error || 'Failed to save product');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      original_price: product.original_price || '',
      discount: product.discount || '',
      category: product.category,
      stock: product.stock,
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : '',
      colors: Array.isArray(product.colors) ? product.colors.join(', ') : '',
      features: Array.isArray(product.features) ? product.features.join('\n') : '',
      is_new: product.is_new || false,
      is_featured: product.is_featured || false,
    });
    setImagePreview(product.images || []);
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/products/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      original_price: '',
      discount: '',
      category: '',
      stock: '',
      sizes: '',
      colors: '',
      features: '',
      is_new: false,
      is_featured: false,
    });
    setImageFiles([]);
    setImagePreview([]);
    setEditingProduct(null);
  };

  if (loading) {
    return <div className="admin-products"><div className="loading">Loading products...</div></div>;
  }

  return (
    <div className="admin-products">
      <div className="admin-products-header">
        <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
          <FaArrowLeft /> Back to Dashboard
        </button>
        <h1>Product Management</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="add-product-btn"
        >
          <FaPlus /> Add New Product
        </button>
      </div>

      <div className="products-grid">
        {products.length === 0 ? (
          <div className="no-products">
            <p>No products yet. Click "Add New Product" to create one.</p>
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card-admin">
              <div className="product-image-admin">
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0]} alt={product.name} />
                ) : (
                  <div className="no-image"><FaImage /></div>
                )}
              </div>
              <div className="product-info-admin">
                <h3>{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price-admin">${parseFloat(product.price).toFixed(2)}</p>
                <p className="product-stock">Stock: {product.stock}</p>
                <div className="product-actions">
                  <button onClick={() => handleEdit(product)} className="edit-btn">
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="delete-btn">
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g., Clothing, Electronics"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Product description..."
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Original Price</label>
                  <input
                    type="number"
                    name="original_price"
                    value={formData.original_price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Discount %</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                  />
                </div>

                <div className="form-group">
                  <label>Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Sizes (comma-separated)</label>
                  <input
                    type="text"
                    name="sizes"
                    value={formData.sizes}
                    onChange={handleInputChange}
                    placeholder="S, M, L, XL"
                  />
                </div>

                <div className="form-group">
                  <label>Colors (comma-separated)</label>
                  <input
                    type="text"
                    name="colors"
                    value={formData.colors}
                    onChange={handleInputChange}
                    placeholder="Red, Blue, Green"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Features (one per line)</label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="High quality material&#10;Comfortable fit&#10;Durable"
                />
              </div>

              <div className="form-group">
                <label>Product Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                {imagePreview.length > 0 && (
                  <div className="image-preview-grid">
                    {imagePreview.map((url, index) => (
                      <img key={index} src={url} alt={`Preview ${index + 1}`} />
                    ))}
                  </div>
                )}
              </div>

              <div className="form-checkboxes">
                <label>
                  <input
                    type="checkbox"
                    name="is_new"
                    checked={formData.is_new}
                    onChange={handleInputChange}
                  />
                  Mark as New
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleInputChange}
                  />
                  Featured Product
                </label>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="cancel-btn"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={uploading}>
                  {uploading ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
