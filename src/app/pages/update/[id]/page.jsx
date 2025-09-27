"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UpdateItemPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
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
    SKU: "",
    Status: "Active",
  });

  // Custom color input state
  const [customColorInput, setCustomColorInput] = useState("");
  const [colorInputType, setColorInputType] = useState("name"); // 'name' or 'hex'

  // Predefined color options for easy selection
  const colorOptions = [
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Green", hex: "#008000" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Gray", hex: "#808080" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Purple", hex: "#800080" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Brown", hex: "#A52A2A" },
    { name: "Beige", hex: "#F5F5DC" },
    { name: "Navy", hex: "#000080" },
    { name: "Teal", hex: "#008080" },
    { name: "Maroon", hex: "#800000" },
    { name: "Olive", hex: "#808000" },
    { name: "Lime", hex: "#00FF00" },
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Gold", hex: "#FFD700" },
    { name: "Violet", hex: "#EE82EE" }
  ];

  // Predefined size options
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  // ✅ Fetch item data from API
  useEffect(() => {
    if (id) {
      fetch(`/api/items/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setFormData({
              Name: data.data.Name || "",
              ItemsImage: data.data.ItemsIamge || "",
              Price: data.data.Price || "",
              DiscountPrice: data.data.DiscountPrice || "",
              ItemsDescription: data.data.ItemsDescription || "",
              category: data.data.category || "",
              Brand: data.data.Brand || "",
              Stock: data.data.Stock || "",
              Size: data.data.Size || [],
              Colors: data.data.Colors || [],
              Rating: data.data.Rating || "",
              SKU: data.data.SKU || "",
              Status: data.data.Status || "Active",
            });
          } else {
            alert("Item not found");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setLoading(false);
        });
    }
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle Size selection
  const handleSizeChange = (size) => {
    setFormData((prev) => {
      const newSizes = prev.Size.includes(size)
        ? prev.Size.filter(s => s !== size)
        : [...prev.Size, size];
      
      return {
        ...prev,
        Size: newSizes,
      };
    });
  };

  // ✅ Handle Color selection from predefined options
  const handleColorChange = (color) => {
    setFormData((prev) => {
      const newColors = prev.Colors.includes(color)
        ? prev.Colors.filter(c => c !== color)
        : [...prev.Colors, color];
      
      return {
        ...prev,
        Colors: newColors,
      };
    });
  };

  // ✅ Handle custom color input
  const handleCustomColorAdd = () => {
    const colorValue = customColorInput.trim();
    
    if (!colorValue) return;
    
    // Validate hex color code
    if (colorInputType === "hex") {
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (!hexRegex.test(colorValue)) {
        alert("Please enter a valid hex color code (e.g., #FF0000 or #F00)");
        return;
      }
    }
    
    // Check if color already exists
    if (!formData.Colors.includes(colorValue)) {
      setFormData((prev) => ({
        ...prev,
        Colors: [...prev.Colors, colorValue],
      }));
    }
    
    setCustomColorInput(""); // Clear input after adding
  };

  // ✅ Handle custom color input key press
  const handleCustomColorKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCustomColorAdd();
    }
  };

  // ✅ Remove a color
  const removeColor = (colorToRemove) => {
    setFormData((prev) => ({
      ...prev,
      Colors: prev.Colors.filter(color => color !== colorToRemove),
    }));
  };

  // ✅ Remove a size
  const removeSize = (sizeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      Size: prev.Size.filter(size => size !== sizeToRemove),
    }));
  };

  // ✅ Handle custom size input
  const handleCustomSize = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const customSize = e.target.value.trim().toUpperCase();
      if (customSize && !formData.Size.includes(customSize)) {
        setFormData((prev) => ({
          ...prev,
          Size: [...prev.Size, customSize],
        }));
        e.target.value = ""; // Clear input after adding
      }
    }
  };

  // ✅ Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (result.success) {
      alert("✅ Item updated successfully!");
      router.push("/"); // redirect to home or admin page
    } else {
      alert("❌ Update failed: " + result.message);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">📝 Update Product</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information Section */}
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-blue-600 border-b pb-2">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                name="ItemsImage"
                value={formData.ItemsImage}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formData.ItemsImage && (
                <div className="mt-2">
                  <img src={formData.ItemsImage} alt="Preview" className="h-20 object-contain rounded border" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="ItemsDescription"
                value={formData.ItemsDescription}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="3"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Inventory Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-green-600 border-b pb-2">Pricing & Inventory</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                name="Price"
                value={formData.Price}
                onChange={handleChange}
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price ($)</label>
              <input
                name="DiscountPrice"
                value={formData.DiscountPrice}
                onChange={handleChange}
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                name="Stock"
                value={formData.Stock}
                onChange={handleChange}
                placeholder="0"
                type="number"
                min="0"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input
                name="SKU"
                value={formData.SKU}
                onChange={handleChange}
                placeholder="Enter SKU"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Category & Brand Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-purple-600 border-b pb-2">Category & Brand</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <input
                name="Brand"
                value={formData.Brand}
                onChange={handleChange}
                placeholder="Enter brand"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
              <input
                name="Rating"
                value={formData.Rating}
                onChange={handleChange}
                placeholder="0"
                type="number"
                min="0"
                max="5"
                step="0.1"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="Status"
                value={formData.Status}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sizes Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-orange-600 border-b pb-2">Available Sizes</h2>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Sizes</label>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeChange(size)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    formData.Size.includes(size) 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Add Custom Size</label>
            <input
              type="text"
              placeholder="Type size and press Enter"
              onKeyDown={handleCustomSize}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {formData.Size.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700">Selected Sizes:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.Size.map(size => (
                  <span key={size} className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm flex items-center gap-1">
                    {size}
                    <button 
                      type="button" 
                      onClick={() => removeSize(size)}
                      className="text-orange-600 hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Colors Section - FIXED */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-pink-600 border-b pb-2">Available Colors</h2>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Colors</label>
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map(color => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => handleColorChange(color.name)}
                  className={`p-2 rounded text-xs font-medium transition-all ${
                    formData.Colors.includes(color.name) 
                      ? 'ring-2 ring-offset-1 ring-pink-500' 
                      : 'hover:bg-gray-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  <span className={`${['Black', 'Navy', 'Maroon', 'Purple', 'Blue'].includes(color.name) ? 'text-white' : 'text-black'}`}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Add Custom Color</label>
            <div className="flex gap-2 mb-2">
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    checked={colorInputType === "name"}
                    onChange={() => setColorInputType("name")}
                  />
                  Color Name
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    checked={colorInputType === "hex"}
                    onChange={() => setColorInputType("hex")}
                  />
                  Hex Code
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={customColorInput}
                onChange={(e) => setCustomColorInput(e.target.value)}
                placeholder={colorInputType === "hex" ? "Enter hex code (e.g., #3C2005)" : "Enter color name"}
                onKeyDown={handleCustomColorKeyPress}
                className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="button" 
                onClick={handleCustomColorAdd}
                className="bg-pink-500 text-white px-3 rounded hover:bg-pink-600"
              >
                Add
              </button>
            </div>
            {colorInputType === "hex" && (
              <p className="text-xs text-gray-500 mt-1">Enter hex code like #FF0000 or #F00</p>
            )}
          </div>
          
          {formData.Colors.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700">Selected Colors:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.Colors.map(color => {
                  // Find if this color exists in our predefined options
                  const colorInfo = colorOptions.find(c => c.name === color);
                  const isHexColor = color.startsWith('#');
                  
                  return (
                    <span 
                      key={color} 
                      className="px-2 py-1 rounded text-sm flex items-center gap-1"
                      style={{ 
                        backgroundColor: isHexColor ? color : (colorInfo?.hex || '#f3f4f6'),
                        color: isHexColor ? '#ffffff' : (['White', 'Beige', 'Silver', 'Gold'].includes(color) ? '#000000' : '#ffffff')
                      }}
                    >
                      {color}
                      <button 
                        type="button" 
                        onClick={() => removeColor(color)}
                        className="hover:bg-black hover:bg-opacity-20 rounded-full w-4 h-4 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition-colors shadow-md"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}