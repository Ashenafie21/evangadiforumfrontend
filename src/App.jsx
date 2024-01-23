import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import axios from "./axiosConfig";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Register from "./Components/Register";
import HomePage from "./Components/HomePage";
import AnswerPage from "./Components/AnswerPage";

// context api
export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
// console.log(token);
  async function checkUser() {
    try {
      const { data } = await axios.get("consumers/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response.data.msg);
      navigate("/login");
    }
  }

 useEffect(() => {
   if (token) {
     checkUser();
   }
 }, [token, navigate]);

  // Use useEffect to listen for changes in the user state
  useEffect(() => {
    // If user is logged in and not on the homepage, redirect to homepage
    if (
      user.username &&
      window.location.pathname !== "/homepage" &&
      !window.location.pathname.startsWith("/answer")
    ) {
      navigate("/homepage");
    }
  }, [user, navigate]);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/answer" element={<AnswerPage />} />
          <Route path="/answer/:questionId" element={<AnswerPage />} />
        </Routes>
      </>
    </AppState.Provider>
  );
}

export default App;
