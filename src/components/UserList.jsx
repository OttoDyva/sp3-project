import React, { useEffect, useState } from "react";
import facade from "../util/apiFacade";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await facade.fetchData("/api/auth/users");
        setUsers(Array.isArray(users) ? users : []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const deleteUserById = async (userId) => {
    try {
      await facade.deleteData(`/api/auth/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editUserById = async (userId) => {
    try {
      const editedUser = await facade.editData(
        `/api/auth/users/${userId}`,
        editFormData
      );
      setUsers(users.map((user) => (user.id === userId ? editedUser : user)));
      setEditingUser(null);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setEditFormData({ ...user });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditFormData({});
  };

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <h2>Users</h2>
      <div>
        {users.map((user) => (
          <div key={user.id} className="author-card">
            <h3 className="author-name">{user.username}</h3>
            <h3 className="author-name">{user.roles}</h3>
            {editingUser === user.id ? (
              <div>
                <input
                  type="text"
                  name="username"
                  value={editFormData.username || ""}
                  onChange={handleInputChange}
                  placeholder="Username"
                />
                <button onClick={() => editUserById(user.id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <button onClick={() => deleteUserById(user.id)}>Delete</button>
                <button onClick={() => handleEditClick(user)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserList;
