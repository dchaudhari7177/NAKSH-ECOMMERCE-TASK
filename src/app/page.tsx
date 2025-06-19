"use client";
import React, { useEffect, useState, useCallback } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  isLocal?: boolean;
  description?: string;
}

// Custom hook for dark mode (default: dark)
function useDarkMode(defaultDark = true) {
  const [dark, setDark] = useState(defaultDark);
  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);
  return [dark, setDark] as const;
}

// Toast notification hook
function useToast() {
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const showToast = useCallback((type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 2000);
  }, []);
  return { toast, showToast };
}

const shimmer = (
  <div className="animate-pulse flex flex-col items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <div className="w-36 h-36 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
    <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded mt-2" />
  </div>
);

const categoriesIcon = (
  <svg className="w-5 h-5 inline-block mr-2 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
);

// Header component
function Header({ dark, setDark, search, setSearch, cartCount, onCartClick, categories, category, setCategory }: any) {
  return (
    <header className={`sticky top-0 z-40 ${dark ? 'bg-gray-900' : 'bg-white'} shadow flex flex-col sm:flex-row items-center justify-between px-4 py-3 transition-all`}>
      <div className="flex w-full sm:w-auto items-center justify-between gap-2 mb-2 sm:mb-0">
        <span className="text-2xl font-extrabold text-blue-700 tracking-tight">Geer.in</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setDark((d: boolean) => !d)} className="p-2 rounded-full bg-blue-100 dark:bg-gray-800 hover:bg-blue-200 dark:hover:bg-gray-700 transition" aria-label="Toggle dark mode">
            {dark ? (
              <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" /></svg>
            ) : (
              <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            )}
          </button>
          <button
            className="relative bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-full p-3 shadow hover:shadow-lg transition flex items-center"
            onClick={onCartClick}
            aria-label="View cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-700 dark:text-blue-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L7.5 15.75A2.25 2.25 0 009.66 18h4.68a2.25 2.25 0 002.16-2.25V6.75m-9.354-1.478L18.364 6.75m0 0l.383-1.437A1.125 1.125 0 0019.836 3H21.75" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full max-w-2xl mx-auto">
        {/* Category Dropdown */}
        <div className="relative w-full sm:w-auto">
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-l px-4 py-2 w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 appearance-none"
            style={{ minWidth: 120 }}
          >
            <option value="">All Categories</option>
            {categories.map((cat: string) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </span>
        </div>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-r px-4 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
    </header>
  );
}

// Toast component
function Toast({ toast }: any) {
  if (!toast) return null;
  return (
    <div className={`fixed top-4 left-1/2 z-50 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white font-semibold transition-all ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      {toast.message}
    </div>
  );
}

// ProductCard component
function ProductCard({ product, onClick, onEdit, onDelete, onAddToCart, inCart, dark }: any) {
  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center group hover:shadow-xl transition-shadow cursor-pointer overflow-hidden animate-fadeInUp`}
      onClick={() => onClick(product)}
    >
      <div className="absolute top-2 left-2 z-10">
        {product.isLocal && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Custom</span>}
      </div>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-36 h-36 object-cover mb-4 rounded group-hover:scale-110 transition-transform duration-300 shadow"
      />
      <h2 className="text-lg font-semibold mb-2 text-center group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">{product.name}</h2>
      <p className="text-blue-600 dark:text-blue-300 font-bold text-xl mb-2">₹{product.price}</p>
      {product.category && (
        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded-full absolute top-2 right-2">{product.category}</span>
      )}
      {product.isLocal ? (
        <div className="flex gap-2 mt-2">
          <button
            className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition-colors"
            onClick={e => { e.stopPropagation(); onEdit(product); }}
          >
            Edit
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
            onClick={e => { e.stopPropagation(); onDelete(product.id); }}
          >
            Delete
          </button>
        </div>
      ) : (
        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={e => { e.stopPropagation(); onAddToCart(product); }}
          disabled={inCart}
        >
          {inCart ? "In Cart" : "Add to Cart"}
        </button>
      )}
    </div>
  );
}

// ProductGrid component
function ProductGrid({ products, loading, onCardClick, onEdit, onDelete, onAddToCart, cart, dark }: any) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => <div key={i}>{shimmer}</div>)}
      </div>
    );
  }
  if (products.length === 0) {
    return <div className="col-span-full text-center text-gray-500">No products found.</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product: Product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onCardClick}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddToCart={onAddToCart}
          inCart={cart.some((p: Product) => p.id === product.id)}
          dark={dark}
        />
      ))}
    </div>
  );
}

