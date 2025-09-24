"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserShield,
  FaEnvelopeOpenText, // ✅ Correct icon for User Query
} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [admin, setAdmin] = useState(null);
  const path = usePathname();
  const router = useRouter();

  // ✅ Check Admin Auth
  const Auth = async () => {
    try {
      const AdminToken = localStorage.getItem("adminuser");
      if (!AdminToken) {
        if (!["/pages/Login"].includes(path)) {
          router.push("/pages/Login");
        }
      } else {
        const parsedData = JSON.parse(AdminToken);
        setAdmin(parsedData);
        if (["/pages/Login"].includes(path)) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Run Auth
  useEffect(() => {
    Auth();
  }, [path]);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("adminuser");
    setAdmin(null);
    router.push("/pages/Login");
    setIsMenuOpen(false);
  };

  const adminLinks = [
    { icon: <FaTachometerAlt />, label: "Dashboard", path: "/pages/adminDashboard" },
    { icon: <FaBoxOpen />, label: "Add Products", path: "/pages/products" },
    { icon: <FaShoppingBag />, label: "Orders", path: "/pages/order" },
    { icon: <FaUsers />, label: "Users", path: "/pages/users" },
    { icon: <FaEnvelopeOpenText />, label: "User Query", path: "/pages/contectus" }, // ✅ Fixed
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "py-2 bg-gradient-to-r from-black via-gray-900 to-black shadow-lg backdrop-blur-md"
            : "py-3 bg-gradient-to-r from-black via-gray-900 to-black"
        }`}
      >
        <div className="container px-4 mx-auto flex items-center justify-between">
          {/* Logo and Menu Button */}
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 text-gray-300 hover:text-yellow-400 mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>

            <Link href="/" className="flex items-center">
              <FaUserShield className="text-yellow-400 mr-2 text-2xl drop-shadow-lg" />
              <span className="text-xl font-extrabold text-yellow-400 tracking-wide drop-shadow-md">
                ADMIN PANEL
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {adminLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 font-medium transition-colors hover:scale-105 duration-200"
              >
                {item.icon} <span>{item.label}</span>
              </Link>
            ))}

            {admin && (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-semibold text-yellow-300">
                  👋 {admin.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-md hover:scale-105 transition-transform"
                >
                  <FaSignOutAlt /> <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 bg-black/95 p-4 rounded-lg shadow-lg space-y-3 absolute left-4 right-4 top-full">
            {adminLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className="flex items-center space-x-2 text-gray-200 hover:text-yellow-400 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon} <span>{item.label}</span>
              </Link>
            ))}

            {admin && (
              <>
                <p className="text-yellow-300 font-semibold text-center">
                  👋 {admin.username}
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-md hover:scale-105 transition-transform flex items-center justify-center space-x-2"
                >
                  <FaSignOutAlt /> <span>Logout</span>
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-16 lg:h-14"></div>
    </>
  );
}
