import React from 'react'

export default function DestPages(props) {

return (
    <div>
        <h1 className="dest-page-title">{props.city}</h1>
        <img src={`${props.img}`} className="dest-page-img"/>
        <p><span className="dest-page-data">Location:</span> {props.location}</p>
        <p><span className="dest-page-data">Distance from Tokyo:</span> {props.distanceFromTokyo}</p>
        <p><span className="dest-page-data">Population:</span> {props.population}</p>
        <h4 className="dest-page-text"><span className="light-coral">About:<br /></span> {props.description}</h4>
        <h4 className="dest-page-text"><span className="light-coral">Sights:<br /></span>{props.popularSights}</h4>
    </div>
)

}