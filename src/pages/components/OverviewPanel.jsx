import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OverviewPanel = ({
  questions,
  userAnswers,
  setCurrentQuestion,
  currentQuestionIndex,
}) => {
  const questionsByDifficulty = {
    easy: questions.filter((q) => q.difficulty === "easy").length,
    medium: questions.filter((q) => q.difficulty === "medium").length,
    hard: questions.filter((q) => q.difficulty === "hard").length,
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">Question Overview</h3>
        <p className="text-sm text-gray-400 mt-1">
          {Object.keys(userAnswers).length} of {questions.length} answered
        </p>
        <div className="mt-3 space-y-1">
          <div className="text-sm text-green-400">
            Easy: {questionsByDifficulty.easy}
          </div>
          <div className="text-sm text-yellow-400">
            Medium: {questionsByDifficulty.medium}
          </div>
          <div className="text-sm text-red-400">
            Hard: {questionsByDifficulty.hard}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {questions.map((q, index) => {
          const isAnswered = userAnswers[index];
          const isCurrent = index === currentQuestionIndex;

          return (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`
                  relative p-4 rounded-lg font-medium transition-all duration-200
                  ${
                    isAnswered
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }
                  ${isCurrent ? "ring-2 ring-blue-400 ring-opacity-50" : ""}
                  ${
                    q.difficulty === "easy"
                      ? "border-green-500"
                      : q.difficulty === "medium"
                      ? "border-yellow-500"
                      : "border-red-500"
                  } border-b-2
                `}
            >
              <span className="text-sm">{index + 1}</span>
              {isAnswered && (
                <div className="absolute bottom-1 right-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OverviewPanel;
