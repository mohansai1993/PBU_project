import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Footer from "./Components/Footer/Footer";
import AboutPage from "./Pages/AboutPage";
import SignUpPage from "./Pages/Auth/SignUpPage";
import LoginPage from "./Pages/Auth/LoginPage";
import FindCoach from "./Pages/FindCoach";
import BecomeCoach from "./Pages/BecomeCoach";
import CoachDetails from "./Pages/Auth/CoachDetails";
import PBUFeedPage from "./Pages/PBUFeedPage";
import ApplyBecomeCoach from "./Pages/ApplyBecomeCoach";
import CourtsPage from "./Pages/CourtsPage";
import FeedPage from "./Pages/FeedPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/find/coach" element={<FindCoach />} />
        <Route path="/coach/:id" element={<CoachDetails />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/courts" element={<CourtsPage />} />
        <Route path="/become/coach" element={<BecomeCoach />} />
        <Route path="/become/coach/apply" element={<ApplyBecomeCoach />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
