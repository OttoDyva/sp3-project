import { useState } from "react";
import { useNavigate } from "react-router-dom";
import facade from "../util/apiFacade";
import "../css/UserFormStyle.css";

const UserForm = ({ setUser }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formElement = evt.target;
    const form = new FormData(formElement);
    const obj = Object.fromEntries(form.entries());

    try {
      const createdUser = await facade.postUserData("/api/auth/register", obj);
      setUser((prevUser) => [...prevUser, createdUser]);

      setSuccessMessage("User has been created successfully! Redirecting to home page...");
      setErrorMessage(""); 

      
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      const errorDetail = await error.fullError;
      setErrorMessage(errorDetail?.warning || "Username already exists. Please choose another one.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="userFormStyle">
      <form onSubmit={handleSubmit}>
        <div className="title">
          <h1>Create Account</h1>
        </div>
        <p>Welcome to the BARS crew! Please create a unique username and choose a strong, secure password.</p>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          id="username"
          type="text"
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="password" 
        />
        <br />
        <button type="submit">Create</button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default UserForm;
