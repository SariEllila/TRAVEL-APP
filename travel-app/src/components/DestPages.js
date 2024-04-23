import React from 'react'

export default function DestPages(props) {

return (
    <div>
        <img src={`${props.img}`}/>
        <h1>{props.city}</h1>
        <h4>{props.location}</h4>
        <h4>{props.distanceFromTokyo}</h4>
        <h4>{props.population}</h4>
        <p>{props.description}</p>
        <h4>{props.popularSights}</h4>
    </div>
)

}