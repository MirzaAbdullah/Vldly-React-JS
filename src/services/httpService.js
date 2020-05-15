import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

//Setting base URL for application
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

//Axios Interceptors
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An Unexpected error is occured");
  }

  return Promise.reject(error);
});

export function setJwt(jwt) {
  //Axios Common header
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
