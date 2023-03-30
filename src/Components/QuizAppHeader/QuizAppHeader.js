import React from 'react'
import data from '../../data/questions.json'

export default function QuizAppHeader({ currentQuestionNumber, currentQuestionCategory, currentQuestiondifficulty }) {
    return (
        <div className="QuestionHeader">
            {/* Current Question Number */}
            <h4 style={{ fontSize: "35px" }}>
                Question {currentQuestionNumber} of {data.length}
            </h4>
            {/* Current Question Category */}
            <p style={{ fontSize: "18px", color: "brown", marginBottom: "0" }}>
                {decodeURIComponent(currentQuestionCategory)}
            </p>
            {/* Current question Difficulty */}
            <p style={{ fontSize: "14px", color: "grey", marginBottom: "0" }}>
                Difficulty: {currentQuestiondifficulty}
            </p>
        </div>
    )
}
