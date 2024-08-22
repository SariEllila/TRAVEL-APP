import React, { useState, useEffect } from 'react';

export default function Quiz({ questions, saveAnswers, handleQuizCompletion, navigateToDestination }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null);

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
            setAnswers(prevAnswers => [...prevAnswers, selectedAnswer]);

            // Move to the next question or finish quiz
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                // Calculate the result after all questions are answered
                calculateResult();
            }
        }
    }

    function calculateResult() {
        // Count the number of times each answer is selected
        const answerCounts = {};
        answers.forEach(answer => {
            answerCounts[answer] = (answerCounts[answer] || 0) + 1;
        });

        // Find the answer with the highest count
        const mostFrequentAnswer = Object.keys(answerCounts).reduce((a, b) => answerCounts[a] > answerCounts[b] ? a : b);

        // Extract city name from the answer key (e.g., 'answerFukuoka' -> 'Fukuoka')
        const city = mostFrequentAnswer.replace('answer', '');

        setResult(city); // Set the result
    }

    function handleGoToDestinationClick() {
        // Navigate to the destination page based on the result
        if (result) {
            navigateToDestination(result);
        }
    }

    return (
        <div>
            {result ? (
                <div className="modal">
                    <h1>Your destination is {result}!</h1>
                    <button onClick={handleGoToDestinationClick}>Go to destination page</button>
                </div>
            ) : (
                <div>
                    <h1>{questions[currentQuestionIndex].question}</h1>
                    <form>
                        {Object.entries(questions[currentQuestionIndex].answers).map(([key, answer], index) => (
                            <div key={key}>
                                <input
                                    type="radio"
                                    id={`answer${index + 1}`}
                                    name="answer"
                                    data-key={key}
                                    checked={selectedAnswer === key}
                                    onChange={handleAnswerSelection}
                                />
                                <label htmlFor={`answer${index + 1}`}>{answer}</label>
                            </div>
                        ))}
                    </form>
                    <button onClick={handleNextButtonClick}>
                        {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next"}
                    </button>
                </div>
            )}
        </div>
    );
}