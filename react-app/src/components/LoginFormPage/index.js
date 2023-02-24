import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
// import * as sessionActions from '../../store/session';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUserClick = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login({ email:"demo@aa.io", password:"password" })).then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <>
      <h1 className='login-header'>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form-container">
        <ul  className='login-errors'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input className='login-information'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input className='login-information'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className='login-button' type="submit">Log In</button>
        <button className='login-button' onClick={demoUserClick}>demo-user</button>
      </form>
    </>
  );
}

export default LoginFormPage;
