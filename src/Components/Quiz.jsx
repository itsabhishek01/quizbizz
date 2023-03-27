import React, { useState,useEffect } from "react";
import data from "./questions.json";
import Button from "react-bootstrap/Button";
import './Quiz.css'

function Quiz() {

  //Function to return options Array
  function returnOptions(correctAnswer, incorrectAnswers) {
    let finalOptions = [correctAnswer];
    for (let values of incorrectAnswers) {
      finalOptions.push(values);
    }
    return shuffle(finalOptions);
  }

  //function to shuffle array of answers
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  //Function to return Stars
  const returnStars = (difficulty) => {
    if (difficulty === "easy") {
      return "★☆☆☆☆";
    } else if (difficulty === "medium") {
      return "★★★☆☆";
    } else {
      return "★★★★★";
    }
  };

  //Setting initital data
  let initialOptions = [data[0].correct_answer];
  for (const values of data[0].incorrect_answers) {
    initialOptions.push(values);
  }

  //States
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questionCategory, setQuestionCategory] = useState(data[0].category);
  const [difficulty, setDifficulty] = useState(returnStars(data[0].difficulty));
  const [currentQuestion, setCurrentQuestion] = useState(data[0].question);
  const [answers, setAnswers] = useState(shuffle(initialOptions));
  const [show, setShow] = useState("");
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedButton, setSelectedButton] = useState();
  const [rightAnswer,setRightAnswer] = useState();

  //Function to change Next Question
  const handleNextQuestionChange = () => {
    setQuestionNumber(questionNumber + 1);
    let length = data.length;
    if (questionNumber < length) {
      setQuestionCategory(data[questionNumber].category);
      setDifficulty(returnStars(data[questionNumber].difficulty));
      setCurrentQuestion(data[questionNumber].question);
      setAnswers(
        returnOptions(
          data[questionNumber].correct_answer,
          data[questionNumber].incorrect_answers
        )
      );
      setShow("");
    } else {
      setQuestionNumber(data.length);
    }
  };

  //Fumction to Show Right Answer
  const handleCorrectAnswer = (value, index) => {
    setSelectedButton(index);
    if (value === data[questionNumber - 1].correct_answer) {
      setShow("Correct Answer");
      setScore(score + 5);
      setProgress(progress + 1);
      setRightAnswer(index);
    } else {
      setShow("Incorrect Answer !!!");
    }
  };

  //Show Result

  const handleShowResult = () => {
    setQuestionNumber(1);
    setQuestionCategory(data[0].category);
    setDifficulty(returnStars(data[0].difficulty));
    setCurrentQuestion(data[0].question);
    setAnswers(shuffle(initialOptions));
    setShow("");
    setScore(0);
    setProgress(0);
  };

  const percentage = progress * (100 / data.length);

  return (
    <>
      <div className="Quiz-Window">
        <progress max={data.length} value={questionNumber}>Hello</progress>
        <div className="questions">
          <div className="QuestionHeader">
            <h4 style={{ fontSize: "35px" }}>
              Question {questionNumber} of {data.length}
            </h4>
            <p style={{ fontSize: "18px", color: "brown", marginBottom: "0" }}>
              {questionCategory}
            </p>
            <p style={{ fontSize: "14px", color: "grey", marginBottom: "0" }}>
              Difficulty: {difficulty}
            </p>
            <p style={{ fontSize: "18px", color: "blue", marginBottom: "25" }}>
              Current Score : <b>{score}</b>
            </p>
          </div>
          <div>
            <div className="question">
              <h5>
                <b>{currentQuestion}</b>
              </h5>
            </div>
            <div className="options">
              {answers.map((values, index) => {
                return (
                  <div key={index} style={{ display: "inline-block" }} className=" pt-3">
                    {show === "" ? (
                      <Button
                        variant="outline-danger"
                        onClick={() => handleCorrectAnswer(values, index)}
                        className="p-1"
                      >
                        {" "}
                        {values}
                      </Button>
                    ) : (
                      <Button
                        variant="outline-danger"
                        className="p-1"
                        style={{
                          backgroundColor:
                            index === selectedButton && "purple" ,
                            color:
                            index === selectedButton && "white",
                            border:
                            index === selectedButton && "1px solid black",
                        }}
                      >
                        {values}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {show === "Correct Answer" ? (
            <div
              className="ShowResult"
              style={{ color: "black", fontSize: "36px" }}
            >
              {show}
            </div>
          ) : (
            <div
              className="ShowResult"
              style={{ color: "black", fontSize: "36px" }}
            >
              {show}
            </div>
          )}
          {show.length > 0 && questionNumber < data.length && (
            <Button variant="outline-dark" onClick={handleNextQuestionChange}>
              Next Question
            </Button>
          )}
          {show.length > 0 && questionNumber === data.length && (
            <button onClick={handleShowResult}>Restart Quiz</button>
          )}
        </div>
      </div>
      {progress > 0 && (
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{
              width: `${percentage}%`,
              height: "20px",
              backgroundColor: "#909090",
            }}
          >
            {percentage}%
          </div>
        </div>
      )}
    </>
  );
}

export default Quiz;
