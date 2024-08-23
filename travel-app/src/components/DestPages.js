import React, { useRef, useEffect } from 'react';

export default function DestPages(props) {

    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []); 

    return (
        <div className="dest-page" ref={contentRef}>
            <h1>{props.city}</h1>
            <img 
                src={props.img} 
                className="dest-page-img" 
                alt={`${props.city} image`} 
            />
            <p>
                <span className="dest-page-data">Location:</span> {props.location}
            </p>
            <p>
                <span className="dest-page-data">Distance from Tokyo:</span> {props.distanceFromTokyo}
            </p>
            <p>
                <span className="dest-page-data">Population:</span> {props.population}
            </p>
            <h4 className="dest-page-text">
                <span className="dest-page-subtitle">About:<br /></span> {props.description}
            </h4>
            <h4 className="dest-page-text">
                <span className="dest-page-subtitle">Sights:<br /></span>{props.popularSights}
            </h4>
        </div>

    );
}