import React from 'react';

function DestCards(props) {
    return (
        <div className="destinations-container">
            <div className="dest-cards-item" onClick={props.handleDestClick}>
                <img 
                    src={props.img} 
                    className="dest-cards-img" 
                    alt={`${props.city} image`} 
                />
                <h1 className="dest-cards-city">{props.city}</h1>
            </div>
        </div>
    );
}

export default DestCards;