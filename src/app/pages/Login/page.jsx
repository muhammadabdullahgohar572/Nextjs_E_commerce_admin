"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function AdminLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const response = await res.json();
      if (res.ok && response.message === "Login successful") {
        localStorage.setItem("adminuser", JSON.stringify(response.data));
        toast.success("✅ Login Successful!", {
          position: "top-center",
          theme: "dark",
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error(response.message || "Invalid Credentials ❌", {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  // Animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      <ToastContainer />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-black/80 p-10 rounded-2xl shadow-2xl w-[90%] max-w-lg backdrop-blur-lg"
      >
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-extrabold text-center text-white mb-10 tracking-wider"
        >
          🔐 Login to Admin Panal
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid gap-6">
          {[
            {
              name: "email",
              icon: <FaEnvelope />,
              type: "email",
              placeholder: "Email",
            },
            {
              name: "password",
              icon: <FaLock />,
              type: "password",
              placeholder: "Password",
            },
          ].map((field, i) => (
            <motion.div
              key={field.name}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex items-center border-b border-gray-500 py-3"
            >
              <span className="text-white mr-3">{field.icon}</span>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white focus:outline-none"
              />
            </motion.div>
          ))}

          {/* Submit Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#22c55e",
              color: "#fff",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-white text-black py-4 rounded-lg font-bold mt-6 shadow-lg"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
