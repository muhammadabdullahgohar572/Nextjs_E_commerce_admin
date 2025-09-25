"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ Fetch data from API
  const fetchItems = async () => {
    try {
      const res = await fetch("/api/items");
      const result = await res.json();
      if (result.success) {
        setItems(result.data);
        setFilteredItems(result.data);

        // ✅ unique categories extract karo
        const uniqueCategories = [
          ...new Set(
            result.data.map((item) => item.category || "Uncategorized")
          ),
        ];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data");
    }
  };

  // ✅ Delete item (local state se update hoga)
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Item deleted successfully");

        // ✅ State update karo (instant refresh)
        setItems((prev) => prev.filter((item) => item._id !== id));
        setFilteredItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(result.message || "Failed to delete item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting item");
    }
  };

  // ✅ Filter items when category changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) => item.category === category));
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchItems();
  }, []);

  return (
    <div className="p-6 mt-[5%] max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* ✅ Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          onClick={() => handleCategoryChange("All")}
          className={`px-4 py-2 rounded-full font-medium ${
            selectedCategory === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full font-medium ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ✅ Items Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            data-aos="fade-up"
            className="bg-white shadow-md rounded-lg p-4 flex flex-col"
          >
            <img
              src={item.ItemsIamge}
              alt={item.Name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h2 className="text-lg font-semibold">{item.Name}</h2>

            <p className="text-gray-600 text-sm mt-1 whitespace-normal break-words">
              {item.ItemsDescription}
            </p>

            <p className="mt-2 text-blue-600 font-bold">Rs. {item.Price}</p>
            <p className="text-sm text-gray-500">Stock: {item.Stock}</p>
            <p className="text-sm text-gray-500 italic">
              Category: {item.category || "Uncategorized"}
            </p>

            {/* Buttons */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => alert("Edit functionality coming soon!")}
                className="flex-1 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
