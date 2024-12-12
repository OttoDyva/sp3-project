import React, { useEffect, useState } from "react";
import facade from "../util/apiFacade";

const UserList = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <h2>Users</h2>
      <div>
        {users.map((user) => (
          <div key={user.id} className="author-card">
            <h3 className="author-name">{user.username}</h3>
            <p className="author-description">{user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );  
};
export default UserList;
