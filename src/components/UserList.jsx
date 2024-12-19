import React, { useEffect, useState } from "react";

// CSS
import "../css/UserListStyle.css";

// Util
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

  const deleteUserByUsername = async (username) => {
    try {
      await facade.deleteData(`/api/auth/user/${username}`);
      setUsers(users.filter((user) => user.username !== username));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editUserByUsername = async (username) => {
    try {
      const updatedUser = await facade.editData(
        `/api/auth/user/${username}`,
        editFormData
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.username === username ? { ...user, ...editFormData } : user
        )
      );
      setEditingUser(null);
      setEditFormData({});
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user.username);
    setEditFormData({
      roles: user.roles.join(","),
      password: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: name === "roles" ? value.split(",") : value,
    }));
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditFormData({});
  };

  return (
    <div className="user-list-container">
      <div className="title">
        <h1>Admin Page</h1>
      </div>
      <div className="user-list-grid">
        {users.map((user) => (
          <div key={user.username} className="author-card">
            <h3>{user.username}</h3>
            <p>Roles: {user.roles.join(", ")}</p>

            {editingUser === user.username ? (
              <div className="useredit">
                <div>
                  <label htmlFor={`roles-${user.username}`}>
                    Roles (comma-separated):
                  </label>
                  <input
                    id={`roles-${user.username}`}
                    type="text"
                    name="roles"
                    value={editFormData.roles || ""}
                    onChange={handleInputChange}
                    placeholder="Roles"
                  />
                </div>
                <div>
                  <label htmlFor={`password-${user.username}`}>
                    Password:
                  </label>
                  <input
                    id={`password-${user.username}`}
                    type="password"
                    name="password"
                    value={editFormData.password || ""}
                    onChange={handleInputChange}
                    placeholder="Leave empty for no change."
                  />
                </div>
                <div className="button-group">
                  <button onClick={() => editUserByUsername(user.username)}>
                    Save
                  </button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="button-group">
                <button onClick={() => deleteUserByUsername(user.username)}>
                  Delete
                </button>
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
