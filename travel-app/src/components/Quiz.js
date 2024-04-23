import React from 'react'

export default function Quiz(props) {

    const { question, answers } = props;


    function handleNextQuestion() {
        
    }
  
    return (
      <div>
        <div>
          <form>
            <h1>{question}</h1>
            {Array.isArray(answers) && answers.map((answer, index) => (
              <div key={index}>
                <input 
                type="radio" 
                id={`answer${index + 1}`} 
                name="answer" 
                value={answer} />
                <label htmlFor={`answer${index + 1}`}>{answer}</label>
              </div>
            ))}
            <button onClick={handleNextQuestion}>Next</button>
          </form>
        </div>
      </div>
    );
  }