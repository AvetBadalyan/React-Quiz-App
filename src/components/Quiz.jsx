import React, { useState } from 'react';
import QUESTIONS from '../questions';
import QuizCompletedImg from './../assets/quiz-complete.png';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  function handleSelectAnswer(answer) {
    setUserAnswers(prevAnswers => [...prevAnswers, answer]);
  }

  if (activeQuestionIndex >= QUESTIONS.length) {
    return (
      <div id="summary">
        <h2>Quiz Completed!</h2>
        <img src={QuizCompletedImg} alt="Quiz Completed" />
      </div>
    );
  }
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  
  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map(answer => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
