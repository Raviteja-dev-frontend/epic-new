import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets.js';
import Title from '../components/Title';
import CollectionItems from "./CollectionItems.jsx";
import axios from 'axios';
import './filter.css';
import './CollectionItem.css';

const backendUrl = 'http://localhost:4000';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false); // for mobile
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [categoryList, setCategoryList] = useState([]);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/category`);
        if (res.data.success) {
          setCategoryList(res.data.categories);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategoryList();
  }, []);

  // Toggle selected categories
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Apply category and search filters
  const applyFilter = () => {
    let filtered = [...products];

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) =>
        category.includes(item.category)
      );
    }

    setFilterProducts(filtered);
  };

  // Apply sorting
  const sortProduct = () => {
    let sorted = [...filterProducts];

    switch (sortType) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter(); // for "relevant" just apply filter without sorting
        return;
    }

    setFilterProducts(sorted);
  };

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, products]);

  // Sort products when sort type changes
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // Default filtered list to full products on load
  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  return (
    <>
      {/* Mobile overlay */}
      {showFilter && <div className="overlay" onClick={() => setShowFilter(false)}></div>}

      <div className="collection-layout">
        {/* Filter Sidebar */}
        <div className={`sidebar-filter ${showFilter ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button className="close-btn" onClick={() => setShowFilter(false)}>✕</button>
          </div>

          <p className="category-title">Categories</p>
          <div className="category-list">
            {categoryList.map((cat) => (
              <label key={cat._id} className="category-item">
                <input
                  type="checkbox"
                  value={cat.name}
                  onChange={toggleCategory}
                  className="checkbox"
                />
                <span className="category-name">{cat.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="product-area">
          {/* Header */}
          <div className="product-header">
            <button className="filter-toggle-btn" onClick={() => setShowFilter(true)}>
              <img src={assets.dropdown_icon} alt="filter" style={{ width: "16px", marginRight: "5px" }} />
              Filters
            </button>
            <h1>All Categories</h1>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="sort-select"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="collection-grid">
            {filterProducts.map((item, index) => (
              <CollectionItems
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
