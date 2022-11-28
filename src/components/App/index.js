import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "../Header";
import Landing from "../Landing";
import Footer from "../Footer";
import Welcome from "../Welcome";
import '../../App.css';
import Login from "../Login";
import Signup from "../SignUp";
import ErrorPage from "../ErrorPage";
import ForgetPassword from "../ForgetPassword";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="colored" />
      <Footer />
    </Router>

  );
}

export default App;
