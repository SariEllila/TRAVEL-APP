import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import DestCards from './components/DestCards';
import DestPages from './components/DestPages';
import DestinationsData from './DestinationsData';
import Weather from './components/Weather';
import NewsData from './NewsData';
import NewsCards from './components/NewsCards';
import Quiz from './components/Quiz';
import QuizData from './QuizData';

function App() {
  const [selectedDestinationId, setSelectedDestinationId] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [savedAnswers, setSavedAnswers] = useState([]);

  function handleDestClick(id) {
    setSelectedDestinationId(id);
  }

  function handleQuizClick() {
    setShowQuiz(true);
  }

  function saveAnswers(answer) {
    setSavedAnswers(prevAnswers => [...prevAnswers, answer]);
    console.log(savedAnswers)
  }


  const destCards = DestinationsData.map(item => (
    <DestCards 
      key={item.id}
      id={item.id}
      img={item.img}
      city={item.city}
      handleDestClick={() => handleDestClick(item.id)}
    />
  ));

  const selectedDest = DestinationsData.find(item => item.id === selectedDestinationId);

  const destPages = selectedDest ? (
    <DestPages 
      key={selectedDest.id}
      id={selectedDest.id}
      img={selectedDest.img} 
      city={selectedDest.city}
      location={selectedDest.location}
      distanceFromTokyo={selectedDest.distanceFromTokyo}
      population={selectedDest.population}
      description={selectedDest.description}
      popularSights={selectedDest.popularSights}
    />
  ) : null;

  const newsCards = NewsData.map(item => (
    <NewsCards 
      key={item.id}
      img={item.img}
      title={item.title}
      text={item.text}
      date={item.date}
    />
  ));

  const quizPage = QuizData.map(item => (
    <Quiz 
      QuizData = {QuizData.length-1}
      key={item.id}
      question={item.question}
      answers={item.answers}
      saveAnswers={saveAnswers}
    />
  ));


  function findMostFrequentAnswer(savedAnswers) {

    let counts = {};

    savedAnswers.forEach(function(string) {
        if (counts[string]) {
            counts[string]++;
        } else {
            counts[string] = 1;
        }
    });

    let mostFrequentAnswer;
    let maxCount = 0;

    for (let string in counts) {
        if (counts[string] > maxCount) {
            mostFrequentAnswer = string;
            maxCount = counts[string];
        }
    }
    return mostFrequentAnswer;
}

function renderQuizResult() {

  const mostFrequent = findMostFrequentAnswer(savedAnswers);
  
  // Find the destination that matches the most frequent answer
  const matchingDestination = DestinationsData.find(destination =>
      destination.city.toLowerCase() === mostFrequent.toLowerCase().replace('answer ', '')
  );

  // If a matching destination is found, render its city and img
  if (matchingDestination) {
      return (
          <div>
              <Header />
              <div className="destinations-scroll">
                  <DestCards 
                      img={matchingDestination.img}
                      city={matchingDestination.city}
                      handleDestClick={() => handleDestClick(matchingDestination.id)}
                  />
              </div>
          </div>
      );
  } else {
      // If no matching destination is found, render a message or fallback content
      return (
          <div>
              <Header />
              <div className="destinations-scroll">
                  <h2>No matching destination found.</h2>
              </div>
          </div>
      );
  }

}


  return (
    <div>
      <Header />
      <div className="destinations-scroll">
        {destCards}
      </div>
      <div className="quizlink-news-weather-container">
        {showQuiz ? (
          <div>
            {quizPage}
            <button onClick={() => renderQuizResult}>CHECK RESULTS</button>
          </div>
        ) : (
          <div>
            <div className="quiz-link-text">
              <h1>Do you want to know which destination is best for YOU?</h1>
              <h1 onClick={handleQuizClick}>Take the QUIZ <span>HERE</span></h1>
            </div>
            <div className="news-weather-container">
              <div>
                {selectedDestinationId ? destPages : newsCards}
              </div>
              <div>
                <Weather />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
