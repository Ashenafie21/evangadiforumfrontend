import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../App";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Homepage.css";
import axios from "../axiosConfig";
function HomePage() {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useContext(AppState);
  const [errorMessage, setErrorMessage] = useState("");

  // console.log(user);
  // Use useEffect to redirect to login if user is not authenticated
useEffect(() => {
  if (!user || !user.consumerid) {
    console.log("Navigating to /login");
    navigate("/login");
  }
}, [user, navigate]);




  const handlePostQuestion = async () => {
    // Check if title and description are not empty
    if (!title.trim() || !description.trim()) {
      setErrorMessage("Title and description cannot be empty");
      console.log("Title and description cannot be empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        // Handle case when token is not available
        return;
      }

      // Make the POST request
      const response = await axios.post(
        "/questions/allquestions",
        { title, description, consumerid: user.consumerid },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Question posted successfully!");
      // Use the response data here if needed
      // const responseData = response.data;
      const insertedQuestionId = response.data.questionId;
      console.log(insertedQuestionId);
      // Store the questionId in localStorage
      localStorage.setItem("currentQuestionId", insertedQuestionId);

      // Update the navigation
      navigate(`/answer/${insertedQuestionId}`);
    } catch (error) {
      console.error("Error posting question:", error);
    }
  };

  return (
    <div className="pt-36 ">
      <h2 className="pl-16 text-blue-500">Welcome: {user.username}</h2>
      <div className="text-center">
        <h2 className="text-2xl py-2 pl-48"> Steps to write a good question</h2>
        <div className="text-center ">
          <li className="pl-2">Steps to write a good question</li>
          <li className="pl-24 ">
            Summarize your problem in a one-line title.
          </li>
          <li className="pl-14">Describe your problem in more detail.</li>
          <li className="pl-52 ">
            Describe what you tried and what you expected to happen.
          </li>
          <li className="pl-16">Review your question and post it to the</li>
        </div>
        <div className="text-center pb-3">
          <h2 className="text-2xl py-2  pt-28"> ask a public questoin</h2>
          <Link to={`/answer/${localStorage.getItem("currentQuestionId")}`}>
            <p>Go to Answer page</p>
          </Link>
        </div>
        <div className="flex flex-col space-y-4 mx-auto w-full max-w-[800px]">
          {" "}
          <input
            className="border w-full h-16 pl-3 rounded outline-none"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border rounded pl-3 pt-3 w-full h-32 outline-none"
            name=""
            id=""
            cols="10"
            rows="10"
            placeholder="Question description ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errorMessage && <p className="text-red-700">{errorMessage}</p>}
          <button
            onClick={handlePostQuestion}
            className="bg-blue-600 text-white rounded w-40 h-10  "
          >
            Post Your Question
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
