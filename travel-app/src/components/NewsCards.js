import React from 'react';

const NewsCard = (props) => {

    let truncatedText = '';
    if (props.text) {
        truncatedText = props.text.substring(0, 500);
    }
    
    return (
        <div className="news-card">
            <div className="news-card-text">
            <h2>{props.title}</h2>
            <p>{props.date}</p>
            <p>{truncatedText}...</p>
            <p className={"light-coral"} onClick={props.handleNewsClick}>Read more...</p>
            </div>

            <div>
            <img src={props.img} alt="Image" className="news-card-img"/>
            </div>
        </div>
    );
};

export default NewsCard;