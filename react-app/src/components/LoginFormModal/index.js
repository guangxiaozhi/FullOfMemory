import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    // console.log("login form modal data", data)
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const demoUserClick = async (e) => {
    e.preventDefault();
    setErrors([]);
    // dispatch(login("demo@aa.io", "password" )).then(closeModal)
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   });
    const data = await dispatch(login("demo@aa.io", "password" ));
    // console.log("demo login form modal data", data)
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  }

  return (
    <div className="login-container">
      <h1  className='login-header'>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form-container">
        <ul  className='login-errors'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className='login-information'>
          <span>Email:</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className='login-information'>
          <span>Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className='login-button' type="submit">Log In</button>
        <button className='login-button' onClick={demoUserClick}>demo-user</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
