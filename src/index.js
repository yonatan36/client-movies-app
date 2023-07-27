import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

/*axios*/
import axios from "axios";

/* redux */
import { Provider } from "react-redux";
import store from "./store/bigPie";

axios.defaults.baseURL = process.env.REACT_APP_API_URL + "/api";
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (config.url !== "https://hp-api.onrender.com/api/spells") {
      // Check if the request URL is not the specific URL that does not need the header
      config.headers["x-auth-token"] = token;
    }
  }
  return config; // send the new data
});

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
