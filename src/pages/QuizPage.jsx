import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OverviewPanel from "./components/OverviewPanel";
import Question from "./components/Question";
import results from "../api/questions.json";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isTimeUp, setIsTimeUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load and format questions from your JSON
    const loadQuestions = () => {
      const formattedQuestions = results.map((q, index) => ({
        ...q,
        id: index + 1,
      }));
      setQuestions(formattedQuestions);
    };
    loadQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          setModalMessage("Oops! Time ended. Go to the report page.");
          setShowModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (id, answer) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestion]: answer }));
  };

  const handleSubmit = () => {
    navigate("/user/report", { state: { questions, userAnswers } });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(questions.length - 1, prev + 1));
  };

  const handleClearAnswer = () => {
    setUserAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestion];
      return newAnswers;
    });
  };

  const handleShowSubmitModal = () => {
    setModalMessage("Are you sure you want to submit the quiz?");
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    handleSubmit();
  };

  const handleModalCancel = () => {
    setShowModal(false);
    if (isTimeUp) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <p className="text-gray-800 text-lg mb-4">{modalMessage}</p>
            <div className="flex justify-end space-x-4">
              {!isTimeUp && (
                <button
                  onClick={handleModalCancel}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
                >
                  No
                </button>
              )}
              <button
                onClick={handleModalConfirm}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                {isTimeUp ? "Go to Report" : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="px-6 py-4 bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Knowledge Quiz</h1>
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 bg-gray-700 rounded-lg">
              <span className="text-gray-400 mr-2">Time Remaining:</span>
              <span className="text-white font-mono">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow overflow-hidden">
        <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-6">
            <OverviewPanel
              questions={questions}
              userAnswers={userAnswers}
              setCurrentQuestion={setCurrentQuestion}
              currentQuestionIndex={currentQuestion}
            />
          </div>
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-8">
            {questions[currentQuestion] && (
              <>
                <Question
                  question={questions[currentQuestion]}
                  onAnswer={handleAnswer}
                  selectedAnswer={userAnswers[currentQuestion]}
                />
                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleClearAnswer}
                    disabled={!userAnswers[currentQuestion]}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Clear Answer
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentQuestion === questions.length - 1}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            {Object.keys(userAnswers).length} of {questions.length} questions
            answered
          </div>
          <button
            onClick={handleShowSubmitModal}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-150"
          >
            Submit Quiz
          </button>
        </div>
      </footer>
    </div>
  );
};

export default QuizPage;
