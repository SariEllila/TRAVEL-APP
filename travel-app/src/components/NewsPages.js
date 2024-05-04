import React from 'react'

function NewsPages(props) {
    return(
        <div>
            <h1 className="news-page-title">{props.title}</h1>
            <img src={`${props.img}`} className="news-page-img"/>
            <p className="news-page-date">{props.date}</p>
            <h4 className="news-page-text">{props.text}</h4>
        </div>
    ) 
}

export default NewsPages