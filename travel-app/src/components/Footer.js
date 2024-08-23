import React from 'react';
import newsicon from './assets/newsicon.png';
import weathericon from './assets/weathericon.png';
import quizicon from './assets/quizicon.png';

export default function Footer({ onSectionClick }) {
    return (
        <div className="footer">
            <div className="footer-web">
                <h4>© 2024</h4>
            </div>

            <div className="footer-mobile">
                <img
                    src={weathericon}
                    className="footer-weathericon"
                    onClick={() => onSectionClick('weather')} // Navigate to weather section
                    alt="Weather"
                />
                <img
                    src={newsicon}
                    className="footer-newsicon"
                    onClick={() => onSectionClick('news')} // Navigate to news section
                    alt="News"
                />
                <img
                    src={quizicon}
                    className="footer-quizicon"
                    onClick={() => onSectionClick('quiz')} // Navigate to quiz section
                    alt="Quiz"
                />
            </div>
        </div>
    );
}