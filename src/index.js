import React from "react";
import ReactDOM from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PostAllCategory } from "./crawl";
import UserContextProvider from "./userSide/contexts/UserContext";
// Firebase imports moved to the top
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const root = ReactDOM.createRoot(document.getElementById("root"));

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuk2Pc_3Xh1K9CIJUx6S_E-rmQGRH_7gs",
  authDomain: "pharmacity-clone.firebaseapp.com",
  projectId: "pharmacity-clone",
  storageBucket: "pharmacity-clone.firebasestorage.app",
  messagingSenderId: "876543642305",
  appId: "1:876543642305:web:8460d7ee3ec2f34d77e240",
  measurementId: "G-D7NBP0X5WX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// PostAllCategory(); // Consider moving this to useEffect in App.js as suggested earlier

root.render(
  <GoogleOAuthProvider clientId="1016601245951-tp8smdbrt66f30ek72ig643v08r008l8.apps.googleusercontent.com">
    <UserContextProvider>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover={false}
          theme="dark"
        />
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </UserContextProvider>
  </GoogleOAuthProvider>
);
