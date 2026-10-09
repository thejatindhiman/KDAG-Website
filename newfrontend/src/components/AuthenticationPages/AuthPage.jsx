import React, { useState, useContext } from "react";
import Fade from "../Common/Motion/fade.jsx"
import { useHistory } from "react-router-dom";
import Particless from "../Common/Particles/Particless";
import google_logo from "../../assets/pics/google_logo.png";
import { AuthContext } from "../../context/AuthContext";
import "./AuthPage.css";

const AuthPage = () => {
	const particless = React.useMemo(() => <Particless />, []);
	const { isLoggedIn } = useContext(AuthContext);
	const history = useHistory();
	const [isSignUpActive, setIsSignUpActive] = useState(false);
	const [rDirect, setRDirect] = useState(false);
	const [showUsermessage, setShowUsermessage] = useState(false);
	const [userMessage, setUserMessage] = useState("");

	const token = localStorage.getItem("access_token");

	if (showUsermessage) {
		setTimeout(() => {
			setShowUsermessage(false);
		}, 25000);
	}

	const toggleForm = () => {
		setIsSignUpActive((prev) => !prev);
	};

	const submitRegister = async (e) => {
		e.preventDefault();
	};

	const submitLogin = async (e) => {
		e.preventDefault();
	};

	if (rDirect) {
		history.push("/ml_sheet");
	}

	if (isLoggedIn) {
		history.push("/ml_sheet");
	}

	// ✅ FIXED: All three now use import.meta.env
	const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
	const apiUrl = import.meta.env.VITE_API_URL;
	const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

	function handleGoogleAuth() {
		const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&access_type=offline&scope=email%20profile%20openid&prompt=consent`;
		window.location.href = googleAuthUrl;
	}

	return (
		<>
			<Fade left>
				{!isLoggedIn && (
					<div className="pt-[160px] pb-[120px] flex items-center justify-center max-[420px]:pt-[100px] max-[420px]:pb-[80px]">
						{showUsermessage && (
							<div className={`border-2 border-red-500 text-[rgb(255,161,161)] p-[10px] absolute top-[105px] text-[18px] font-bold z-[9999999] rounded-[25px] bg-[rgba(255,0,0,0.096)] backdrop-blur-[5px] max-[420px]:p-[8px] max-[420px]:top-[95px] max-[420px]:text-[15px] max-[420px]:rounded-[25px] max-[420px]:bg-[rgba(255,0,0,0.2)] max-[420px]:backdrop-blur-[10px]`}>{userMessage}</div>
						)}

						<div className={`auth-container ${isSignUpActive ? "active" : ""}`}>
							<div className="form-container sign-up">
								<form onSubmit={submitRegister}>
									<>
										<h1>Create Account</h1>
										<button className="GoogleSignup" onClick={handleGoogleAuth}>
											<img src={google_logo} alt="google_logo" />
											<p>Register</p>
										</button>
									</>
								</form>
							</div>
							<div className="form-container sign-in">
								<form onSubmit={submitLogin}>
									<h1>Login with Google</h1>
									<>
										<button className="GoogleSignup" onClick={handleGoogleAuth}>
											<img src={google_logo} alt="google_logo" />
											<p>Sign In</p>
										</button>
									</>
								</form>
							</div>
							<div className="toggle-container">
								<div className={`toggle ${isSignUpActive ? "active" : ""}`}>
									<div className="toggle-panel toggle-left">
										<h1>Welcome Back!</h1>
										<p>
											Sign in to unlock access to your account and explore all
											the features our website has to offer.
										</p>
										<button
											className="hidden"
											onClick={toggleForm}
										>
											Sign In
										</button>
									</div>
									<div className="toggle-panel toggle-right">
										<h1>Hello, Friend!</h1>
										<p>
											It looks like you haven't registered yet. Register now to
											unlock access to all of the site's features.
										</p>
										<button
											className="hidden"
											onClick={toggleForm}
										>
											Sign Up
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</Fade>
			{particless}
		</>
	);
};

export default AuthPage;