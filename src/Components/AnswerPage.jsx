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

            const questionResponse = await axios.get(`/api/questions/${qid}`, {
                headers,
            });
            const { questionData } = questionResponse.data;
            setQuestionData(questionData);
            const questionId = questionData.questionid;

            const answersResponse = await axios.get(
                `/api/answers/allanswer?questionId=${questionId}`,
                { headers }
            );

            const fetchedAnswers = answersResponse.data;
            setAnswer(fetchedAnswers);
            console.log(fetchedAnswers);
        } catch (error) {
            console.error("Error fetching answers:", error);
        } finally {
            setLoadingAnswers(false);
        }
    };

    const postAnswer = async (e) => {
        e.preventDefault();

        if (questionData && questionData.questionid) {
            try {
                const response = await axios.post(
                    `/api/answers/post/${questionData.questionid}`,
                    {
                        consumerid: user.consumerid,
                        answer: answerInput, // Use the tracked user input
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );

                console.log("Answer posted successfully");
                // Clear the textarea after posting
                setAnswerInput("");
                // Fetch answers after posting
                fetchQuestionAndAnswers(questionData.questionid);
            } catch (error) {
                console.error("Error posting data:", error);
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
                    <div
                        key={ans.answerId || index}
                        className="text-center flex"
                    >
                        <div>
                            <AccountCircleIcon style={{ fontSize: 50 }} />
                            <p className=""> {user.username} </p>
                        </div>
                        <p className="mt-5 pl-8"> {ans.answer} </p>
                    </div>
                ))
            )}

            <form
                onSubmit={postAnswer}
                className="flex flex-col items-center pt-32 space-y-3"
            >
                <h2 className="text-2xl">Answer The Top Question</h2>
                <Link to="/homepage">
                    <p>Go to Question page</p>
                </Link>
                <div className="flex flex-col items-center">
                    <textarea
                        className="border rounded pl-3 pt-3 w-[800px] h-32 outline-none mb-3"
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        placeholder="Your Answer"
                        value={answerInput}
                        onChange={(e) => setAnswerInput(e.target.value)}
                    ></textarea>
                    <div className="text-left w-full">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white rounded w-60 h-10 mx-3"
                        >
                            Post Your answer to Question
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AnswerPage;
