import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmailLoginPage from "./pages/EmailLoginPage"; // Adjust the path as needed
import QuizPage from "./pages/QuizPage";
import ReportPage from "./pages/ReportPage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the EmailLoginPage */}
        <Route path="/" element={<EmailLoginPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user/quiz" element={<QuizPage />} />
        <Route path="/user/report" element={<ReportPage />} />
      </Routes>
    </Router>
  );
};

export default App;
