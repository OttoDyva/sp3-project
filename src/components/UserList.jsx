import React, { useEffect, useState } from "react";

// CSS
import "../css/UserListStyle.css";

// Util
import facade from "../util/apiFacade";

// Components
import SearchUser from "./SearchUser";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [filteredUsers, setFilteredUsers] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await facade.fetchData("/api/auth/users");
        setUsers(Array.isArray(users) ? users : []);
        setFilteredUsers(Array.isArray(users) ? users : []);
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

      // Update the user list immediately
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

   // Paginate the filtered authors
   const indexOfLastUser = currentPage * usersPerPage;
   const indexOfFirstUser = indexOfLastUser - usersPerPage;
   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
 
   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
 
   const paginate = (pageNumber) => {
     setCurrentPage(pageNumber);
     window.scrollTo(0, 0); // Scroll to the top when the page changes
   };
 
   // Navigate to first/last page
   const goToFirstPage = () => {
     setCurrentPage(1);
     window.scrollTo(0, 0);
   };
 
   const goToLastPage = () => {
     setCurrentPage(totalPages);
     window.scrollTo(0, 0);
   };
 

  return (
    <div className="user-list-container">
      <div className="title">
        <h1>Admin Page</h1>
      </div>
      
      <SearchUser onSearchResults={setFilteredUsers} />
      <div className="user-list-grid">
        {currentUsers.map((user) => (
          <div key={user.username} className="author-card">
            <h3>{user.username}</h3>
            <p>Roles: {user.roles.join(", ")}</p>

            {editingUser === user.username ? (
              <div>
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
                  <label htmlFor={`password-${user.username}`}>Password:</label>
                  <input
                    id={`password-${user.username}`}
                    type="password"
                    name="password"
                    value={editFormData.password || ""}
                    onChange={handleInputChange}
                    placeholder="Leave empty for no change. "
                  />
                </div>
                <div>
                  <button onClick={() => editUserByUsername(user.username)}>
                    Save
                  </button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <button onClick={() => deleteUserByUsername(user.username)}>
                  Delete
                </button>
                <button onClick={() => handleEditClick(user)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={goToFirstPage} disabled={currentPage === 1}>
          &lt;&lt; First
        </button>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          &lt; Prev
        </button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          Next &gt;
        </button>
        <button onClick={goToLastPage} disabled={currentPage === totalPages}>
          Last &gt;&gt;
        </button>
        <span>Page {currentPage} of {totalPages}</span>
      </div>

    </div>
  );
};

export default UserList;
