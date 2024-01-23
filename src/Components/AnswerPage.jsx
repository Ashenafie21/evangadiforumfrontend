// import React, { useContext, useEffect, useState } from "react";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { AppState } from "../App";
// import axios from "../axiosConfig"; // Import axios

// function AnswerPage() {
//   const { user } = useContext(AppState);
//  const { questionId } = useParams();
//    const [answer, setAnswer] = useState("");
//   const navigate = useNavigate();
//   console.log("questionId:", questionId);

//   // Use useEffect to redirect to login if user is not authenticated
//   useEffect(() => {
//     if (!user || !user.consumerid) {
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   // Example code to fetch all answers
//   const fetchAllAnswers = async () => {
//     try {
//       const response = await axios.get("/answers/allanswer");
//       const answers = response.data; // Handle the list of answers
//       console.log(answers);
//     } catch (error) {
//       console.error("Error fetching answers:", error);
//     }
//   };

//  const postAnswer = async () => {
//    try {
//      const response = await axios.post(
//        `/answers/allanswer/post/${questionId}`,
//        {
//          consumerid: user.consumerid,
//          answer: answer,
//        },
//        {
//          headers: {
//            Authorization: `Bearer ${localStorage.getItem("token")}`,
//          },
//        }
//      );

//      // Update the navigation
//      navigate(`/answer/${questionId}`);
//    } catch (error) {
//      console.error("Error posting question:", error);
//    }
//  };

//   return (
//     <div className="pt-36 pl-32">
//       <div className="space-y-3">
//         <h1 className="text-2xl">Question</h1>
//         <h2 className="text-xl">question title post here</h2>
//         <h3>questins descreption post here</h3>
//       </div>
//       <div className="py-3">
//         <h1 className="text-2xl py-3 border-t border-b w-2/3 ">
//           Answer From The Community
//         </h1>
//       </div>
//       <div className="flex">
//         <div>
//           <AccountCircleIcon style={{ fontSize: 50 }} />
//           <p className="-mt-2 -ml-2"> {user.username} </p>
//         </div>
//         <p className="mt-5 pl-8"> </p>
//       </div>
//       <div className="text-center pt-32 space-y-3">
//         <h2 className="text-2xl">Answer The Top Question</h2>
//         <Link to="/homepage">
//           <p>Go to Question page</p>
//         </Link>
//         <textarea
//           className="border rounded pl-3 pt-3 w-[800px] h-32 outline-none"
//           name=""
//           id=""
//           cols="30"
//           rows="10"
//           placeholder="Your Answer"
//           value={answer}
//           onChange={(e) => setAnswer(e.target.value)}
//         ></textarea>
//       </div>
//       <div className="pl-[292px] pt-3">
//         <button
//           onClick={postAnswer}
//           className="bg-blue-600 text-white rounded w-40 h-10 "
//         >
//           Post answer Question
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AnswerPage;

// import React, { useContext, useEffect, useState } from "react";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { AppState } from "../App";
// import axios from "../axiosConfig";

// function AnswerPage() {
//   const { user } = useContext(AppState);
//   const { questionId } = useParams();
//   const [answer, setAnswer] = useState([]);
//   const [questionData, setQuestionData] = useState(null);

//   const navigate = useNavigate();
//   //   console.log("questionId:", questionId);

