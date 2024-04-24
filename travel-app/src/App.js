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

  // function renderResult() {
  //   if (answers.id === )
  // }

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

  function renderResult(){
    return (
      console.log("YOUR RESULT")
    )
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
