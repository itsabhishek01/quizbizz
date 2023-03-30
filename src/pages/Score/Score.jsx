import React from 'react'
import { useState, useEffect } from 'react';
import { localStorageKey } from '../../constants/index';
import './Score.css'
import { Scores } from '../../Components';

export default function Score() {
    //useEffect hook to get the local storage data on page load , with dependencey of empty array
    useEffect(() => {
        if (localStorage.getItem(localStorageKey) !== null) {
            let data = localStorage.getItem(localStorageKey);
            data = JSON.parse(data);
            setResultData({
                finalScore: data.finalScore,
                dataLength: data.dataLength
            })
            return;
        }
            setExistDataInLocalStorage(false)
    }, [])

    //State to save the result data
    const [resultData, setResultData] = useState({
        finalScore: '',
        dataLength: ''
    })
    const [existDataInLocalStorage, setExistDataInLocalStorage] = useState(true)


    return (
        //Result Window
        <div className='Result-Window'>
            <Scores resultData={resultData}
                existDataInLocalStorage={existDataInLocalStorage} />
        </div>
    )
}