//   useEffect(() => {
//     if (!user || !user.consumerid) {
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   useEffect(() => {
//     // Retrieve questionId from localStorage
//     const storedQuestionId = localStorage.getItem("currentQuestionId");

//     // If questionId is retrieved, set it in the component state
//     if (storedQuestionId) {
//       // Use the stored questionId
//       fetchData(storedQuestionId);
//     } else if (questionId) {
//       // If questionId is available in URL params, set it in localStorage
//       localStorage.setItem("questionId", questionId);
//       // Fetch data based on questionId
//       fetchData(questionId);
//     }
//   }, [questionId]);

//   // fetch the quesion data
//   const fetchData = async (qid) => {
//     try {
//       if (!qid) {
//         console.error("QuestionId is undefined");
//         // Handle the case when questionId is undefined (redirect, show error, etc.)
//         return;
//       }

//       // Include headers for authorization
//       const headers = {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       };

//       // Fetch question data based on qid (use your API endpoint)
//       const questionResponse = await axios.get(`/questions/${qid}`, {
//         headers,
//       });
//       console.log("Question Data:", questionResponse.data);
//       //Log specific properties
//       const { questionData } = questionResponse.data;
//       setQuestionData(questionData);
//       console.log("Question ID:", questionData.questionid);
//       console.log("Consumer ID:", questionData.consumerid);
//       console.log("Title:", questionData.title);
//       console.log("Description:", questionData.description);

//       // Fetch answers based on qid (use your API endpoint)
//       const answersResponse = await axios.get(
//         `/answers/allanswer?questionId=${qid}`,
//         { headers }
//       );
//       //   console.log(answersResponse);
//        const fetchedAnswers = answersResponse.data;
//        setAnswer(fetchedAnswers);
//        console.log("Answers Data:", fetchedAnswers);
//              console.log(fetchedAnswers[0].answer);

//       // Set questionData in state after fetching
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   // post the answer
//   const postAnswer = async (e) => {
//     e.preventDefault();

//     // Check if questionData and questionData.questionid are available
//     if (questionData && questionData.questionid) {
//       try {
//         // Make the POST request to submit the answer
//         const response = await axios.post(
//           `/answers/post/${questionData.questionid}`,
//           {
//             consumerid: user.consumerid,
//             answer: answer.length > 0 ? answer[0].text : "",
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         // Log success message
//         console.log("Answer posted successfully");

//         fetchAnswers(questionData.questionid);
//         console.log();
//       } catch (error) {
//         console.error("Error posting answer:", error);
//       }
//     } else {
//       console.error(
//         "Error: questionData or questionData.questionid is undefined"
//       );
//     }
//   };

//   if (!questionId) {
//     // Handle the case when questionId is not available
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="pt-36 pl-32">
//       <div className="space-y-3">
//         <h1 className="text-2xl">Question</h1>
//         {questionData ? (
//           <>
//             <h2 className="text-xl">{questionData.title}</h2>
//             <h3>{questionData.description}</h3>
//           </>
//         ) : (
//           <div>Loading question...</div>
//         )}
//       </div>
//       <div className="py-3">
//         <h1 className="text-2xl py-3 border-t border-b w-2/3 ">
//           Answer From The Community
//         </h1>
//       </div>
//       {answer.map((ans, index) => (
//         <div key={ans.answerId || index} className="flex">
//           <div>
//             <AccountCircleIcon style={{ fontSize: 50 }} />
//             <p className="-mt-2 -ml-2"> {user.username} </p>
//           </div>
//           <p className="mt-5 pl-8"> {ans.answer} </p>
//         </div>
//       ))}

//       <form onSubmit={postAnswer}>
//         <div className="text-center pt-32 space-y-3">
//           <h2 className="text-2xl">Answer The Top Question</h2>
//           <Link to="/homepage">
//             <p>Go to Question page</p>
//           </Link>
//           <textarea
//             className="border rounded pl-3 pt-3 w-[800px] h-32 outline-none"
//             name=""
//             id=""
//             cols="30"
//             rows="10"
//             placeholder="Your Answer"
//             value={answer[0] ? answer[0].text : ""}
//             onChange={(e) => setAnswer([{ text: e.target.value }])}
//           ></textarea>
//         </div>
//         <div className="pl-[292px] pt-3">
//           <button className="bg-blue-600 text-white rounded w-40 h-10 ">
//             Post answer Question
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default AnswerPage;

// import React, { useContext, useEffect, useState } from "react";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { AppState } from "../App";
// import axios from "../axiosConfig";

// function AnswerPage() {
//   // Access user information from the global state
//   const { user } = useContext(AppState);
//   const { questionId } = useParams();
//   const [answer, setAnswer] = useState([]);
//   const [questionData, setQuestionData] = useState(null);
// const [loadingAnswers, setLoadingAnswers] = useState(false);

//   const navigate = useNavigate();
//   // console.log("questionId:", questionId);

//   // Check if user is logged in, if not, redirect to login page
//   useEffect(() => {
//     if (!user || !user.consumerid) {
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   // Fetch question data and answers when component mounts or questionId changes
//   useEffect(() => {
//     const storedQuestionId = localStorage.getItem("currentQuestionId");
//     // Log storedQuestionId to check if it's retrieved correctly
//     // console.log("Stored QuestionId:", storedQuestionId);

//     if (storedQuestionId) {
//       // Use the stored questionId
//       fetchQuestionAndAnswers(storedQuestionId);
//     } else if (questionId) {
//       // If questionId is available in URL params, set it in localStorage
//       localStorage.setItem("questionId", questionId);
//       // Fetch data based on questionId
//       fetchQuestionAndAnswers(questionId);
//     }
//   }, [questionId]);

//   // Fetch question data and answers from the server
//   const fetchQuestionAndAnswers = async (qid) => {
//     setLoadingAnswers(true);
//     //  console.log("fetchQuestionAndAnswers - qid:", qid);
//     try {
//       if (!qid) {
//         console.error("QuestionId is undefined");
//         return;
//       }

//       const headers = {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       };

//       // Fetch question data based on qid
//       const questionResponse = await axios.get(`/questions/${qid}`, {
//         headers,
//       });

//       // Extract and set question data in state
//       const { questionData } = questionResponse.data;
//       setQuestionData(questionData);

//       // Use the question's questionid to fetch answers
//       const questionId = questionData.questionid;
//       // console.log("fetchQuestionAndAnswers - questionId:", questionId);

//       const answersResponse = await axios.get(
//         `/answers/allanswer?questionId=${questionId}`,
//         { headers }
//       );

//       // Extract and set answers in state
//       const fetchedAnswers = answersResponse.data;
//       // console.log(fetchedAnswers);
//       setAnswer(fetchedAnswers);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoadingAnswers(false); // Reset loading state after fetching
//     }
//   };

//   // Post an answer to the server
//   const postAnswer = async (e) => {
//     e.preventDefault();

//     // Check if questionData and questionData.questionid are available
//     if (questionData && questionData.questionid) {
//       try {
//         // Make the POST request to submit the answer
//         const response = await axios.post(
//           `/answers/post/${questionData.questionid}`,
//           {
//             consumerid: user.consumerid,
//             answer: answer.length > 0 ? answer[0].text : "",
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         // Log success message
//         console.log("Answer posted successfully");
//         // Clear the textarea after posting
//         setAnswer([]);
//         // Fetch answers after posting
//         fetchQuestionAndAnswers(questionData.questionid);
//       } catch (error) {
//         console.error("Error posting answer:", error);
//       }
//     } else {
//       console.error(
//         "Error: questionData or questionData.questionid is undefined"
//       );
//     }
//   };

//   if (!questionId) {
//     // Handle the case when questionId is not available
//     return <div>Loading...</div>;
//   }

//   // Render the component with question, answers, and answer submission form
//   return (
//     <div className="pt-36 pl-32">
//       <div className="space-y-3">
//         <h1 className="text-2xl">Question</h1>
//         {questionData ? (
//           <>
//             <h2 className="text-xl">{questionData.title}</h2>
//             <h3>{questionData.description}</h3>
//           </>
//         ) : (
//           <div>Loading question...</div>
//         )}
//       </div>
//       <div className="py-3">
//         <h1 className="text-2xl py-3 border-t border-b w-2/3 ">
//           Answer From The Community
//         </h1>
//       </div>
//       {loadingAnswers ? (
//         <div>Loading answers...</div>
//       ) : (
//         answer.map((ans, index) => (
//           <div key={ans.answerId || index} className="flex">
//             <div>
//               <AccountCircleIcon style={{ fontSize: 50 }} />
//               <p className="-mt-2 -ml-2"> {user.username} </p>
//             </div>
//             <p className="mt-5 pl-8"> {ans.answer} </p>
//           </div>
//         ))
//       )}

//       <form onSubmit={postAnswer}>
//         <div className="text-center pt-32 space-y-3">
//           <h2 className="text-2xl">Answer The Top Question</h2>
//           <Link to="/homepage">
//             <p>Go to Question page</p>
//           </Link>
//           <textarea
//             className="border rounded pl-3 pt-3 w-[800px] h-32 outline-none"
//             name=""
//             id=""
//             cols="30"
//             rows="10"
//             placeholder="Your Answer"
//             value={answer[0] ? answer[0].text : ""}
//             onChange={(e) =>
//               setAnswer((prevAnswer) => [{ text: e.target.value }])
//             }
//           ></textarea>
//         </div>
//         <div className="pl-[292px] pt-3">
//           <button className="bg-blue-600 text-white rounded w-40 h-10 ">
//             Post answer Question
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default AnswerPage;


import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppState } from "../App";
import axios from "../axiosConfig";

function AnswerPage() {
  const { user } = useContext(AppState);
  const { questionId } = useParams();
  const [answer, setAnswer] = useState([]);
  const [questionData, setQuestionData] = useState(null);
  const [loadingAnswers, setLoadingAnswers] = useState(false);
  const [answerInput, setAnswerInput] = useState(""); // Track user input separately

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if user is not logged in and questionId is not available
    if ((!user || !user.consumerid) && !questionId) {
      navigate("/login");
    }
  }, [user, questionId, navigate]);


  useEffect(() => {
    const storedQuestionId = localStorage.getItem("currentQuestionId");

    if (storedQuestionId) {
      fetchQuestionAndAnswers(storedQuestionId);
    } else if (questionId) {
      localStorage.setItem("questionId", questionId);
      fetchQuestionAndAnswers(questionId);
    }
  }, [questionId]);

  const fetchQuestionAndAnswers = async (qid) => {
    setLoadingAnswers(true);
    try {
      if (!qid) {
        console.error("QuestionId is undefined");
        return;
      }

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

       const questionResponse = await axios.get(`/questions/${qid}`, {
         headers,
       });
      const { questionData } = questionResponse.data;
      setQuestionData(questionData);
      const questionId = questionData.questionid;

      const answersResponse = await axios.get(
        `/answers/allanswer?questionId=${questionId}`,
        { headers }
      );

      const fetchedAnswers = answersResponse.data;
      setAnswer(fetchedAnswers);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingAnswers(false);
    }
  };

  const postAnswer = async (e) => {
    e.preventDefault();

    if (questionData && questionData.questionid) {
      try {
        const response = await axios.post(
          `/answers/post/${questionData.questionid}`,
          {
            consumerid: user.consumerid,
            answer: answerInput, // Use the tracked user input
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Answer posted successfully");
        // Clear the textarea after posting
        setAnswerInput("");
        // Fetch answers after posting
        fetchQuestionAndAnswers(questionData.questionid);
      } catch (error) {
        console.error("Error posting answer:", error);
      }
    } else {
      console.error(
        "Error: questionData or questionData.questionid is undefined"
      );
    }
  };

  if (!questionId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-36 pl-32">
      <div className="space-y-3">
        <h1 className="text-2xl">Question</h1>
        {questionData ? (
          <>
            <h2 className="text-xl">{questionData.title}</h2>
            <h3>{questionData.description}</h3>
          </>
        ) : (
          <div>Loading question...</div>
        )}
      </div>
      <div className="py-3">
        <h1 className="text-2xl py-3 border-t border-b w-2/3 ">
          Answer From The Community
        </h1>
      </div>
      {loadingAnswers ? (
        <div>Loading answers...</div>
      ) : (
        answer.map((ans, index) => (
          <div key={ans.answerId || index} className="flex">
            <div>
              <AccountCircleIcon style={{ fontSize: 50 }} />
              <p className="-mt-2 -ml-2"> {user.username} </p>
            </div>
            <p className="mt-5 pl-8"> {ans.answer} </p>
          </div>
        ))
      )}

      <form onSubmit={postAnswer}>
        <div className="text-center pt-32 space-y-3">
          <h2 className="text-2xl">Answer The Top Question</h2>
          <Link to="/homepage">
            <p>Go to Question page</p>
          </Link>
          <textarea
            className="border rounded pl-3 pt-3 w-[800px] h-32 outline-none"
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Your Answer"
            value={answerInput} // Use the tracked user input
            onChange={(e) => setAnswerInput(e.target.value)} // Update tracked input
          ></textarea>
        </div>
        <div className="pl-[200px] pt-3">
          <button className="bg-blue-600 text-white rounded w-40 h-10 ">
            Post answer Question
          </button>
        </div>
      </form>
    </div>
  );
}

export default AnswerPage;
