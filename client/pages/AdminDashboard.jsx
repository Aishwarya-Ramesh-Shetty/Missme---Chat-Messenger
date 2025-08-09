import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;



const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await fetch("${API_URL}/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`${API_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const startEdit = (user) => {
    setEditingUser(user._id);
    setFormData({ name: user.name, email: user.email, mobile: user.mobile });
  };

  const saveEdit = async (id) => {
    try {
      await fetch(`${API_URL}/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          Admin Dashboard 
        </h2>
        <button
          onClick={() => navigate("/chatbox")}
          className="bg-[#9f3a38] hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow"
        >
          Back to Chatbox
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-[#0f766e] text-white">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Mobile</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  {editingUser === user._id ? (
                    <>
                      <td className="py-3 px-6">
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                      </td>
                      <td className="py-3 px-6">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                      </td>
                      <td className="py-3 px-6">
                        <input
                          type="text"
                          value={formData.mobile}
                          onChange={(e) =>
                            setFormData({ ...formData, mobile: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                      </td>
                      <td className="py-3 px-6 text-center space-x-2">
                        <button
                          onClick={() => saveEdit(user._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md font-semibold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingUser(null)}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-md font-semibold"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-6">{user.name}</td>
                      <td className="py-3 px-6">{user.email}</td>
                      <td className="py-3 px-6">{user.mobile}</td>
                      <td className="py-3 px-6 text-center space-x-2">
                        <button
                          onClick={() => startEdit(user)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
