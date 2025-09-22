"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditUserDetails(props) {
  const params = useParams();
  const router = useRouter();
  const id = props.id || params.id;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    city: "",
    Gender: "",
    PhoneNumber: "",
    password: "",
  });

  // ✅ Get user details
  const getUser = async () => {
    try {
      const res = await fetch(`/api/users/edit/${id}`);
      const data = await res.json();
      if (data?.data) {
        setFormData({
          username: data.data.username,
          email: data.data.email,
          address: data.data.address,
          city: data.data.city,
          Gender: data.data.Gender,
          PhoneNumber: data.data.PhoneNumber,
          password: "",
        });
      }
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  useEffect(() => {
    if (id) getUser();
  }, [id]);

  // ✅ Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Update user with Toastify
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "User updated successfully ✅",{
            position:"top-center",
            theme:"dark"
        });
        setTimeout(() => {
          router.push("/pages/users"); // redirect after success
        }, 2000);
      } else {
        toast.error(data.message || "Failed to update user ❌");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-yellow-400">
          ✏️ Edit User
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-yellow-400 outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-yellow-400 outline-none"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-yellow-400 outline-none"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-yellow-400 outline-none"
          />
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-yellow-400 outline-none"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-yellow-400 outline-none"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New Password (optional)"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-yellow-400 outline-none"
          />

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}
