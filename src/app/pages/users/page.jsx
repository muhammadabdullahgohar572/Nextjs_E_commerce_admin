"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AOS from "aos";
import Swal from "sweetalert2";
import "aos/dist/aos.css";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  // ✅ Init Animation
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // ✅ Get All Users
  const getAllUsers = async () => {
    try {
      const res = await fetch("/api/users", { cache: "no-store" });
      const data = await res.json();
      setUsers(data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // ✅ Delete User with SweetAlert
  const deleteUser = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const res = await fetch(`/api/users/delete/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        Swal.fire("Deleted!", data.message, "success");
        getAllUsers();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  // ✅ Edit User (redirect to edit page)
  const editUser = (id) => {
    window.location.href = `/users/edit/${id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1
          className="text-4xl font-extrabold text-center text-white mb-10"
          data-aos="fade-down"
        >
          👥 User Management
        </h1>

        {/* Table Card */}
        <div
          className="overflow-x-auto shadow-2xl rounded-2xl bg-white/10 backdrop-blur-lg border border-gray-700"
          data-aos="fade-up"
        >
          <table className="min-w-full table-auto text-white">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 uppercase text-sm tracking-wider">
                <th className="px-6 py-4 text-left">Username</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">City</th>
                <th className="px-6 py-4 text-left">Gender</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, idx) => (
                  <tr
                    key={user._id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-900/50" : "bg-gray-800/50"
                    } hover:bg-gray-700/50 transition`}
                  >
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.city}</td>
                    <td className="px-6 py-4">{user.Gender}</td>
                    <td className="px-6 py-4">{user.PhoneNumber}</td>
                    <td className="px-6 py-4 flex items-center justify-center gap-6">
                      <Link href={`/edituserdeatils/${user._id}`}>
                      <button
                        className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition"
                        title="Edit User"
                        >
                        <FaEdit size={18} />
                      </button>
                          </Link>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition"
                        title="Delete User"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-400 text-lg"
                  >
                    🚫 No Users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
