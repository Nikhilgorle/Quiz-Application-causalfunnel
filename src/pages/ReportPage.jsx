import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReportPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, userAnswers } = location.state || {
    questions: [],
    userAnswers: {},
  };

  // Calculate score
  const correctAnswers = questions.reduce((count, question, index) => {
    return count + (userAnswers[index] === question.correct_answer ? 1 : 0);
  }, 0);

  const score = (correctAnswers / questions.length) * 100;

  const getAnswerStatus = (question, index) => {
    const userAnswer = userAnswers[index];
    if (!userAnswer) return "unanswered";
    return userAnswer === question.correct_answer ? "correct" : "incorrect";
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: "text-green-400",
      medium: "text-yellow-400",
      hard: "text-red-400",
    };
    return colors[difficulty] || "text-gray-400";
  };

  const handleRetry = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">Total Questions</p>
              <p className="text-2xl font-bold">{questions.length}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">Score</p>
              <p className="text-2xl font-bold">{score.toFixed(1)}%</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">Correct Answers</p>
              <p className="text-2xl font-bold text-green-500">
                {correctAnswers}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">Incorrect Answers</p>
              <p className="text-2xl font-bold text-red-500">
                {questions.length - correctAnswers}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => {
            const status = getAnswerStatus(question, index);
            const statusColors = {
              correct: "border-green-500",
              incorrect: "border-red-500",
              unanswered: "border-yellow-500",
            };

            // Combine correct and incorrect answers for displaying all options
            const allAnswers = [
              question.correct_answer,
              ...question.incorrect_answers,
            ].sort();

            return (
              <div
                key={index}
                className={`bg-gray-800 rounded-lg p-6 border-l-4 ${statusColors[status]}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium">
                      Question {index + 1}
                    </h3>
                    <div className="flex gap-4 mt-1">
                      <span
                        className={`text-sm ${getDifficultyColor(
                          question.difficulty
                        )}`}
                      >
                        {question.difficulty.charAt(0).toUpperCase() +
                          question.difficulty.slice(1)}
                      </span>
                      <span className="text-sm text-gray-400">
                        {question.category}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      status === "correct"
                        ? "bg-green-500/20 text-green-400"
                        : status === "incorrect"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>

                <p className="text-gray-300 mb-4">{question.question}</p>

                <div className="grid gap-2 mb-4">
                  {allAnswers.map((answer, answerIndex) => (
                    <div
                      key={answerIndex}
                      className={`p-3 rounded-lg ${
                        answer === question.correct_answer
                          ? "bg-green-500/20 text-green-400"
                          : answer === userAnswers[index]
                          ? "bg-red-500/20 text-red-400"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {answer}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Your answer: </span>
                    <span
                      className={
                        status === "correct" ? "text-green-400" : "text-red-400"
                      }
                    >
                      {userAnswers[index] || "No answer provided"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Correct answer: </span>
                    <span className="text-green-400">
                      {question.correct_answer}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-150"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
