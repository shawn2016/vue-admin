import axios from "axios";
import qs from "qs";
import baseURL from "./baseUrl";
axios.defaults.baseURL = process.env.BASE_API || baseURL;
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.interceptors.request.use(config => {
  // loading
  // console.log("请求拦截", config);
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response.data;
}, error => {
  return Promise.resolve(error.response);
});

export default function fetch({
  url = "",
  method = "GET",
  data
}) {
  return axios({
    method,
    url,
    data,
    timeout: 10000
  }).then(
    (res) => {
      return res;
    }
  ).then(
    (res) => {
      return res;
    }
  );
}
