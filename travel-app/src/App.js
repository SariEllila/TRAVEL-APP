import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import DestCards from './components/DestCards';
import DestPages from './components/DestPages';
import DestinationsData from './DestinationsData';
import Weather from './components/Weather';
import NewsData from './NewsData';
import NewsCards from './components/NewsCard';
import Quiz from './components/Quiz';
import QuizData from './QuizData';
import NewsPages from './components/NewsPages';
import Footer from './components/Footer';

function App() {
    const [selectedDestinationId, setSelectedDestinationId] = useState(null);
    const [selectedNewsId, setSelectedNewsId] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const [viewType, setViewType] = useState(''); // New state to manage the view type (destinations, news, quiz)
    const [showQuizContainer, setShowQuizContainer] = useState(true);
    const [savedAnswers, setSavedAnswers] = useState([]);

    function handleDestClick(id) {
        setSelectedDestinationId(id);
        setSelectedNewsId(null); // Reset selected news
        setShowQuiz(false); // Hide quiz
        setViewType('destinations'); // Set view to destinations
    }

    function handleNewsClick(id) {
        setSelectedNewsId(id);
        setSelectedDestinationId(null); // Reset selected destination
        setShowQuiz(false); // Hide quiz
        setViewType('news'); // Set view to news
    }

    function handleQuizClick() {
        setShowQuiz(true);
        setSelectedDestinationId(null); // Reset selected destination
        setSelectedNewsId(null); // Reset selected news
        setViewType('quiz'); // Set view to quiz
    }

    function handleBackToNews() {
        setSelectedNewsId(null); // Reset selected news
        setSelectedDestinationId(null); // Reset selected destination
        setShowQuiz(false); // Hide quiz
        setViewType(''); // Set view back to default
    }

    function saveAnswers(answer) {
        setSavedAnswers(prevAnswers => [...prevAnswers, answer]);
    }

    function navigateToDestination(cityName) {
        // Find the destination ID based on the city name
        const destination = DestinationsData.find(item => item.city === cityName);
        if (destination) {
            setSelectedDestinationId(destination.id);
            setSelectedNewsId(null); // Reset selected news
            setShowQuiz(false); // Hide quiz
            setViewType('destinations'); // Navigate to destination view
        } else {
            console.error('Destination not found for city:', cityName);
        }
    }

    const selectedDest = DestinationsData.find(item => item.id === selectedDestinationId);
    const selectedNews = NewsData.find(item => item.id === selectedNewsId);

    const destCards = DestinationsData.map(item => (
        <DestCards
            key={item.id}
            id={item.id}
            img={item.img}
            city={item.city}
            handleDestClick={() => handleDestClick(item.id)}
        />
    ));

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
            handleNewsClick={() => handleNewsClick(item.id)}
        />
    ));

    const newsPages = selectedNews ? (
        <NewsPages
            key={selectedNews.id}
            img={selectedNews.img}
            title={selectedNews.title}
            date={selectedNews.date}
            text={selectedNews.text}
            onBackToNews={handleBackToNews} // Pass the function as a prop
        />
    ) : null;

    const quizPage = (
        <Quiz
            questions={QuizData}
            saveAnswers={saveAnswers}
            handleQuizCompletion={() => setShowQuiz(false)}
            navigateToDestination={navigateToDestination}
        />
    );

    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef();
    const item_width = 400;

    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    }

    const handleScroll = debounce((scrollAmount) => {
        if (containerRef.current) {
            const maxScrollLeft = containerRef.current.scrollWidth - containerRef.current.clientWidth;
            const newScrollPosition = Math.min(Math.max(scrollPosition + scrollAmount, 0), maxScrollLeft);
            setScrollPosition(newScrollPosition);
            containerRef.current.scrollLeft = newScrollPosition;
        }
    }, 100);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = scrollPosition;
        }
    }, [scrollPosition]);

    return (
        <div>
            <Header />

            <div className="browse-dest">
                <h1 className="browse-dest-text">
                    Browse <span className="light-coral" style={{ fontSize: '1.1em' }}>Destinations</span>
                </h1>

                <div className="destinations-scroll">
                    <div ref={containerRef} style={{
                        width: "90vw",
                        overflowX: "scroll",
                        scrollBehavior: "smooth"
                    }}>
                        <div className="destcards-box">
                            {destCards}
                        </div>
                    </div>
                </div>
            </div>

            <div className="dest-scroll-buttons">
                <button onClick={() => handleScroll(-item_width)}>←</button>
                <button onClick={() => handleScroll(item_width)}>→</button>
            </div>

            {showQuizContainer && !showQuiz && (
                <div className="quiz-container">
                    <div className="quiz-link-text">
                        <h1>Do you want to know which destination is best for <em>YOU?</em></h1>
                        <h1 onClick={handleQuizClick}>
                            <span className="take-quiz-span"> Take the QUIZ</span>
                        </h1>
                    </div>
                </div>
            )}

            <div className="news-weather-container">
                <div className="news-quiz-container">
                    {viewType === '' && (
                        <h1>Japan <span className="news-title-span">News</span></h1>
                    )}
                    {viewType === 'destinations' && destPages}
                    {viewType === 'news' && newsPages}
                    {viewType === 'quiz' && quizPage}
                    {!viewType && (
                        <div>
                            {newsCards}
                        </div>
                    )}
                </div>

                <div className="weather-container">
                    <div className="weather-subcontainer">
                        <h1>How's the <span className="light-coral">Weather?</span></h1>
                        <Weather />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;