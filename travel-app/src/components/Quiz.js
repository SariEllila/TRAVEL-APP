import React, { useState, useEffect } from 'react';

export default function Quiz(props) {
    const { question, answers, saveAnswers, key, QuizData } = props;
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isLastQuestion, setIsLastQuestion] = useState(false);

    function handleAnswerSelection(event) {
        setSelectedAnswer(event.target.getAttribute('data-key'));
    }

    function handleNextButtonClick() {
        if (selectedAnswer !== null) {
            saveAnswers(selectedAnswer);
        }
    }

    useEffect(() => {
        function checkIfLastQuestion() {
            if (key === QuizData.length - 1) {
                setIsLastQuestion(true);
            }
        }

        checkIfLastQuestion();
    }, [key, QuizData.length]);

    return (
        <div>
            <form>
                <h1>{question}</h1>
                {Object.entries(answers).map(([key, answer], index) => (
                    <div key={index}>
                        <input 
                            type="radio" 
                            id={`answer${index + 1}`} 
                            name="answer" 
                            data-key={key} 
                            onChange={handleAnswerSelection}
                        />
                        <label htmlFor={`answer${index + 1}`}>{answer}</label>
                    </div>
                ))}
            </form>
            <button onClick={handleNextButtonClick}>
                {isLastQuestion ? "NEXT" : "SUBMIT"}
            </button>
        </div>
    );
}