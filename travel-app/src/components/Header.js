import React from 'react';
import JAPANBANNER2 from '../images/JAPANBANNER2.png';

export default function Header() {
    return (
<div className="banner-container">
    <a href="./App.js">
        <img src={JAPANBANNER2} alt="Tokyo skyline in black and watercolors in the back" className="banner-img"/>
    </a>
</div>
    );
}