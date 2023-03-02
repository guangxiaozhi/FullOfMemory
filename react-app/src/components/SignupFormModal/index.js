import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		const regex = new RegExp('.+@.+\\..+')
		const isvalidEmail = regex.test(email)
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (! isvalidEmail){
				setErrors(["Please enter a valid email address"])
			}else if (username.length < 4 || username.length > 60){
				setErrors(["Username must be between 4 and 60 characters"])
			}else{
				closeModal();
			}
		} else{
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-container">
			<h1 className="signup-header">Sign Up</h1>
			<form onSubmit={handleSubmit} className="signup-form-container">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx} className="signup-error">{error}</li>
					))}
				</ul>
				<label className="sign-up-information">
					<span>Email:</span>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className="sign-up-information">
					<span>Username:</span>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label className="sign-up-information">
					<span>Password:</span>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label className="sign-up-information">
					<span>Confirm Password:</span>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button className="sign-up-button" type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
