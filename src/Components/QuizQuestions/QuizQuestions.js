import React from "react";

export default function QuizQuestions ({
  quizOptions,
  showCorrectIncorrectValidation,
  handleCorrectAnswer,
  selectedOption,
  currentQuestion,
}) {
  return (
    <div>
      <div className="question">
        <h5>
          <b>{decodeURIComponent(currentQuestion)}</b>
        </h5>
      </div>
      <div className="options">
        {quizOptions.map((values, index) => {
          return (
            <div
              key={index}
              style={{ display: "inline-block" }}
              className=" pt-3"
            >
              {showCorrectIncorrectValidation === "" ? (
                <button
                  onClick={() => handleCorrectAnswer(values, index)}
                  className="p-1"
                >
                  {" "}
                  {decodeURIComponent(values)}
                </button>
              ) : (
                <button
                  className="p-1 afterButton"
                  style={{
                    backgroundColor: index === selectedOption && "black",
                    color: index === selectedOption && "white",
                    border: index === selectedOption && "1px solid black",
                  }}
                >
                  {decodeURIComponent(values)}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
