import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Question Component
const Question = ({ question, onAnswer, selectedAnswer }) => {
  if (!question) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 bg-gray-700 text-sm text-gray-300 rounded-full">
            {question.category}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              question.difficulty === "easy"
                ? "bg-green-900 text-green-200"
                : question.difficulty === "medium"
                ? "bg-yellow-900 text-yellow-200"
                : "bg-red-900 text-red-200"
            }`}
          >
            {question.difficulty}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-white">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3">
        {[question.correct_answer, ...question.incorrect_answers]
          .sort()
          .map((option) => (
            <button
              key={option}
              onClick={() => onAnswer(question.id, option)}
              className={`w-full flex items-center text-left p-4 rounded-lg transition-all duration-200 
              ${
                selectedAnswer === option
                  ? "bg-blue-600 text-white ring-2 ring-blue-500 ring-opacity-50"
                  : "bg-gray-700 text-gray-100 hover:bg-gray-600"
              }`}
            >
              <div
                className={`
              flex-shrink-0 w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center
              ${
                selectedAnswer === option
                  ? "border-white bg-white"
                  : "border-gray-400"
              }`}
              >
                {selectedAnswer === option && (
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </div>
              <span className="text-lg">{option}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default Question;
