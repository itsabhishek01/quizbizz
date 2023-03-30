import React from 'react'
import { removeLocalStorageItem } from '../../utils'
import { localStorageKey } from '../../constants'
import { useNavigate } from 'react-router-dom'

export default function Scores({
    resultData,
    existDataInLocalStorage
}) {
    const navigate = useNavigate()
    return (
        <div>
            {existDataInLocalStorage === true && <div className='scores'>
                {resultData.finalScore >= 0 && <h1>Result</h1>}
                {resultData.finalScore >= 0 && <h3>You Got {Number(resultData.finalScore).toFixed(2)}% out of {resultData.dataLength * 100 / (resultData.dataLength)}%</h3>}
                {resultData.finalScore >= 0 && <h5>You have attempted {resultData.dataLength} Questions</h5>}
                {resultData.finalScore >= 0 && <h4>Questions Answered Correctly: <b>{resultData.finalScore / (100 / resultData.dataLength)}</b></h4>}
                {resultData.finalScore >= 0 && <h4>Questions Answered Incorrectly: <b>{resultData.dataLength - resultData.finalScore / (100 / resultData.dataLength)}</b></h4>}
                {resultData.finalScore >= 0 && <button onClick={() => {
                    removeLocalStorageItem(localStorageKey)
                    navigate('/')
                }}>Restart Quiz</button>}
            </div>}
            {existDataInLocalStorage === false && <h1>Please Play the Quiz to get the Scores</h1>}
            {existDataInLocalStorage === false && <button onClick={() => {
                removeLocalStorageItem(localStorageKey)
                navigate('/')
            }}>Play Quiz</button>}
        </div>
    )
}
