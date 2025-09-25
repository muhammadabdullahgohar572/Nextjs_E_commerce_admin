"use client";

import { useState } from "react";
import {
  FaBox,
  FaDollarSign,
  FaTag,
  FaAlignLeft,
  FaCubes,
  FaStar,
  FaBarcode,
  FaCheckCircle,
  FaPalette,
  FaRuler,
  FaCommentDots,
  FaUpload,
  FaPlus,
  FaTrash,
  Trash2,
} from "react-icons/fa";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

export default function ItemForm() {
  const [formData, setFormData] = useState({
    Name: "",
    ItemsIamge: "",
    Price: "",
    DiscountPrice: "",
    ItemsDescription: "",
    category: "",
    Brand: "",
    Stock: "",
    Size: [],
    Colors: [],
    Rating: "",
    Reviews: [],
    SKU: "",
    Status: "Active",
  });

  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");

  // ✅ Size add
  const addSize = () => {
    if (currentSize.trim() && !formData.Size.includes(currentSize.trim())) {
      setFormData((prev) => ({
        ...prev,
        Size: [...prev.Size, currentSize.trim()],
      }));
      setCurrentSize("");
    }
  };

  // ✅ Size remove
  const removeSize = (sizeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      Size: prev.Size.filter((size) => size !== sizeToRemove),
    }));
  };

  // ✅ Color add (user apni marzi se name ya hex likh sakta hai)
  const addColor = () => {
    if (currentColor.trim() && !formData.Colors.includes(currentColor.trim())) {
      setFormData((prev) => ({
        ...prev,
        Colors: [...prev.Colors, currentColor.trim()],
      }));
      setCurrentColor("");
    }
  };

  // ✅ Color remove
  const removeColor = (colorToRemove) => {
    setFormData((prev) => ({
      ...prev,
      Colors: prev.Colors.filter((color) => color !== colorToRemove),
    }));
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Item created successfully!");
        setFormData({
          Name: "",
          ItemsImage: "",
          Price: "",
          DiscountPrice: "",
          ItemsDescription: "",
          category: "",
          Brand: "",
          Stock: "",
          Size: [],
          Colors: [],
          Rating: "",
          Reviews: [],
          SKU: "",
          Status: "Active",
        });
      } else {
        toast.error(result.message || "Error creating item");
      }
    } catch (error) {
      toast.error("Failed to create item");
      console.error(error);
    }
  };

  return (
   <form
  onSubmit={handleSubmit}
  className="w-full max-w-3xl mx-auto p-6 mt-[10%] bg-white shadow-lg rounded-lg space-y-6 
             overflow-x-hidden sm:overflow-hidden" // <-- yeh add karo
>

      <h1 className="text-3xl font-bold text-center text-gray-800 border-b-2 border-blue-500 inline-block pb-2 mb-8">
        Add Product
      </h1>

      {/* Name */}
      <div data-aos="fade-up">
        <label className="flex items-center text-gray-700 font-semibold mb-2">
          <FaBox className="mr-2 text-blue-500" /> Name
        </label>
        <input
          type="text"
          value={formData.Name}
          onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Item name"
          required
        />
      </div>

      {/* Image */}
      <div data-aos="fade-up">
        <label className="flex items-center text-gray-700 font-semibold mb-2">
          <FaUpload className="mr-2 text-purple-500" /> Image URL
        </label>
        <input
          type="text"
          value={formData.ItemsIamge}
          onChange={(e) =>
            setFormData({ ...formData, ItemsIamge: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter image URL"
        />
      </div>

      {/* Price */}
      <div data-aos="fade-up">
        <label className="flex items-center text-gray-700 font-semibold mb-2">
          <FaDollarSign className="mr-2 text-green-500" /> Price
        </label>
        <input
          type="number"
          value={formData.Price}
          onChange={(e) =>
            setFormData({ ...formData, Price: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter price"
          required
        />
      </div>

      {/* Discount Price */}
      <div data-aos="fade-up">
        <label className="flex items-center text-gray-700 font-semibold mb-2">
          <FaTag className="mr-2 text-pink-500" /> Discount Price
        </label>
        <input
          type="number"
          value={formData.DiscountPrice}
          onChange={(e) =>
            setFormData({ ...formData, DiscountPrice: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Enter discount price"
        />
      </div>

      {/* Description */}
      <div data-aos="fade-up">
        <label className="flex items-center text-gray-700 font-semibold mb-2">
          <FaAlignLeft className="mr-2 text-yellow-500" /> Description
        </label>
        <textarea
          value={formData.ItemsDescription}
          onChange={(e) =>
            setFormData({ ...formData, ItemsDescription: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter item description"
        />
      </div>

      {/* Category */}
      <div data-aos="fade-up">
        <label className="flex items-center text-gray-700 font-semibold mb-2">
          <FaCubes className="mr-2 text-indigo-500" /> Category
        </label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter category"
        />
      </div>

      {/* Brand */}
      <div data-aos="fade-up">
        <label className="flex items-center text-gray-700 font-semibold mb-2">
          <FaCheckCircle className="mr-2 text-teal-500" /> Brand
        </label>
        <input
          type="text"
          value={formData.Brand}
          onChange={(e) => setFormData({ ...formData, Brand: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter brand"
        />
      </div>

      {/* Stock */}
      <div data-aos="fade-up">
        <label className="flex items-center text-gray-700 font-semibold mb-2">
          <FaCubes className="mr-2 text-orange-500" /> Stock
        </label>
        <input
          type="number"
          value={formData.Stock}
          onChange={(e) =>
            setFormData({ ...formData, Stock: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter stock quantity"
        />
      </div>

      {/* Sizes */}
      <div data-aos="fade-left">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <FaRuler className="mr-2 text-blue-500" /> Sizes
        </h2>
        <div className="flex gap-2 mb-3 flex-wrap sm:flex-nowrap">
          <input
            type="text"
            value={currentSize}
            onChange={(e) => setCurrentSize(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add size (e.g. S, M, L)"
          />
          <button
            type="button"
            onClick={addSize}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
          >
            <FaPlus className="mr-1" /> Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.Size.map((size, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm flex items-center"
            >
              {size}
              <button
                type="button"
                onClick={() => removeSize(size)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <FaTrash size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div data-aos="fade-left">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <FaPalette className="mr-2 text-red-500" /> Colors
        </h2>
        <div className="flex gap-2 mb-3 flex-wrap sm:flex-nowrap">
          <input
            type="text"
            value={currentColor}
            onChange={(e) => setCurrentColor(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add color name or hex code (#000000)"
          />
          <button
            type="button"
            onClick={addColor}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
          >
            <FaPlus className="mr-1" /> Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.Colors.map((color, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm flex items-center"
            >
              {color}
              <button
                type="button"
                onClick={() => removeColor(color)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <FaTrash size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div data-aos="fade-up">
        <label className="flex items-center text-gray-700 font-semibold mb-2">
          <FaStar className="mr-2 text-yellow-500" /> Rating
        </label>
        <input
          type="number"
          value={formData.Rating}
          onChange={(e) =>
            setFormData({ ...formData, Rating: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter rating (0-5)"
          min="0"
          max="5"
        />
      </div>

      {/* SKU */}
      <div data-aos="fade-up">
        <label className="flex items-center text-gray-700 font-semibold mb-2">
          <FaBarcode className="mr-2 text-gray-500" /> SKU
        </label>
        <input
          type="text"
          value={formData.SKU}
          onChange={(e) => setFormData({ ...formData, SKU: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Enter SKU"
        />
      </div>

      {/* Status */}
      <div data-aos="fade-up">
        <label className="flex items-center text-gray-700 font-semibold mb-2">
          <FaCheckCircle className="mr-2 text-green-500" /> Status
        </label>
        <select
          value={formData.Status}
          onChange={(e) => setFormData({ ...formData, Status: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
