import axios from "axios";
axios.defaults.baseURL = ""; // set if using proxy in Vite; otherwise full backend URL
export default axios;
