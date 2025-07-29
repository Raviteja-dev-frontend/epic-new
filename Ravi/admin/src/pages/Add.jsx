import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [bestseller, setBestseller] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [rating, setRating] = useState(4);
  const [customers, setCustomers] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [reviews, setReviews] = useState([{ id: uuidv4(), reviewer: '', comment: '', rating: 5 }]);
  const [loading, setLoading] = useState(false);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  const addReview = () => {
    if (reviews.length >= 50) return toast.error('Maximum 50 reviews allowed');
    setReviews([...reviews, { id: uuidv4(), reviewer: '', comment: '', rating: 5 }]);
  };

  const updateReview = (id, field, value) => {
    const updated = reviews.map((review) =>
      review.id === id ? { ...review, [field]: field === 'rating' ? Number(value) : value } : review
    );
    setReviews(updated);
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const handleImageChange = (index, file) => {
    if (!file) return;

    // Validate file type (only images)
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed');
      return;
    }
    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be under 2MB');
      return;
    }

    const updated = [...images];
    updated[index] = file;
    setImages(updated);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!name.trim() || !description.trim() || !price || !category) {
      return toast.error('Please fill all required fields');
    }
    if (isNaN(price) || Number(price) <= 0) {
      return toast.error('Please enter a valid price');
    }
    if (rating < 0 || rating > 5) {
      return toast.error('Rating must be between 0 and 5');
    }
    if (customers < 0) {
      return toast.error('Customers bought cannot be negative');
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('bestseller', bestseller);
      formData.append('rating', rating);
      formData.append('customers', customers);

      sizes.forEach((size) => formData.append('sizes[]', size));

      reviews.forEach((rev, i) => {
        formData.append(`reviews[${i}][reviewer]`, rev.reviewer);
        formData.append(`reviews[${i}][comment]`, rev.comment);
        formData.append(`reviews[${i}][rating]`, rev.rating);
      });

      images.forEach((img, idx) => {
        if (img) formData.append(`image${idx + 1}`, img);
      });

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token, 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setSizes([]);
        setBestseller(false);
        setRating(4);
        setCustomers(0);
        setReviews([{ id: uuidv4(), reviewer: '', comment: '', rating: 5 }]);
        setImages([null, null, null, null]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/category`);
        if (res.data.success) {
          setCategoryList(res.data.categories);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-4">

      {/* Upload Images */}
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          {images.map((img, idx) => (
            <label key={idx} htmlFor={`image${idx}`} className="cursor-pointer">
              <img
                className="w-20 h-20 object-cover border"
                src={img ? URL.createObjectURL(img) : assets.upload_area}
                alt={`Preview ${idx + 1}`}
              />
              <input
                type="file"
                accept="image/*"
                hidden
                id={`image${idx}`}
                onChange={(e) => handleImageChange(idx, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          placeholder="Type here"
          required
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          placeholder="Write content here"
          required
          rows={4}
        />
      </div>

      {/* Category */}
      <div className="w-full max-w-[500px]">
        <p className="mb-2">Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="">-- Select Category --</option>
          {categoryList.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="w-full max-w-[500px]">
        <p className="mb-2">Price</p>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          min="0"
          step="0.01"
          required
        />
      </div>

      {/* Sizes */}
      <div className="flex flex-wrap gap-2 mt-4">
        <p className="w-full mb-1">Product Sizes</p>
        {['1.5 x 2', '3 x 2', '6 x 4', '6 x 8', '7 x 5', '8 x 10', '8 x 12', '10 x 10', '10 x 12','10 x 15', '11 x 11', '12 x 15 ', '12 x 18', '16 x 20', '16 x 24', '18 x 24', 'FREE SIZE'].map((size) => (
          <p
            key={size}
            onClick={() => toggleSize(size)}
            className={`cursor-pointer px-3 py-1 rounded select-none ${
              sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'
            }`}
          >
            {size}
          </p>
        ))}
      </div>

      {/* Rating */}
      <div className="w-full max-w-[500px]">
        <p className="mb-2">Rating (out of 5)</p>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="0"
          max="5"
          step="0.1"
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      {/* Customers Bought */}
      <div className="w-full max-w-[500px]">
        <p className="mb-2">Number of Customers Bought</p>
        <input
          type="number"
          value={customers}
          onChange={(e) => setCustomers(Number(e.target.value))}
          min="0"
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      {/* Bestseller */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <label htmlFor="bestseller">Bestseller</label>
      </div>

      {/* Reviews */}
      <div className="w-full max-w-[500px]">
        <p className="mb-2 flex items-center justify-between">
          Reviews
          <button
            type="button"
            onClick={addReview}
            className="text-sm text-blue-600 hover:underline"
          >
            Add Review
          </button>
        </p>
        {reviews.map((review, i) => (
          <div
            key={review.id}
            className="mb-3 p-2 border rounded flex flex-col gap-2 bg-gray-50"
          >
            <input
              type="text"
              placeholder="Reviewer"
              value={review.reviewer}
              onChange={(e) => updateReview(review.id, 'reviewer', e.target.value)}
              className="w-full px-3 py-1 border rounded"
              required
            />
            <textarea
              placeholder="Comment"
              value={review.comment}
              onChange={(e) => updateReview(review.id, 'comment', e.target.value)}
              className="w-full px-3 py-1 border rounded"
              rows={2}
              required
            />
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="Rating"
              value={review.rating}
              onChange={(e) => updateReview(review.id, 'rating', e.target.value)}
              className="w-full px-3 py-1 border rounded"
              required
            />
            {reviews.length > 1 && (
              <button
                type="button"
                onClick={() => deleteReview(review.id)}
                className="text-red-600 text-sm self-start hover:underline"
              >
                Delete Review
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`px-5 py-2 rounded bg-pink-600 text-white ${
          loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-700'
        }`}
      >
        {loading ? 'Adding...' : 'ADD'}
      </button>
    </form>
  );
};

export default Add;
