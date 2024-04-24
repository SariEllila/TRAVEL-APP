import React from 'react'

function NewsCards (props) {

    return (
        <div className="news-container">
        <div className="news-cards-item">
        <img src={`${props.img}`} class="news-cards-img"/>
        <h1 className="news-cards-title">{props.title}</h1>
        <h3>{props.date}</h3>
        </div>
        <div>
            {props.text}
        </div>
        </div>
    )

}

export default NewsCards