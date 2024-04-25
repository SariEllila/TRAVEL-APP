import React from 'react'

function NewsPages(props) {
    return(
        <div>
            <img src={`${props.img}`}/>
            <h1>{props.title}</h1>
            <h4>{props.date}</h4>
            <h2>{props.text}</h2>
        </div>
    ) 
}

export default NewsPages