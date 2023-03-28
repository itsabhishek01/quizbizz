//Importing libraries
import React, { useState, useEffect } from "react";
import data from "./questions.json";
import Button from "react-bootstrap/Button";
import MultiProgress from "react-multi-progress";
import "./Quiz.css";
import { useNavigate } from "react-router-dom";

function Quiz() {
  //UseEffect Hook to clear the result data from local storage on page load

  //Today's Status:
  // Title : Quiz App
  // DONE:
  // Optimizing the Code - 2 and half Hrs

  useEffect(() => {
    localStorage.removeItem("result");
  }, []);

  //Navigate hook , to navigate the user to the result page
  const navigate = useNavigate();

  //Function to return options Array
  function returnOptions(correctAnswer, incorrectAnswers) {
    let finalOptions = [correctAnswer];
    for (let values of incorrectAnswers) {
      finalOptions.push(values);
    }
    return shuffleOptionsArray(finalOptions);
  }

  //function to shuffle array of answers
  function shuffleOptionsArray(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      //assigning a random value to the randomIndex
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      //Swapping the index of the current index and random index
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  //Setting initital data , of options that will will shown to user for the first question
  let initialOptions = [data[0].correct_answer];
  for (const values of data[0].incorrect_answers) {
    initialOptions.push(values);
  }

  //Function to return Stars
  const returnStarsForDifficulty = (difficulty) => {
    if (difficulty === "easy") {
      //if the difficulty is easy , it will return the following number of stars
      return "★☆☆☆☆";
    } else if (difficulty === "medium") {
      //if the difficulty is medium , it will return the following number of stars
      return "★★★☆☆";
    } else {
      //if the difficulty is other than easy and medium , it will return the following number of stars
      return "★★★★★";
    }
  };

  //States used in the Component

  //This State will store Current Question Number
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  //This State will store Current Question Category
  const [currentQuestionCategory, setCurrentQuestionCategory] = useState(data[0].category);
  //This State will store Current Question Difficulty
  const [currentQuestiondifficulty, setCurrentQuestionDifficulty] = useState(returnStarsForDifficulty(data[0].difficulty));
  //This State Will store Current Question
  const [currentQuestion, setCurrentQuestion] = useState(data[0].question);
  //This State will store Quiz Options 
  const [quizOptions, setQuizOptions] = useState(shuffleOptionsArray(initialOptions));
  //This State will store Correct and Incorrect Validtion
  const [showCorrectIncorrectValidation, setshowCorrectIncorrectValidation] = useState("");
  //This State will Store the Current Quiz Score 
  const [quizScore, setQuizScore] = useState(0);
  //This State will store the Current Quiz Progress
  const [quizProgress, setQuizProgress] = useState(0);
  //This State will store the index of the Option Selected by the user from the list of options for the question 
  const [selectedOption, setSelectedOption] = useState();
  //This State will Store the Max Score for the Current Quiz 
  const [quizMaxScore, setQuizMaxScore] = useState(100);
  // This State will Store the value of incorrect progress Bar , if there is a wrong answer
  const [incorrectProgressBar, setIncorrectProgressBar] = useState(data.length)
  //This State will store all the data , that is required to show result to user , when navigate to Resullt page
  const [quizResult, setQuizResult] = useState({
    finalScore: "",
    finalPercentage: "",
    dataLength: "",
  });

  //useeffect hook to set result on each show render
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
        returnOptions(
          data[currentQuestionNumber].correct_answer,
          data[currentQuestionNumber].incorrect_answers
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
      setshowCorrectIncorrectValidation("Correct Answer");
      setQuizScore(quizScore + 100 / data.length);
      setQuizProgress(quizProgress + 1);
    } else {
      setshowCorrectIncorrectValidation("Incorrect Answer !!!");
      if (quizScore > 0) {
        setQuizMaxScore(quizMaxScore - 100 / data.length);
        setIncorrectProgressBar(incorrectProgressBar - data.length)
      }
      setQuizMaxScore(quizMaxScore - 100 / data.length);
      setIncorrectProgressBar(incorrectProgressBar - data.length)
    }
  };

  //Show Result
  const handleShowResult = () => {
    localStorage.setItem("result", JSON.stringify(quizResult));
    navigate("/Score");
  };

  return (
    // decodeURIComponent , Method is used to decrypt the URL encoding
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
                      <Button
                        variant="outline-danger"
                        onClick={() => handleCorrectAnswer(values, index)}
                        className="p-1"
                      >
                        {" "}
                        {decodeURIComponent(values)}
                      </Button>
                    ) : (
                      <Button
                        variant="outline-danger"
                        className="p-1 afterButton"
                        style={{
                          backgroundColor: index === selectedOption && "black",
                          color: index === selectedOption && "white",
                          border: index === selectedOption && "1px solid black",
                        }}
                      >
                        {decodeURIComponent(values)}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* diplaying if the user has selected right option of wrong option, if it's correct it will be shown in green color , and if it's wrong it will be shown in red color */}
          {showCorrectIncorrectValidation === "Correct Answer" ? (
            <div
              className="ShowResult"
              style={{ color: "Green", fontSize: "36px" }}
            >
              {showCorrectIncorrectValidation}
            </div>
          ) : (
            <div
              className="ShowResult"
              style={{ color: "red", fontSize: "36px" }}
            >
              {showCorrectIncorrectValidation}
            </div>
          )}
          {/* displaying the next button after the user has clicked the option button , the button will only be shown to user if any of options is selected */}
          {showCorrectIncorrectValidation.length > 0 && currentQuestionNumber < data.length && (
            <Button variant="outline-dark" onClick={handleNextQuestionChange}>
              Next Question
            </Button>
          )}
          {/* Displaying the result button after all the questions are attempted*/}
          {showCorrectIncorrectValidation.length > 0 && currentQuestionNumber === data.length && (
            <button onClick={handleShowResult}>Show Result</button>
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
              value: incorrectProgressBar + 65,
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