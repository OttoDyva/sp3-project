import { useState } from "react";
import { useNavigate } from "react-router-dom";
import facade from "../util/apiFacade";

const UserForm = ({ setUser }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formElement = evt.target;
    const form = new FormData(formElement);
    const obj = Object.fromEntries(form.entries());

    try {
      const createdUser = await facade.postUserData("/api/auth/register", obj);
      setUser((prevUser) => [...prevUser, createdUser]);
      navigate("/BarsList");
    } catch (error) {
      const errorDetail = await error.fullError;
      setErrorMessage(errorDetail?.warning || "Username already exists. Try a new one");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add User</h2>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          id="username"
          type="text"
          placeholder="username"
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="text"
          placeholder="password"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default UserForm;
