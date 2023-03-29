import React, { useState, useEffect } from "react";
import data from "../../Data/questions.json";
import "./Quiz.css";
import { useNavigate } from "react-router-dom";
import {
  correctAnswer,
  inCorrectAnswer,
  localStorageKey,
  maxValueHundred,
} from "../../Constants/index";
import {
  HandleShowResult,
  shuffleOptionsArray,
  returnOptions,
  returnStarsForDifficulty,
} from "../../utils/index";
import QuizAppFooter from "../QuizAppFooter/QuizAppFooter";
import QuizAppHeader from "../QuizAppHeader/QuizAppHeader";
import QuizQuestions from "../QuizQuestions/QuizQuestions";

export default function Quiz() {
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
  const [currentQuestionCategory, setCurrentQuestionCategory] = useState(
    data[0].category
  );
  const [currentQuestiondifficulty, setCurrentQuestionDifficulty] = useState(
    returnStarsForDifficulty(data[0].difficulty)
  );
  const [currentQuestion, setCurrentQuestion] = useState(data[0].question);
  const [quizOptions, setQuizOptions] = useState(
    shuffleOptionsArray(initialOptions)
  );
  const [showCorrectIncorrectValidation, setshowCorrectIncorrectValidation] =
    useState("");
  const [quizScore, setQuizScore] = useState(0);
  const [quizProgress, setQuizProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState();
  const [quizMaxScore, setQuizMaxScore] = useState(maxValueHundred);
  const [incorrectProgressBar, setIncorrectProgressBar] =
    useState(maxValueHundred);
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
  }, [showCorrectIncorrectValidation, quizScore]);

  //Function to change Next Question , on the click of next Question Button
  function handleNextQuestionChange() {
    setCurrentQuestionNumber(currentQuestionNumber + 1);
    let length = data.length;
    // the next question will only be shown , if the current question number is less than the total number of questions
    if (currentQuestionNumber < length) {
      setCurrentQuestionCategory(data[currentQuestionNumber].category);
      setCurrentQuestionDifficulty(
        returnStarsForDifficulty(data[currentQuestionNumber].difficulty)
      );
      setCurrentQuestion(data[currentQuestionNumber].question);
      setQuizOptions(
        shuffleOptionsArray(
          returnOptions(
            data[currentQuestionNumber].correct_answer,
            data[currentQuestionNumber].incorrect_answers
          )
        )
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
      setQuizScore(quizScore + maxValueHundred / data.length);
      setQuizProgress(quizProgress + 1);
    } else {
      setshowCorrectIncorrectValidation(inCorrectAnswer);
      if (quizScore > 0) {
        setQuizMaxScore(quizMaxScore - maxValueHundred / data.length);
        setIncorrectProgressBar(incorrectProgressBar - data.length);
      }
      setQuizMaxScore(quizMaxScore - maxValueHundred / data.length);
      setIncorrectProgressBar(incorrectProgressBar - data.length);
    }
  };

  return (
    // Div to Display the entire Quiz Window
    <div className="Quiz-Window">
      {/* Top Progress Bar , which will increase after each question number change */}
      <progress max={data.length} value={currentQuestionNumber}></progress>
      {/* Div to display the main part of quiz window */}
      <div className="questions">
        {/* Contains the header part of the quiz App */}
        <QuizAppHeader
          currentQuestionNumber={currentQuestionNumber}
          currentQuestionCategory={currentQuestionCategory}
          currentQuestiondifficulty={currentQuestiondifficulty}
          dataLength={data.length}
        />
        {/* Component to display the Current Question*/}
        <QuizQuestions
          currentQuestion={currentQuestion}
          quizOptions={quizOptions}
          showCorrectIncorrectValidation={showCorrectIncorrectValidation}
          handleCorrectAnswer={handleCorrectAnswer}
          selectedOption={selectedOption}
        />
        {/* diplaying if the user has selected right option of wrong option, if it's correct it will be shown in green color , and if it's wrong it will be shown in red color */}
        <div className="ShowResult">{showCorrectIncorrectValidation}</div>
        {/* displaying the next button after the user has clicked the option button , the button will only be shown to user if any of options is selected */}
        {showCorrectIncorrectValidation.length > 0 &&
          currentQuestionNumber < data.length && (
            <button onClick={handleNextQuestionChange}>Next Question</button>
          )}
        {/* Displaying the result button after all the questions are attempted*/}
        {showCorrectIncorrectValidation.length > 0 &&
          currentQuestionNumber === data.length && (
            <button
              onClick={() => {
                HandleShowResult(localStorageKey, quizResult);
                navigate("/Score");
              }}
            >
              Show Result
            </button>
          )}
      </div>
      {/* Contains the footer part of the quiz App */}
      <QuizAppFooter
        quizScore={quizScore}
        incorrectProgressBar={incorrectProgressBar}
        quizMaxScore={quizMaxScore}
      />
    </div>
  );
}
