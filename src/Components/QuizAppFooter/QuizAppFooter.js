import React from 'react'
import MultiProgress from "react-multi-progress";

export default function QuizAppFooter({ quizScore, incorrectProgressBar, quizMaxScore }) {
  return (
    <>
      {/* displaying the bottom progress bar , which is dynamic to the number of questions */}
      <div className="scoresOnProgress">
        <h6>Score: {quizScore.toFixed(2)}</h6>
        <h6 className="max-score">Max Score {quizMaxScore.toFixed(2)}</h6>
      </div>
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
    </>
  )
}
