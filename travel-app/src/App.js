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
    const [viewType, setViewType] = useState('');
    const [showQuizContainer, setShowQuizContainer] = useState(true);
    const [savedAnswers, setSavedAnswers] = useState([]);
    const [showNews, setShowNews] = useState(false);

    const weatherRef = useRef(null); 
    const newsRef = useRef(null); 
    const quizRef = useRef(null); 

    const scrollToSection = (section) => {
        setViewType(section); // Set the viewType first

        // Delay the scroll to ensure state update takes effect
        setTimeout(() => {
            if (section === 'news') {
                if (newsRef.current) {
                    newsRef.current.scrollIntoView({ behavior: 'instant' });
                }
            } else if (section === 'quiz') {
                if (quizRef.current) {
                    quizRef.current.scrollIntoView({ behavior: 'instant' });
                }
            } else if (section === 'weather') {
                if (weatherRef.current) {
                    weatherRef.current.scrollIntoView({ behavior: 'instant' });
                }
            }
        }, 0); // A slight delay to allow viewType to update
    };

    function handleDestClick(id) {
        setSelectedDestinationId(id);
        setSelectedNewsId(null); 
        setShowQuiz(false); 
        setViewType('destinations'); 
    }

    function handleNewsClick(id) {
        setSelectedNewsId(id);
        setSelectedDestinationId(null); 
        setShowQuiz(false); 
        setViewType('news'); 
    }

    function handleQuizClick() {
        setShowQuiz(true);
        setSelectedDestinationId(null); 
        setSelectedNewsId(null); 
        setViewType('quiz'); 
    }

    function handleBackToNews() {
        setSelectedNewsId(null); 
        setSelectedDestinationId(null); 
        setShowQuiz(false); 
        setViewType(''); 
    }

    function saveAnswers(answer) {
        setSavedAnswers(prevAnswers => [...prevAnswers, answer]);
    }

    function navigateToDestination(cityName) {
        const destination = DestinationsData.find(item => item.city === cityName);
        if (destination) {
            setSelectedDestinationId(destination.id);
            setSelectedNewsId(null); 
            setShowQuiz(false); 
            setViewType('destinations'); 
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
            onBackToNews={handleBackToNews} 
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

    const handleShowNews = () => {
        setShowNews(true);
    };

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
                <div className={`news-quiz-container ${viewType === 'quiz' ? 'quiz-view' : ''}`}>
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

                <div ref={weatherRef}>
                    <div className="weather-subcontainer">
                        <h1>How's the <span className="light-coral">Weather?</span></h1>
                        <Weather />
                    </div>
                </div>
            </div>

            <div className="weather-bottom-space">
            </div>

            <Footer onSectionClick={scrollToSection} />
        </div>
    );
}

export default App;