import React from 'react';
import JAPANBANNER from '../images/JAPANBANNER.png';

export default function Header() {
    return (
<div className="banner-container">
    <a href="./App.js">
        <img src={JAPANBANNER} alt="Tokyo skyline in black and watercolors in the back" className="banner-img"/>
    </a>
</div>
    );
}