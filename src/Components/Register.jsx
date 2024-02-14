import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import About from "./About";

function Register() {
  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  const [hasEmptyFields, setHasEmptyFields] = useState(false);

    async function handleSubmit(e) {
      e.preventDefault();
      const usernameValue = userNameDom.current.value.trim();
      const firstnameValue = firstNameDom.current.value.trim();
      const lastnameValue = lastNameDom.current.value.trim();
      const emailValue = emailDom.current.value.trim();
      const passwordValue = passwordDom.current.value.trim();

      const emptyFields =
        !usernameValue ||
        !firstnameValue ||
        !lastnameValue ||
        !emailValue ||
        !passwordValue;

      setHasEmptyFields(emptyFields);

      if (!emptyFields) {
        try {
          await axios.post("/api/consumers/register", {
            username: usernameValue,
            firstname: firstnameValue,
            lastname: lastnameValue,
            email: emailValue,
            password: passwordValue,
          });

          alert("Registered successfully");
          navigate("/login");
        } catch (error) {
          console.log(error.response);
          alert(error.response.data.msg);
        }
      }
    }

  return (
    <div
      className=" bg-cover bg-no-repeat translate-y-[121px] bg-gray-200 "
      style={{ backgroundImage: "url(/images/bg-svg-f.svg)" }}
    >
      <div className="md:flex md:h-[800px] justify-center">
        <div className=" mx-10  translate-y-8  md:ml-64 ">
          <div
            className="inset-0 flex flex-col items-center justify-center  transform rounded bg-white shadow-2xl h-[600px] md:px-16 space-y-2 "
          >
            <h1 className="text-xl  font-bold"> Join the network </h1>
            <p>
              Already have an account?
              <Link to="/login">
                <span className="text-orange-500 cursor-pointer">Sign in</span>
              </Link>
            </p>
            <form onSubmit={handleSubmit} 
            className="space-y-3">
              <div className="input-container">
                <input
                  ref={userNameDom}
                  className={`border w-96 h-14 pl-3 outline-none ${
                    hasEmptyFields && passwordDom.current.value.trim() === ""
                      ? "bg-pink-100"
                      : ""
                  }`}
                  type="text"
                  placeholder="username"
                  name="username"
                  onBlur={() => setHasEmptyFields(false)}
                />
              </div>
              <div className="input-container">
                <input
                  ref={firstNameDom}
                  className={`border w-96 h-14 pl-3 outline-none ${
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
                  className={`border w-96 h-14 pl-3 outline-none ${
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
                  className={`border w-96 h-14 pl-3 outline-none ${
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
                  className={`border w-96 h-14 pl-3 outline-none ${
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
              <button className="bg-blue-600 hover:bg-orange-500 text-white w-96 h-14 text-xl rounded">
                Agree and Join
              </button>
            </form>
            <Link to="/login">
              <p className="text-orange-500 cursor-pointer ">
                Already have an account?
              </p>
            </Link>
          </div>
        </div>
        <About />
      </div>
    </div>
  );
}

export default Register;
