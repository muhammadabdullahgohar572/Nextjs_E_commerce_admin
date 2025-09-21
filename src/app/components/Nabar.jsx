"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserShield,
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
    {
      icon: <FaTachometerAlt />,
      label: "Dashboard",
      path: "/pages/adminDashboard",
    },
    { icon: <FaBoxOpen />, label: "Products", path: "/pages/products" },
    { icon: <FaShoppingBag />, label: "Orders", path: "/pages/orders" },
    { icon: <FaUsers />, label: "Users", path: "/pages/users" },
    { icon: <FaCog />, label: "Settings", path: "/pages/settings" },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "py-2 bg-black shadow-lg backdrop-blur-md"
            : "py-3 bg-black "
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
              <FaUserShield className="text-yellow-400 mr-2 text-2xl" />
              <span className="text-xl font-extrabold text-yellow-400 tracking-wide">
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
                className="flex items-center space-x-2 text-gray-200 hover:text-yellow-400 font-medium transition-colors"
              >
                {item.icon} <span>{item.label}</span>
              </Link>
            ))}

            {admin && (
              <>
                <span className="text-sm font-semibold text-gray-300 mr-4">
                  👋 {admin.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors"
                >
                  <FaSignOutAlt /> <span>Logout</span>
                </button>
              </>
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
                <p className="text-gray-300 font-semibold text-center">
                  👋 {admin.username}
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors flex items-center justify-center space-x-2"
                >
                  <FaSignOutAlt /> <span>Logout</span>
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      <div className="h-16 lg:h-14"></div>
    </>
  );
}
