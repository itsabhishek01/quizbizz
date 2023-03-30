import React, { useState, useEffect } from "react";
import data from "../../data/questions.json";
import "./Quiz.css";
import { correctAnswer, inCorrectAnswer, localStorageKey, } from "../../constants";
import { returnShuffledOptions, returnStarsForDifficulty, } from "../../utils";
import { QuizAppFooter, QuizAppHeader, QuizQuestions, QuizAppButtons } from "../../Components";

export default function Quiz() {
  //UseEffect Hook to clear the result data from local storage on page render
  useEffect(() => {
    localStorage.removeItem(localStorageKey);
  }, []);

  //States used in the Component
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [currentQuestionCategory, setCurrentQuestionCategory] = useState(data[0].category);
  const [currentQuestiondifficulty, setCurrentQuestionDifficulty] = useState(returnStarsForDifficulty(data[0].difficulty));
  const [currentQuestion, setCurrentQuestion] = useState(data[0].question);
  const [quizOptions, setQuizOptions] = useState(returnShuffledOptions(data[0].correct_answer, data[0].incorrect_answers));
  const [showCorrectIncorrectValidation, setshowCorrectIncorrectValidation] = useState("");
  const [quizProgress, setQuizProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState();
  const [incorrectProgressBar, setIncorrectProgressBar] = useState(100);
  const [quizResult, setQuizResult] = useState({
    finalScore: "",
    finalPercentage: "",
    dataLength: "",
  });

  const [scores, setScores] = useState({
    quizScore: 0,
    quizMaxScore:100
  })

  //useEffect hook to set result on each show render
  useEffect(() => {
    setQuizResult({
      finalScore: scores.quizScore,
      dataLength: data.length,
    });
  }, [showCorrectIncorrectValidation, scores.quizScore]);

  //Function to change Next Question , on the click of next Question Button
  function handleNextQuestionChange() {
    setCurrentQuestionNumber(currentQuestionNumber + 1);
    let length = data.length;
    if (currentQuestionNumber < length) {
      setCurrentQuestionCategory(data[currentQuestionNumber].category);
      setCurrentQuestionDifficulty(returnStarsForDifficulty(data[currentQuestionNumber].difficulty));
      setCurrentQuestion(data[currentQuestionNumber].question);
      setQuizOptions(returnShuffledOptions(data[currentQuestionNumber].correct_answer, data[currentQuestionNumber].incorrect_answers));
      setshowCorrectIncorrectValidation("");
      return;
    }
    setCurrentQuestionNumber(data.length);
  }

  //Function to Show Right Answer
  const handleCorrectAnswer = (value, index) => {
    setSelectedOption(index);
    if (value === data[currentQuestionNumber - 1].correct_answer) {
      setshowCorrectIncorrectValidation(correctAnswer);
      setScores({quizScore:scores.quizScore + 100 / data.length , quizMaxScore :scores.quizMaxScore})
      setQuizProgress(quizProgress + 1);
      return;
    }
    setshowCorrectIncorrectValidation(inCorrectAnswer);
    if (scores.quizScore > 0) {
      setScores({quizScore:scores.quizScore , quizMaxScore : scores.quizMaxScore - 100/data.length })
      setIncorrectProgressBar(incorrectProgressBar - data.length);
    }
    setScores({quizScore:scores.quizScore , quizMaxScore : scores.quizMaxScore - 100/data.length })
    setIncorrectProgressBar(incorrectProgressBar - data.length);
  };

  return (
    <div className="Quiz-Window">

      {/* Top Progress Bar , which will increase after each question number change */}
      <progress max={data.length} value={currentQuestionNumber}></progress>
      <div className="questions">

        {/* Contains the header part of the quiz App */}
        <QuizAppHeader
          currentQuestionNumber={currentQuestionNumber}
          currentQuestionCategory={currentQuestionCategory}
          currentQuestiondifficulty={currentQuestiondifficulty}
        />

        {/* Component to display the Current Question*/}
        <QuizQuestions
          currentQuestion={currentQuestion}
          quizOptions={quizOptions}
          showCorrectIncorrectValidation={showCorrectIncorrectValidation}
          handleCorrectAnswer={handleCorrectAnswer}
          selectedOption={selectedOption}
        />

        {/* diplaying if the user has selected right option or wrong option*/}
        <div className="ShowResult">{showCorrectIncorrectValidation}</div>

        {/* Contains the QuizAppButtons Component */}
        <QuizAppButtons
          showCorrectIncorrectValidation={showCorrectIncorrectValidation}
          currentQuestionNumber={currentQuestionNumber}
          handleNextQuestionChange={handleNextQuestionChange}
          quizResult={quizResult}
        />
      </div>

      {/* Contains the footer part of the quiz App */}
      <QuizAppFooter
        quizScore={scores.quizScore}
        incorrectProgressBar={incorrectProgressBar}
        quizMaxScore={scores.quizMaxScore}
      />
    </div>
  );
}
