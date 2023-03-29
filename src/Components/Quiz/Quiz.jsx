//Importing libraries
import React, { useState, useEffect } from "react";
import data from '../../Data/questions.json'
import MultiProgress from "react-multi-progress";
import "./Quiz.css";
import { useNavigate } from "react-router-dom";
import { correctAnswer,inCorrectAnswer,localStorageKey,maxValueofHundred } from "../../Constants/Index";
import { HandleShowResult,shuffleOptionsArray,returnOptions,returnStarsForDifficulty } from "../../utils/Index";


function Quiz() {
  //UseEffect Hook to clear the result data from local storage on page render
  useEffect(() => {
    localStorage.removeItem(localStorageKey);
  }, []);

  //Navigate hook , to navigate the user to the result page
  const navigate = useNavigate();

  //Setting initital data , of options that will will shown to user for the first question
  let initialOptions = [data[0].correct_answer];
  for (const values of data[0].incorrect_answers) {
    initialOptions.push(values);
  }

  //States used in the Component
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [currentQuestionCategory, setCurrentQuestionCategory] = useState(data[0].category);
  const [currentQuestiondifficulty, setCurrentQuestionDifficulty] = useState(returnStarsForDifficulty(data[0].difficulty));
  const [currentQuestion, setCurrentQuestion] = useState(data[0].question);
  const [quizOptions, setQuizOptions] = useState(shuffleOptionsArray(initialOptions));
  const [showCorrectIncorrectValidation, setshowCorrectIncorrectValidation] = useState("");
  const [quizScore, setQuizScore] = useState(0);
  const [quizProgress, setQuizProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState();
  const [quizMaxScore, setQuizMaxScore] = useState(maxValueofHundred);
  const [incorrectProgressBar, setIncorrectProgressBar] = useState(maxValueofHundred)
  const [quizResult, setQuizResult] = useState({
    finalScore: "",
    finalPercentage: "",
    dataLength: "",
  });

  //useEffect hook to set result on each show render
  useEffect(() => {
    setQuizResult({
      finalScore: quizScore,
      dataLength: data.length,
    });
  }, [showCorrectIncorrectValidation]);

  //Function to change Next Question , on the click of next Question Button
  function handleNextQuestionChange() {
    setCurrentQuestionNumber(currentQuestionNumber + 1);
    let length = data.length;
    // the next question will only be shown , if the current question number is less than the total number of questions
    if (currentQuestionNumber < length) {
      setCurrentQuestionCategory(data[currentQuestionNumber].category);
      setCurrentQuestionDifficulty(returnStarsForDifficulty(data[currentQuestionNumber].difficulty));
      setCurrentQuestion(data[currentQuestionNumber].question);
      setQuizOptions(
        shuffleOptionsArray(returnOptions(
          data[currentQuestionNumber].correct_answer,
          data[currentQuestionNumber].incorrect_answers
        ))
      );
      setshowCorrectIncorrectValidation("");
    } else {
      setCurrentQuestionNumber(data.length);
    }
  }

  //Fumction to Show Right Answer
  const handleCorrectAnswer = (value, index) => {
    setSelectedOption(index);
    if (value === data[currentQuestionNumber - 1].correct_answer) {
      setshowCorrectIncorrectValidation(correctAnswer);
      setQuizScore(quizScore + maxValueofHundred / data.length);
      setQuizProgress(quizProgress + 1);
    } else {
      setshowCorrectIncorrectValidation(inCorrectAnswer);
      if (quizScore > 0) {
        setQuizMaxScore(quizMaxScore - maxValueofHundred / data.length);
        setIncorrectProgressBar(incorrectProgressBar - data.length)
      }
      setQuizMaxScore(quizMaxScore - maxValueofHundred / data.length);
      setIncorrectProgressBar(incorrectProgressBar - data.length)
    }
  };

  return (
    <>
      {/* Div to Display the entire Quiz Window */}
      <div className="Quiz-Window">
        {/* Top Progress Bar , which will increase after each question number change */}
        <progress max={data.length} value={currentQuestionNumber}></progress>
        {/* Div to display the main part of quiz window */}
        <div className="questions">
          <div className="QuestionHeader">
            {/* Current Question Number */}
            <h4 style={{ fontSize: "35px" }}>
              Question {currentQuestionNumber} of {data.length}
            </h4>'
            {/* Current Question Category */}
            <p style={{ fontSize: "18px", color: "brown", marginBottom: "0" }}>
              {decodeURIComponent(currentQuestionCategory)}
            </p>
            {/* Current question Difficulty */}
            <p style={{ fontSize: "14px", color: "grey", marginBottom: "0" }}>
              Difficulty: {currentQuestiondifficulty}
            </p>
          </div>
          <div>
            {/* Div to display the current question */}
            <div className="question">
              <h5>
                <b>{decodeURIComponent(currentQuestion)}</b>
              </h5>
            </div>
            {/* Div to display all the options buttons, which will be mapped from array named answers */}
            <div className="options">
              {quizOptions.map((values, index) => {
                return (
                  <div
                    key={index}
                    style={{ display: "inline-block" }}
                    className=" pt-3"
                  >
                    {/* if if showCorrectIncorrect === '' , it will display the buttons which will have the onClick functionality */}
                    {/* if if showCorrectIncorrect !== '' , it will display the buttons which will not have the onClick functionality,also it will set the color of the clicked button, to be unique*/}
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
          {/* diplaying if the user has selected right option of wrong option, if it's correct it will be shown in green color , and if it's wrong it will be shown in red color */}

          <div className="ShowResult">
            {showCorrectIncorrectValidation}
          </div>
          {/* displaying the next button after the user has clicked the option button , the button will only be shown to user if any of options is selected */}
          {showCorrectIncorrectValidation.length > 0 && currentQuestionNumber < data.length && (
            <button onClick={handleNextQuestionChange}>
              Next Question
            </button>
          )}
          {/* Displaying the result button after all the questions are attempted*/}
          {showCorrectIncorrectValidation.length > 0 && currentQuestionNumber === data.length && (
            <button onClick={() => {
              HandleShowResult(localStorageKey, quizResult)
              navigate("/Score");
            }}>Show Result</button>
          )}
        </div>
        {/* displaying the bottom progress bar , which is dynamic to the number of questions */}
        <div className="scoresOnProgress">
          <h6>Score: {quizScore.toFixed(2)}</h6>
          <h6 className="max-score">Max Score {quizMaxScore.toFixed(2)}</h6>
        </div>
        {/* Multiprogress bar , which will increase if there is right answer and , will decrease if it's wrong answer */}
        <MultiProgress
          transitionTime={1.2}
          elements={[
            {
              value: quizScore,
              color: "black",
              isBold: false,
            },
            {
              value: quizScore + 12,
              color: "grey",
              isBold: true,
            },
            {
              value: quizScore + 25,
              color: "darkGrey",
              isBold: true,
            },
            {
              value: incorrectProgressBar,
              color: "lightgrey",
            },
          ]}
          height={20}
          className="progress-bar"
        />
      </div>
    </>
  );
}

export default Quiz;