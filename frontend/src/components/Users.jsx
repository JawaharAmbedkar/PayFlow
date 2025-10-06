import { useEffect, useState } from "react";
import axios from "axios";
import User from "./User.jsx";
import { API_URL } from "../../config.js";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 500);
    return () => clearTimeout(handler);
  }, [filter]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // get token

        const response = await axios.get(
          `${API_URL}/api/v1/user/bulk?filter=${debouncedFilter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ send token
            },
          }
        );

        setUsers(response.data.user || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [debouncedFilter]);

  return (
    <div className="p-4">
      <div className="m-2 font-medium text-lg">Users</div>
      <div>
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full shadow-md p-2 ring-1 ring-gray-200 rounded-md"
        />
      </div>
      <div>
        {users.length > 0 ? (
          users.map((user) => <User key={user._id} user={user} />)
        ) : (
          <p className="text-gray-500 mt-2">No users found</p>
        )}
      </div>
    </div>
  );
};
