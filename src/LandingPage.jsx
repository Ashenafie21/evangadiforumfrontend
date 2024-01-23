import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import "./HomePage.css";
function HomePage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [hasEmptyFields, setHasEmptyFields] = useState(false);
  const [loginHasEmptyFields, setLoginHasEmptyFields] = useState(false);
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const firstnameValue = firstNameDom.current.value;
    const lastnameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    setHasEmptyFields(
      !usernameValue ||
        !firstnameValue ||
        !lastnameValue ||
        !emailValue ||
        !passwordValue
    );
    if (!hasEmptyFields) {
      try {
        await axios.post("/consumers/register", {
          username: usernameValue,
          firstname: firstnameValue,
          lastname: lastnameValue,
          email: emailValue,
          password: passwordValue,
        });
        alert("registered successfully");
        setShowCreateAccount(false);
        setShowLogin(true);
      } catch (error) {
        // alert("something went error. Please try later ");
        console.log(error.response);
      }
    }
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setLoginHasEmptyFields(!email || password.trim() === "");
    if (!loginHasEmptyFields) {
      try {
        await axios.post("/consumers/login", {
          email,
          password,
        });
        alert("login successful. Please login");
        navigate("/landingpage");
      } catch (error) {
        // alert("Something went wrong");
        console.log(error.response);
      }
    }
  }

  const handleCreateAccount = () => {
    setShowLogin(false);
    setShowCreateAccount(true);
    setShowResetPassword(false);
  };

  const handleForgotPassword = () => {
    setShowLogin(false);
    setShowCreateAccount(false);
    setShowResetPassword(true);
  };
  const handleSingIN = () => {
    setShowLogin(true);
    setShowCreateAccount(false);
    setShowResetPassword(false);
  };

  const handleSignInClick = () => {
    // Show the login component
    setShowLogin(true);
    setShowCreateAccount(false);
    setShowResetPassword(false);
    // Pass the sign-in function to Header
    onSignIn();
  };
  return (
    <div
      className=" bg-cover bg-no-repeat translate-y-[121px] bg-gray-200 "
      style={{ backgroundImage: "url(/images/bg-svg-f.svg)" }}
    >
      <div className="md:flex h-[1100px] md:h-[800px] justify-center">
        <div className=" mx-6  translate-y-8  md:mt-24 ">
          {showLogin && (
            <div
              className={`transform flex flex-col items-center justify-center space-y-4 rounded bg-white shadow-2xl  h-[600px] md:px-28 transition-opacity
              
              ${showLogin ? "opacity-100" : "opacity-0"}`}
            >
              <h1 className="text-xl font-bold -mt-32">
                Login to your account
              </h1>
              <p>
                Don't have your account?
                <span
                  className="text-orange-500 cursor-pointer"
                  onClick={handleCreateAccount}
                >
                  {" "}
                  Create a new account
                </span>
              </p>
              <form onSubmit={handleLoginSubmit}>
                <div className="input-container">
                  <input
                    ref={emailRef}
                    className={`border w-96 h-16 pl-3 outline-none ${
                      loginHasEmptyFields &&
                      emailRef.current.value.trim() === ""
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
                    className={`border w-96 h-16 pl-3 outline-none ${
                      loginHasEmptyFields &&
                      passwordRef.current.value.trim() === ""
                        ? "bg-pink-100"
                        : ""
                    }`}
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <p
                  className="pl-64 text-orange-500 cursor-pointer"
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
              className={`inset-0 flex flex-col pl-5 justify-center space-y-4 transform rounded bg-white shadow-2xl h-[600px] md:px-28 transition-opacity ${
                showResetPassword ? "opacity-100" : "opacity-0"
              }`}
            >
              <h1 className="text-2xl">Reset your password</h1>
              <p className="ml-2">
                Fill in your e-mail address below and we will send you an email
                with further instructions.
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
              <p
                className=" text-orange-500 cursor-pointer"
                onClick={handleCreateAccount}
              >
                Don't have an account?
              </p>
            </div>
          )}
          {showCreateAccount && (
            <div
              className={`inset-0 flex flex-col items-center justify-center space-y-2 transform rounded bg-white shadow-2xl h-[600px] md:px-28 transition-opacity ${
                showCreateAccount ? "opacity-100" : "opacity-0"
              }`}
            >
              <h1 className="text-xl  font-bold"> Join the network </h1>
              <p>
                Already have an account?
                <span
                  className="text-orange-500 cursor-pointer"
                  onClick={handleSingIN}
                >
                  {" "}
                  Sign in
                </span>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <input
                    ref={userNameDom}
                    className={`border w-96 h-16 pl-3 outline-none ${
                      hasEmptyFields && passwordDom.current.value.trim() === ""
                        ? "bg-pink-100"
                        : ""
                    }`}
                    type="text"
                    placeholder="username"
                    name="username"
                  />
                </div>
                <div className="input-container">
                  <input
                    ref={firstNameDom}
                    className={`border w-96 h-16 pl-3 outline-none ${
                      hasEmptyFields && passwordDom.current.value.trim() === ""
                        ? "bg-pink-100"
                        : ""
                    }`}
                    type="text"
                    placeholder="First name"
                    name="firstname"
                  />
                </div>
                <div className="input-container">
                  <input
                    ref={lastNameDom}
                    className={`border w-96 h-16 pl-3 outline-none ${
                      hasEmptyFields && passwordDom.current.value.trim() === ""
                        ? "bg-pink-100"
                        : ""
                    }`}
                    type="text"
                    placeholder="Last name"
                    name="lastname"
                  />
                </div>
                <div className="input-container">
                  <input
                    ref={emailDom}
                    className={`border w-96 h-16 pl-3 outline-none ${
                      hasEmptyFields && passwordDom.current.value.trim() === ""
                        ? "bg-pink-100"
                        : ""
                    }`}
                    type="email"
                    placeholder="Email address"
                    name="email"
                  />
                </div>
                <div className="input-container ">
                  <input
                    ref={passwordDom}
                    className={`border w-96 h-16 pl-3 outline-none ${
                      hasEmptyFields && passwordDom.current.value.trim() === ""
                        ? "bg-pink-100"
                        : ""
                    }`}
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </div>

                <p>
                  I agree to the
                  <span className="text-orange-500"> privacy policy </span> and
                  <span className="text-orange-500"> terms of service</span>
                </p>
                <button
                  // onClick={handleRegistration}
                  className="bg-blue-600 hover:bg-orange-500 text-white w-96 h-14 text-xl rounded"
                >
                  Agree and Join
                </button>
              </form>
              <p
                className="text-orange-500 cursor-pointer "
                onClick={handleSingIN}
              >
                Already have an account?
              </p>
            </div>
          )}
        </div>
        <div className="px-10 md:max-h-[600px] space-y-4 items-center py-16 mt-16 max-w-[1200px] md:mt-48 ">
          <p className="text-orange-500">About</p>
          <h1 className="text-xl font-bold">Evangadi Networks</h1>
          <p>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>
          <p>
            Wheather you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <button className="bg-orange-500 text-white font-bold p-3">
            How It Works
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

// using useState hook

// import React, { useEffect, useState, useRef } from "react";
// import axios from "../axiosConfig";
// import "./HomePage.css";

// function HomePage() {
//   const [showLogin, setShowLogin] = useState(true);
//   const [showCreateAccount, setShowCreateAccount] = useState(false);
//   const [showResetPassword, setShowResetPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     username: "",
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleRegistration = async () => {
//     try {
//       const response = await axios.post("/consumers/register", formData);

//       console.log(response.data); // Handle the response from the server
//     } catch (error) {
//       console.error( error.response);
//     }
//   };

//   const handleCreateAccount = () => {
//     setShowLogin(false);
//     setShowCreateAccount(true);
//     setShowResetPassword(false);
//   };

//   const handleForgotPassword = () => {
//     setShowLogin(false);
//     setShowCreateAccount(false);
//     setShowResetPassword(true);
//   };
//   const handleSingIN = () => {
//     setShowLogin(true);
//     setShowCreateAccount(false);
//     setShowResetPassword(false);
//   };

//   return (
//     <div
//       className=" bg-cover bg-no-repeat translate-y-[121px] bg-gray-200 "
//       style={{ backgroundImage: "url(/images/bg-svg-f.svg)" }}
//     >
//       <div className="md:flex h-[1100px] md:h-[800px] justify-center">
//         <div className=" mx-6  translate-y-8  md:mt-24 ">
//           {showLogin && (
//             <div
//               className={`transform flex flex-col items-center justify-center space-y-4 rounded bg-white shadow-2xl  h-[600px] md:px-28 transition-opacity

//               ${showLogin ? "opacity-100" : "opacity-0"}`}
//             >
//               <h1 className="text-xl font-bold -mt-32">
//                 Login to your account
//               </h1>
//               <p>
//                 Don't have your account?
//                 <span
//                   className="text-orange-500 cursor-pointer"
//                   onClick={handleCreateAccount}
//                 >
//                   {" "}
//                   Create a new account
//                 </span>
//               </p>
//               <div className="input-container">
//                 <input
//                   className="border w-96 h-16 pl-3 outline-none"
//                   type="text"
//                   placeholder="Email address"
//                 />
//               </div>
//               <div className="input-container ">
//                 <input
//                   className="border w-96 h-16 pl-3 outline-none"
//                   type="password"
//                   placeholder="Password"
//                 />
//               </div>
//               <p
//                 className="pl-64 text-orange-500 cursor-pointer"
//                 onClick={handleForgotPassword}
//               >
//                 Forgot password
//               </p>
//               <button className="bg-blue-600 text-white w-96 h-14 text-xl rounded">
//                 Login
//               </button>
//             </div>
//           )}
//           {showResetPassword && (
//             <div
//               className={`inset-0 flex flex-col pl-5 justify-center space-y-4 transform rounded bg-white shadow-2xl h-[600px] md:px-28 transition-opacity ${
//                 showResetPassword ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               <h1 className="text-2xl">Reset your password</h1>
//               <p className="ml-2">
//                 Fill in your e-mail address below and we will send you an email
//                 with further instructions.
//               </p>
//               <input
//                 className="border w-96 h-16 pl-3 outline-none"
//                 type="text"
//                 placeholder="Email address"
//               />
//               <button className="bg-blue-600 text-white w-96 h-14 text-xl rounded">
//                 Reset yout password
//               </button>
//               <p
//                 className=" text-orange-500 cursor-pointer"
//                 onClick={handleSingIN}
//               >
//                 Already have an account?
//               </p>
//               <p
//                 className=" text-orange-500 cursor-pointer"
//                 onClick={handleCreateAccount}
//               >
//                 Don't have an account?
//               </p>
//             </div>
//           )}
//           {showCreateAccount && (
//             <div
//               className={`inset-0 flex flex-col items-center justify-center space-y-2 transform rounded bg-white shadow-2xl h-[600px] md:px-28 transition-opacity ${
//                 showCreateAccount ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               <h1 className="text-xl  font-bold"> Join the network </h1>
//               <p>
//                 Already have an account?
//                 <span
//                   className="text-orange-500 cursor-pointer"
//                   onClick={handleSingIN}
//                 >
//                   {" "}
//                   Sign in
//                 </span>
//               </p>
//               <form>
//                 <div className="input-container">
//                   <input
//                     className="border w-96 h-16 pl-3 outline-none"
//                     type="text"
//                     placeholder="username"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="input-container">
//                   <input
//                     className="border w-96 h-16 pl-3 outline-none"
//                     type="text"
//                     placeholder="First name"
//                     name="firstname"
//                     value={formData.firstname}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="input-container">
//                   <input
//                     className="border w-96 h-16 pl-3 outline-none"
//                     type="text"
//                     placeholder="Last name"
//                     name="lastname"
//                     value={formData.lastname}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="input-container">
//                   <input
//                     className="border w-96 h-16 pl-3 outline-none"
//                     type="text"
//                     placeholder="Email address"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="input-container ">
//                   <input
//                     className="border w-96 h-16 pl-3 outline-none"
//                     type="password"
//                     placeholder="Password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <p>
//                   I agree to the
//                   <span className="text-orange-500"> privacy policy </span> and
//                   <span className="text-orange-500"> terms of service</span>
//                 </p>
//                 <button
//                   onClick={handleRegistration}
//                   className="bg-blue-600 hover:bg-orange-500 text-white w-96 h-14 text-xl rounded"
//                 >
//                   Agree and Join
//                 </button>
//               </form>
//               <p
//                 className="text-orange-500 cursor-pointer "
//                 onClick={handleSingIN}
//               >
//                 Already have an account?
//               </p>
//             </div>
//           )}
//         </div>
//         <div className="px-10 md:max-h-[600px] space-y-4 items-center py-16 mt-16 max-w-[1200px] md:mt-48 ">
//           <p className="text-orange-500">About</p>
//           <h1 className="text-xl font-bold">Evangadi Networks</h1>
//           <p>
//             No matter what stage of life you are in, whether you’re just
//             starting elementary school or being promoted to CEO of a Fortune 500
//             company, you have much to offer to those who are trying to follow in
//             your footsteps.
//           </p>
//           <p>
//             Wheather you are willing to share your knowledge or you are just
//             looking to meet mentors of your own, please start by joining the
//             network here.
//           </p>
//           <button className="bg-orange-500 text-white font-bold p-3">
//             How It Works
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;
