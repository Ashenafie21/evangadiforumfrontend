import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import About from "./About";
function Login() {
    const [loginHasEmptyFields, setLoginHasEmptyFields] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [error, setError] = useState("");
    const handleInputChange = () => {
        // Check if both email and password are not empty, update state accordingly
        const emailNotEmpty = emailRef.current.value.trim() !== "";
        const passwordNotEmpty = passwordRef.current.value.trim() !== "";
        setLoginHasEmptyFields(emailNotEmpty && passwordNotEmpty);
    };

    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleLoginSubmit(e) {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        setLoginHasEmptyFields(!email || password.trim() === "");
        if (!loginHasEmptyFields) {
            try {
                const { data } = await axios.post("/api/consumers/login", {
                    email,
                    password,
                });
                console.log("Login successful");
                localStorage.setItem("token", data.token);
                // Log the navigation path
                setLoginSuccessful(true);
            } catch (error) {
                setError(error?.response?.data?.msg);
                console.log(error.response);
            }
        }
    }
    // Use useEffect for navigation
    useEffect(() => {
        if (loginSuccessful) {
            navigate("/homepage");
        }
    }, [loginSuccessful, navigate]);

    const handleSingIN = () => {
        setShowLogin(true);
        setShowResetPassword(false);
    };

    const handleForgotPassword = () => {
        setShowLogin(false);
        setShowResetPassword(true);
    };
    return (
        <div>
            <div
                className=" bg-cover bg-no-repeat translate-y-[121px] bg-gray-200 "
                style={{ backgroundImage: "url(/images/bg-svg-f.svg)" }}
            >
                <div className="md:flex  md:h-[800px] justify-center">
                    <div className=" mx-10 md:ml-64 translate-y-8   ">
                        {showLogin && (
                            <div
                                className={`transform flex flex-col items-center justify-center space-y-4 rounded bg-white shadow-2xl  h-[600px] md:px-16 `}
                            >
                                <h1 className="text-xl font-bold -mt-32">
                                    Login to your account
                                </h1>
                                <p>
                                    Don't have your account?
                                    <Link to="/register">
                                        <span className="text-orange-500 cursor-pointer">
                                            Create a new account
                                        </span>
                                    </Link>
                                </p>
                                <form onSubmit={handleLoginSubmit}>
                                    <div className="input-container pb-5">
                                        <input
                                            ref={emailRef}
                                            onChange={handleInputChange}
                                            className={`border w-96 h-16 pl-3 outline-none ${
                                                loginHasEmptyFields &&
                                                passwordRef.current.value.trim() ===
                                                    ""
                                                    ? "bg-pink-100"
                                                    : ""
                                            }`}
                                            type="email"
                                            placeholder="Email address"
                                        />
                                    </div>
                                    <div className="input-container ">
                                        <input
                                            ref={passwordRef}
                                            onChange={handleInputChange}
                                            className={`border w-96 h-16 pl-3 outline-none ${
                                                loginHasEmptyFields &&
                                                passwordRef.current.value.trim() ===
                                                    ""
                                                    ? "bg-pink-100"
                                                    : ""
                                            }`}
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </div>
                                    {error && (
                                        <p className="text-red-500 text-sm mt-2">
                                            {error}
                                        </p>
                                    )}

                                   

                                    <p
                                        className="pl-64 text-orange-500 cursor-pointer py-3"
                                        onClick={handleForgotPassword}
                                    >
                                        Forgot password
                                    </p>
                                    <button className="bg-blue-600 text-white w-96 h-14 text-xl rounded">
                                        Login
                                    </button>
                                </form>
                            </div>
                        )}
                        {showResetPassword && (
                            <div
                                className={`inset-0 flex flex-col pl-5 justify-center space-y-4 transform rounded bg-white shadow-2xl h-[600px]  transition-opacity ${
                                    showResetPassword
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}
                            >
                                <h1 className="text-2xl">
                                    Reset your password
                                </h1>
                                <p className="ml-2">
                                    Fill in your e-mail address below and we
                                    will send you an email with further
                                    instructions.
                                </p>
                                <input
                                    className="border w-96 h-16 pl-3 outline-none"
                                    type="email"
                                    placeholder="Email address"
                                />
                                <button className="bg-blue-600 text-white w-96 h-14 text-xl rounded">
                                    Reset yout password
                                </button>
                                <p
                                    className=" text-orange-500 cursor-pointer"
                                    onClick={handleSingIN}
                                >
                                    Already have an account?
                                </p>
                                <Link to="/register">
                                    <p className=" text-orange-500 cursor-pointer">
                                        Don't have an account?
                                    </p>
                                </Link>
                            </div>
                        )}
                    </div>
                    <About />
                </div>
            </div>
        </div>
    );
}

export default Login;
