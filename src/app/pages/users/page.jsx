"use client";

import { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaSpinner,
  FaMapMarkerAlt,
} from "react-icons/fa";
import AOS from "aos";
import Swal from "sweetalert2";
import "aos/dist/aos.css";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [expandedAddresses, setExpandedAddresses] = useState({});

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
      const data = await res.json();
      setUsers(data.data || []);
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to load users. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const toggleAddress = (id) => {
    setExpandedAddresses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
        setDeletingId(id);
        const res = await fetch(`/api/users/delete/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error(`Failed to delete user: ${res.status}`);
        const data = await res.json();
        Swal.fire("Deleted!", data.message, "success");
        getAllUsers();
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to delete user. Please try again.", "error");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-10 px-4">
      <div className="max-w-7xl mx-auto mt-[5%]">
        <div className="flex justify-center items-center mb-10">
          <h1 className="text-4xl font-extrabold text-white" data-aos="fade-down">
            👥 User Management
          </h1>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64" data-aos="fade-in">
            <div className="text-center">
              <FaSpinner className="animate-spin text-4xl mb-4 mx-auto text-blue-500" />
              <p className="text-xl">Loading users...</p>
            </div>
          </div>
        )}

        {!loading && (
          <div
            className="overflow-x-auto shadow-2xl rounded-2xl bg-white/10 backdrop-blur-lg border border-gray-700"
            data-aos="fade-up"
          >
            <table className="w-full table-auto text-white">
              <thead>
                <tr className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 uppercase text-sm tracking-wider">
                  <th className="px-4 py-3 text-left">Username</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Address</th>
                  <th className="px-4 py-3 text-left">City</th>
                  <th className="px-4 py-3 text-left">Gender</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-center">Actions</th>
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
                      <td className="px-4 py-3">{user.username}</td>
                      <td className="px-4 py-3 break-words">{user.email}</td>
                      <td className="px-4 py-3 max-w-[200px]">
                        {user.address ? (
                          <div className="flex flex-col">
                            <div className="flex items-start gap-2">
                              <FaMapMarkerAlt className="text-red-400 mt-1 flex-shrink-0" />
                              <span
                                className={
                                  expandedAddresses[user._id] ? "break-words" : "truncate"
                                }
                              >
                                {user.address}
                              </span>
                            </div>
                            {user.address.length > 30 && (
                              <button
                                onClick={() => toggleAddress(user._id)}
                                className="text-blue-400 text-xs mt-1 text-left hover:underline"
                              >
                                {expandedAddresses[user._id] ? "Show less" : "Show more"}
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-500">No address</span>
                        )}
                      </td>
                      <td className="px-4 py-3">{user.city}</td>
                      <td className="px-4 py-3">{user.Gender}</td>
                      <td className="px-4 py-3">{user.PhoneNumber}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-4">
                          <Link href={`/pages/edituserdeatils/${user._id}`}>
                            <button className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition" title="Edit User">
                              <FaEdit size={16} />
                            </button>
                          </Link>
                          <button
                            onClick={() => deleteUser(user._id)}
                            disabled={deletingId === user._id}
                            className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete User"
                          >
                            {deletingId === user._id ? (
                              <FaSpinner className="animate-spin" size={16} />
                            ) : (
                              <FaTrash size={16} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-gray-400 text-lg">
                      🚫 No Users Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
