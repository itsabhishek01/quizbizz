import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Score() {
    //Use Navigate hook
    const navigate = useNavigate();

    //useEffect hook to get the local storage data on page load , with dependencey of empty array
    useEffect(() => {
        if (localStorage.getItem("result") !== null) {
            let data = localStorage.getItem("result");
            data = JSON.parse(data);
            setResultData({
                finalScore: data.finalScore,
                dataLength: data.dataLength
            })
        }
        else {
            setExist('no')
        }
    }, [])

    //State to save the result data
    const [resultData, setResultData] = useState({
        finalScore: '',
        dataLength: ''
    })
    const [exist, setExist] = useState('')

    //Function to restart the quiz
    const restartQuiz = () => {
        localStorage.removeItem("result")
        navigate('/')
    }
    return (
        //Result Window
        <div className='Result-Window'>
            <div className='scores'>
                {resultData.finalScore >= 0 && <h1>Result</h1>}
                {resultData.finalScore >= 0 && <h3>You Got {Number(resultData.finalScore).toFixed(2)}% out of {resultData.dataLength * 100 / (resultData.dataLength)}%</h3>}
                {resultData.finalScore >= 0 && <h5>You have attempted {resultData.dataLength} Questions</h5>}
                {resultData.finalScore >= 0 && <h4>Questions Answered Correctly: <b>{resultData.finalScore / (100 / resultData.dataLength)}</b></h4>}
                {resultData.finalScore >= 0 && <h4>Questions Answered Incorrectly: <b>{resultData.dataLength - resultData.finalScore / (100 / resultData.dataLength)}</b></h4>}
                {resultData.finalScore >= 0 && <button onClick={restartQuiz}>Restart Quiz</button>}
                {exist === "no" && <h1>Please Play the Quiz to get the Scores</h1>}
                {exist === "no" && <button onClick={restartQuiz}>Play Quiz</button>}
            </div>
        </div>
    )
}
