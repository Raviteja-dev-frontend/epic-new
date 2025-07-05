// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { backendUrl } from '../App';  // Make sure backendUrl is exported properly
// import { toast } from 'react-toastify';

// const ManageCategory = () => {
//   const [name, setName] = useState('');
//   const [categories, setCategories] = useState([]);

//   // Fetch categories from backend
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/api/category`);
//       if (res.data.success) {
//         setCategories(res.data.categories);
//       }
//     } catch (err) {
//       toast.error("Failed to load categories");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Handle adding new category
//   const handleAdd = async (e) => {
//     e.preventDefault();
//     if (!name.trim()) {
//       toast.error("Category name cannot be empty");
//       return;
//     }

//     try {
//       const res = await axios.post(`${backendUrl}/api/category/add`, { name });
//       if (res.data.success) {
//         toast.success(res.data.message);
//         setName('');
//         fetchCategories();
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className='p-4'>
//       <h2 className='text-xl font-bold mb-4'>Manage Categories</h2>
//       <form onSubmit={handleAdd} className='flex gap-2 mb-4'>
//         <input
//           type="text"
//           value={name}
//           placeholder="Enter category name"
//           onChange={(e) => setName(e.target.value)}
//           className='border px-3 py-2 rounded'
//           required
//         />
//         <button
//           type="submit"
//           className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800'
//         >
//           Add
//         </button>
//       </form>

//       <ul className='list-disc ml-5'>
//         {categories.map((cat) => (
//           <li key={cat._id} className='capitalize'>{cat.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ManageCategory;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Replace with your actual backend URL
const backendUrl = "http://localhost:4000";

const ManageCategory = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/category`);
      if (res.data.success) {
        setCategories(res.data.categories);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (err) {
      toast.error("Failed to load categories");
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

  // Delete category by id
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
      <h2 className='text-xl font-bold mb-4'>Manage Categories</h2>
      
      <form onSubmit={handleAdd} className='flex gap-2 mb-4'>
        <input
          type="text"
          value={name}
          placeholder="Enter category name"
          onChange={(e) => setName(e.target.value)}
          className='border px-3 py-2 rounded flex-grow'
          required
        />
        <button
          type="submit"
          className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800'
        >
          Add
        </button>
      </form>

      <ul className='list-disc ml-5'>
        {categories.map((cat) => (
          <li key={cat._id} className='capitalize flex justify-between items-center'>
            <span>{cat.name}</span>
            <button
              onClick={() => handleDelete(cat._id)}
              className='text-red-600 hover:text-red-800 ml-4'
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategory;
