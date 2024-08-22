import React, { useState, useEffect } from 'react';

export default function Quiz({ questions, saveAnswers, handleQuizCompletion }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        // Reset selected answer when question changes
        setSelectedAnswer(null);
    }, [currentQuestionIndex]);

    function handleAnswerSelection(event) {
        setSelectedAnswer(event.target.getAttribute('data-key'));
    }

    function handleNextButtonClick() {
        if (selectedAnswer !== null) {
            // Save the answer for the current question
            setAnswers(prevAnswers => ({
                ...prevAnswers,
                [currentQuestionIndex]: selectedAnswer
            }));

            // Save the answer to global state
            saveAnswers(selectedAnswer);

            setSelectedAnswer(null);

            // Move to the next question or finish quiz
            if (currentQuestionIndex === questions.length - 1) {
                handleQuizCompletion();
            } else {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            }
        }
    }

    const question = questions[currentQuestionIndex];

    return (
        <div className="quiz-content">
            {question ? (
                <div>
                    <h1>{question.question}</h1>
                    <form>
                        {Object.entries(question.answers).map(([key, answer], index) => (
                            <div key={key}>
                                <input 
                                    type="radio" 
                                    id={`answer${index + 1}`} 
                                    name="answer" 
                                    data-key={key} 
                                    onChange={handleAnswerSelection}
                                    checked={selectedAnswer === key}
                                />
                                <label htmlFor={`answer${index + 1}`}>{answer}</label>
                            </div>
                        ))}
                    </form>
                    <button onClick={handleNextButtonClick}>
                        {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next"}
                    </button>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}