import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Use your environment variable (Vite project)
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const ManageCategory = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/category`);
      if (res.data.success) {
        setCategories(res.data.categories);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (err) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add new category
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/api/category/add`, { name });
      if (res.data.success) {
        toast.success(res.data.message);
        setName('');
        fetchCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await axios.delete(`${backendUrl}/api/category/delete/${id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        fetchCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <div className='p-4 max-w-md mx-auto'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Manage Categories</h2>

      <form onSubmit={handleAdd} className='flex gap-2 mb-4'>
        <input
          type="text"
          value={name}
          placeholder="Enter category name"
          onChange={(e) => setName(e.target.value)}
          className='border border-gray-300 px-3 py-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-purple-600'
          required
        />
        <button
          type="submit"
          className='bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800'
        >
          Add
        </button>
      </form>

      {loading ? (
        <p className='text-center text-gray-500'>Loading categories...</p>
      ) : categories.length === 0 ? (
        <p className='text-center text-gray-500'>No categories found.</p>
      ) : (
        <ul className='space-y-2'>
          {categories.map((cat) => (
            <li
              key={cat._id}
              className='flex justify-between items-center bg-white shadow px-4 py-2 rounded'
            >
              <span className='capitalize'>{cat.name}</span>
              <button
                onClick={() => handleDelete(cat._id)}
                className='text-red-600 hover:text-red-800 text-sm'
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageCategory;
