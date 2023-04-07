import React, { useState } from 'react';
import '../style/QuizForm.css';

function QuizForm() {
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleQuizNameChange = (event) => {
    setQuizName(event.target.value);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { prompt: '', answer: '', grade: '' }]);
  };

  const handleQuestionPromptChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index].prompt = event.target.value;
    setQuestions(newQuestions);
  };

  const handleQuestionAnswerChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = event.target.value;
    setQuestions(newQuestions);
  };

  const handleQuestionGradeChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index].grade = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data to a backend server or save it to a local database
  };

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
      <label htmlFor="quizName" className="quiz-form__label">Quiz Name:</label>
      <input type="text" id="quizName" value={quizName} onChange={handleQuizNameChange} className="quiz-form__input" />

      <h2 className="quiz-form__header">Questions:</h2>
      {questions.map((question, index) => (
        <div key={index} className="quiz-form__question">
          <label htmlFor={`questionPrompt${index}`} className="quiz-form__label">Question Prompt:</label>
          <input
            type="text"
            id={`questionPrompt${index}`}
            value={question.prompt}
            onChange={(event) => handleQuestionPromptChange(event, index)}
            className="quiz-form__input"
          />

          <label htmlFor={`questionAnswer${index}`} className="quiz-form__label">Question Answer:</label>
          <input
            type="text"
            id={`questionAnswer${index}`}
            value={question.answer}
            onChange={(event) => handleQuestionAnswerChange(event, index)}
            className="quiz-form__input"
          />

          <label htmlFor={`questionGrade${index}`} className="quiz-form__label">Question Grade:</label>
          <input
            type="number"
            id={`questionGrade${index}`}
            value={question.grade}
            onChange={(event) => handleQuestionGradeChange(event, index)}
            className="quiz-form__input"
          />
        </div>
      ))}

      <button type="button" onClick={handleAddQuestion} className="quiz-form__button">Add Question</button>
      <button type="submit" className="quiz-form__button">Submit</button>
    </form>
  );
}

export default QuizForm;
