import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Footer } from "../components/Footer";
import { API_URL } from "../../config";

export const TransferMoney = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [usersPage, setUsersPage] = useState(1);
  const [usersTotalPages, setUsersTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API_URL}/api/v1/user/bulk?page=${usersPage}&limit=10&filter=${search}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setUsers(data.users || []);
      setUsersTotalPages(data.totalPages || 1);
    };
    fetchUsers();
  }, [usersPage, search]);

  const sendMoney = (user) => {
    navigate(`/sendmoney?id=${user._id}&name=${user.firstName}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-50">
      {/* Appbar */}
      <Appbar />

      {/* Main Content */}
      <div className="flex-1 mx-6 sm:mx-12 mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Users</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 mb-6"
        />

        {/* Users List */}
        <div className="space-y-3">
          {users.length > 0 ? (
            users.map((u) => (
              <div
                key={u._id}
                className="p-4 border rounded-lg flex justify-between items-center bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition"
              >
                <div className="text-gray-700 text-sm sm:text-base">
                  {u.firstName} {u.lastName}
                </div>
                <button
                  onClick={() => sendMoney(u)}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-full shadow-md hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 hover:shadow-lg"
                >
                  Send Money
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No users found</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-6 mb-4">
          <button
            disabled={usersPage === 1}
            onClick={() => setUsersPage(usersPage - 1)}
            className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium shadow hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ← Prev
          </button>
          <span className="text-gray-800 font-medium">
            Page {usersPage} of {usersTotalPages}
          </span>
          <button
            disabled={usersPage === usersTotalPages}
            onClick={() => setUsersPage(usersPage + 1)}
            className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium shadow hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
