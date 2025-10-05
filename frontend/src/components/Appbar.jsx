import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Appbar() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("http://localhost:3000/api/v1/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  const firstLetter = user ? user.firstName.charAt(0).toUpperCase() : "U";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/frontPage");
  };

  return (
    <>
      {/* Top Appbar */}
      <div className="flex justify-between items-center p-3 shadow-lg bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-100 rounded-b-3xl">
        {/* Logo */}
        <div className="font-medium text-lg flex items-center">
          <Link to="/dashboard">
            <img className="w-[100px]" src="/PayFlow.png" alt="PayFlow" />
          </Link>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center font-medium text-lg text-gray-800">
            Hello {user?.firstName || ""}
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white rounded-full w-11 h-11 flex justify-center items-center text-xl font-semibold hover:scale-105 transition-transform shadow-md"
          >
            {firstLetter}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <>
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
          ></div>

          <div className="fixed top-0 right-0 w-64 h-full bg-gradient-to-b from-white to-indigo-100 shadow-xl z-50 flex flex-col p-5 rounded-l-3xl">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="self-end text-gray-600 hover:text-gray-800 text-2xl"
            >
              ✕
            </button>
            <div className="flex flex-col items-start mt-6 space-y-4">
              <p className="text-lg font-semibold text-gray-700">
                You want to logout?
              </p>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
