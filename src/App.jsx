import { useContext, useState } from "react";
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
import PBUFeedPage from "./Pages/CoachProfile/PBUFeedPage";
import ApplyBecomeCoach from "./Pages/ApplyBecomeCoach";
import CourtsPage from "./Pages/CourtsPage";
import FeedPage from "./Pages/FeedPage";
import UserProfile from "./Pages/UserProfile";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import Success from "./Pages/Checkout/Success";
import Cancel from "./Pages/Checkout/Cancel";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsConditions from "./Pages/Terms";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/find/coach" element={<FindCoach />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/courts" element={<CourtsPage />} />
        <Route path="/become/coach" element={<BecomeCoach />} />
        {!currentUser && (
          <Route path="/become/coach/apply" element={<ApplyBecomeCoach />} />
        )}
        <Route path="/coach/:id" element={<CoachDetails />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile">
            {/* <Route path=":id" element={<PBUFeedPage />} /> */}

            <Route path="athlete/:id" element={<UserProfile />} />
            <Route path="coach/:id" element={<PBUFeedPage />} />
          </Route>
        </Route>
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route
          path="*"
          element={
            <>
              <div>404 Page</div>
            </>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
