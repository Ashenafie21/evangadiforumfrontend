import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://evangadiforumbackend-f5qn.onrender.com",
});

export default axiosBase;
