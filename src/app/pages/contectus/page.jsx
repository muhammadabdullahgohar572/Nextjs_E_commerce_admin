"use client";

import { useEffect, useState } from "react";
import { FaSpinner, FaEnvelope, FaUser, FaPhone, FaComment, FaClock } from "react-icons/fa";

const UserContactus = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const callAllUserContactus = async () => {
    try {
      setLoading(true);
      setError(null);
      const callapi = await fetch("/api/contactus", { cache: "no-store" });
      
      if (!callapi.ok) {
        throw new Error(`Failed to fetch: ${callapi.status}`);
      }
      
      const res = await callapi.json();
      setData(res.data || []); // safe fallback
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to load contact messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callAllUserContactus();
  }, []);

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mt-[5%] mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-yellow-400 flex items-center gap-2">
          <FaEnvelope className="text-yellow-400" /> Contact Messages
        </h1>
        
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-4xl text-yellow-500 mb-4" />
            <p className="text-lg">Loading contact messages...</p>
            <p className="text-sm text-gray-400 mt-2">Please wait while we fetch your data</p>
          </div>
        )}
        
        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 text-center my-8">
            <p className="text-red-200 text-lg mb-4">{error}</p>
            <button 
              onClick={callAllUserContactus}
              className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded-md transition"
            >
              Try Again
            </button>
          </div>
        )}
        
        {/* Empty State */}
        {!loading && !error && data.length === 0 && (
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-8 text-center">
            <FaEnvelope className="text-4xl text-gray-500 mx-auto mb-4" />
            <p className="text-xl text-gray-300">No contact messages found</p>
            <p className="text-gray-500 mt-2">When users contact you, their messages will appear here.</p>
          </div>
        )}
        
        {/* Data List */}
        {!loading && !error && data.length > 0 && (
          <div className="space-y-6">
            {data.map((items) => (
              <div
                key={items._id}
                className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-lg hover:shadow-yellow-500/10 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h2 className="text-xl font-semibold text-yellow-400 flex items-center gap-2">
                    <FaUser className="text-yellow-500" /> {items.username}
                  </h2>
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <FaClock className="text-gray-500" />
                    {new Date(items.createdAt).toLocaleString()}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <p className="text-gray-300 flex items-center gap-2">
                    <FaEnvelope className="text-blue-400" /> 
                    <span className="truncate">{items.email}</span>
                  </p>
                  
                  <p className="text-gray-300 flex items-center gap-2">
                    <FaPhone className="text-green-400" /> 
                    {items.PhoneNumber}
                  </p>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-300 font-medium flex items-center gap-2">
                    <FaComment className="text-purple-400" /> 
                    Subject: {items.subject}
                  </p>
                </div>
                
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-300 italic">"{items.message}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserContactus;