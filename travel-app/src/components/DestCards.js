import React from 'react'

function DestCards(props) {

return (
    <div class="destinations-container">
    <div>
    <img src={`${props.img}`} class="dest-cards-img"/>
    <h1 class="dest-cards-city">{props.city}</h1>
    </div>
    </div>
)

}

export default DestCards