import React from 'react';

function NewsPages(props) {
    const formatTextWithLineBreaks = (text) => {
        // Split text into paragraphs and wrap each paragraph in a <div> with a class for indentation
        return text.split('\n\n').map(paragraph => `<div class="news-page-paragraph">${paragraph}</div>`).join('');
    };

    return (
        <div className="newspage-container">
            <h1>{props.title}</h1>
            <img src={props.img} className="news-page-img" alt="News" />
            <p className="news-page-date">{props.date}</p>
            <div
                className="news-page-text"
                dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(props.text) }}
            />
            <button className="newspage-back-button" onClick={props.onBackToNews}>Back to News</button>
        </div>
    );
}

export default NewsPages;