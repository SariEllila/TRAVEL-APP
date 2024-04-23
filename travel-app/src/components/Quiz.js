import React, { useState } from 'react';

export default function Quiz(props) {
    const { question, answers } = props;
    const [quizAnswer, setQuizAnswer] = useState(""); 

    function handleNextQuestion(event) {
        event.preventDefault(); // Prevent form submission
        // You need to find the selected answer from the event target
        const selectedAnswer = event.target.elements.answer.value;
        setQuizAnswer(selectedAnswer);
    }
  
    return (
        <div>
            <div>
                <form onSubmit={handleNextQuestion}>
                    <h1>{question}</h1>
                    {Object.values(answers).map((answer, index) => (
                        <div key={index}>
                            <input 
                                type="radio" 
                                id={`answer${index + 1}`} 
                                name="answer" 
                                value={answer} />
                            <label htmlFor={`answer${index + 1}`}>{answer}</label>
                        </div>
                    ))}
                    <button type="submit">Next</button>
                </form>
            </div>
            <p>Selected Answer: {quizAnswer}</p> {/* Display selected answer */}
        </div>
    );
}