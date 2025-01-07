import React from 'react';
import newsicon from './assets/newsicon.png';
import weathericon from './assets/weathericon.png';
import quizicon from './assets/quizicon.png';

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-web">
                <h4>© 2024</h4>
            </div>

            <div className="footer-mobile">
                {/* Link to news section */}
                <a href="#news" className="footer-newsicon-link">
                    <img
                        src={newsicon}
                        className="footer-newsicon"
                        alt="News"
                    />
                </a>

                {/* Link to weather section */}
                <a href="#weather" className="footer-weathericon-link">
                    <img
                        src={weathericon}
                        className="footer-weathericon"
                        alt="Weather"
                    />
                </a>

                {/* Link to quiz section */}
                <a href="#quiz" className="footer-quizicon-link">
                    <img
                        src={quizicon}
                        className="footer-quizicon"
                        alt="Quiz"
                    />
                </a>
            </div>
        </div>
    );
}