// AddProductForm component
function AddProductForm({ form, formError, formSuccess, onChange, onSubmit, dark }: any) {
  return (
    <form onSubmit={onSubmit} className={`rounded-lg shadow-md p-6 mb-8 max-w-2xl mx-auto flex flex-col gap-4 ${dark ? 'bg-gray-800' : 'bg-white'}`}> 
      <h2 className="text-2xl font-bold mb-2 text-center text-blue-700 dark:text-blue-300">Add New Product</h2>
      {formError && <div className="text-red-500 text-center">{formError}</div>}
      {formSuccess && <div className="text-green-600 text-center">{formSuccess}</div>}
      <div className="flex flex-col sm:flex-row gap-4">
        <input name="name" value={form.name} onChange={onChange} placeholder="Product Name" className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
        <input name="price" value={form.price} onChange={onChange} placeholder="Price" type="number" min="0" step="0.01" className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <input name="imageUrl" value={form.imageUrl} onChange={onChange} placeholder="Image URL" className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
        <input name="category" value={form.category} onChange={onChange} placeholder="Category (optional)" className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
      </div>
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold">Add Product</button>
    </form>
  );
}

function EditProductModal({ editProduct, editForm, editError, editSuccess, onChange, onSave, onClose, dark }: any) {
  if (!editProduct) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadeIn">
      <div className={`rounded-lg shadow-lg p-8 max-w-md w-full relative transition-all ${dark ? 'bg-gray-900' : 'bg-white'}`}> 
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-black dark:hover:text-white text-2xl">&times;</button>
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700 dark:text-blue-300">Edit Product</h2>
        {editError && <div className="text-red-500 text-center mb-2">{editError}</div>}
        {editSuccess && <div className="text-green-600 text-center mb-2">{editSuccess}</div>}
        <form onSubmit={onSave} className="flex flex-col gap-4">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Name
            <input name="name" value={editForm.name} onChange={onChange} placeholder="Product Name" className="mt-1 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
          </label>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Price
            <input name="price" value={editForm.price} onChange={onChange} placeholder="Price" type="number" min="0" step="0.01" className="mt-1 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
          </label>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Image URL
            <input name="imageUrl" value={editForm.imageUrl} onChange={onChange} placeholder="Image URL" className="mt-1 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
          </label>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Category (optional)
            <input name="category" value={editForm.category} onChange={onChange} placeholder="Category (optional)" className="mt-1 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
          </label>
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold shadow">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

function CartModal({ cart, open, onClose, onRemove, dark }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadeIn">
      <div className={`rounded-lg shadow-lg p-8 max-w-md w-full relative transition-all ${dark ? 'bg-gray-900' : 'bg-white'}`}> 
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-black dark:hover:text-white text-2xl">&times;</button>
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700 dark:text-blue-300">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">Your cart is empty.</div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-4">
              {cart.map((item: any) => (
                <li key={item.id} className="flex items-center gap-4 py-3">
                  <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded shadow" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</div>
                    <div className="text-blue-600 dark:text-blue-300 font-bold">₹{item.price}</div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-lg font-bold px-2"
                    onClick={() => onRemove(item.id)}
                    aria-label="Remove from cart"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <div className="text-right font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">
              Total: ₹{cart.reduce((sum: number, item: any) => sum + Number(item.price), 0).toFixed(2)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", price: "", imageUrl: "", category: "" });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', imageUrl: '', category: '' });
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');
  const [dark, setDark] = useDarkMode();
  const { toast, showToast } = useToast();

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
      setFiltered(data);
      const cats = Array.from(new Set(data.map((p: Product) => p.category).filter(Boolean))) as string[];
      setCategories(cats);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    if (search) {
      result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category) {
      result = result.filter((p) => p.category === category);
    }
    setFiltered(result);
  }, [search, category, products]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    if (!form.name || !form.price || !form.imageUrl) {
      setFormError("Name, price, and image URL are required.");
      showToast('error', "Name, price, and image URL are required.");
      return;
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: parseFloat(form.price),
          imageUrl: form.imageUrl,
          category: form.category,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        setFormError(err.error || "Failed to add product");
        showToast('error', err.error || "Failed to add product");
        return;
      }
      setForm({ name: "", price: "", imageUrl: "", category: "" });
      setFormSuccess("Product added!");
      showToast('success', "Product added!");
      fetchProducts();
    } catch (err: any) {
      setFormError(err.message || "Failed to add product");
      showToast('error', err.message || "Failed to add product");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to delete product");
        return;
      }
      fetchProducts();
    } catch (err: any) {
      alert(err.message || "Failed to delete product");
    }
  };

  const handleCardClick = async (product: Product) => {
    if (product.isLocal) {
      setModalProduct({ ...product, description: product.description || "No description available." });
      return;
    }
    setModalLoading(true);
    // Fetch details from Fake Store API
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${product.id}`);
      if (!res.ok) throw new Error("Failed to fetch product details");
      const data = await res.json();
      setModalProduct({ ...product, description: data.description });
    } catch {
      setModalProduct({ ...product, description: "No description available." });
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => setModalProduct(null);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // Edit handlers
  const openEditModal = (product: Product) => {
    setEditProduct(product);
    setEditForm({
      name: product.name,
      price: String(product.price),
      imageUrl: product.imageUrl,
      category: product.category || '',
    });
    setEditError('');
    setEditSuccess('');
  };

  const closeEditModal = () => {
    setEditProduct(null);
    setEditError('');
    setEditSuccess('');
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError('');
    setEditSuccess('');
    if (!editForm.name || !editForm.price || !editForm.imageUrl) {
      setEditError('Name, price, and image URL are required.');
      return;
    }
    // Update in-memory (simulate PATCH)
    if (editProduct) {
      // Remove old, add updated
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editProduct.id
            ? { ...p, name: editForm.name, price: parseFloat(editForm.price), imageUrl: editForm.imageUrl, category: editForm.category }
            : p
        )
      );
      setFiltered((prev) =>
        prev.map((p) =>
          p.id === editProduct.id
            ? { ...p, name: editForm.name, price: parseFloat(editForm.price), imageUrl: editForm.imageUrl, category: editForm.category }
            : p
        )
      );
      setEditSuccess('Product updated!');
      setTimeout(() => {
        closeEditModal();
      }, 800);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className={dark ? "dark bg-gray-900 min-h-screen" : "bg-gray-50 min-h-screen"}>
      {toast && (
        <div className={`fixed top-4 left-1/2 z-50 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white font-semibold transition-all ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {toast.message}
        </div>
      )}
      <Header dark={dark} setDark={setDark} search={search} setSearch={setSearch} cartCount={cart.length} onCartClick={() => setCartOpen(true)} categories={categories} category={category} setCategory={setCategory} />
      <main className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto px-2 sm:px-6 py-6">
        <section className="flex-1">
          <button
            className="fixed bottom-6 right-6 z-40 bg-blue-600 text-white rounded-full shadow-lg p-4 md:hidden hover:bg-blue-700 transition"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Add product"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          </button>
          <AddProductForm form={form} formError={formError} formSuccess={formSuccess} onChange={handleFormChange} onSubmit={handleAddProduct} dark={dark} />
          <ProductGrid products={filtered} loading={loading} onCardClick={handleCardClick} onEdit={openEditModal} onDelete={handleDelete} onAddToCart={addToCart} cart={cart} dark={dark} />
        </section>
      </main>
      {modalProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative animate-fadeIn">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl">&times;</button>
            {modalLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <>
                <img src={modalProduct.imageUrl} alt={modalProduct.name} className="w-48 h-48 object-cover mx-auto mb-4 rounded" />
                <h2 className="text-2xl font-bold mb-2 text-center">{modalProduct.name}</h2>
                <p className="text-blue-600 font-bold text-xl mb-2 text-center">₹{modalProduct.price}</p>
                {modalProduct.category && <div className="text-center mb-2"><span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{modalProduct.category}</span></div>}
                <p className="text-gray-700 text-center mb-2">{modalProduct.description || "No description available."}</p>
              </>
            )}
          </div>
        </div>
      )}
      {cartOpen && (
        <CartModal cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} onRemove={removeFromCart} dark={dark} />
      )}
      {editProduct && (
        <EditProductModal editProduct={editProduct} editForm={editForm} editError={editError} editSuccess={editSuccess} onChange={handleEditFormChange} onSave={handleEditSave} onClose={closeEditModal} dark={dark} />
      )}
    </div>
  );
};

export default HomePage;
