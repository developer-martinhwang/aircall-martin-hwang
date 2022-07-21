import axios from "axios";

export default axios.create({
  baseURL: "https://aircall-job.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});