import React from 'react';
import { useNavigate } from 'react-router-dom';

function JoinQuiz() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/quiz');
  }

  return (
    <div className='Quiz-Window'>
      <h2>Welcome to the Quiz!</h2>
      <p>Here are the rules:</p>
      <ul>
        <li>There will be 20 multiple choice questions.</li>
        <li>Points will be awarded for each correct answer. [+5]</li>
      </ul>
      <button onClick={handleClick}>Join Quiz</button>
    </div>
  );
}

export default JoinQuiz;
