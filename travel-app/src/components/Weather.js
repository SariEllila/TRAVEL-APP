import React, { useState, useEffect } from 'react';
import searchIcon from '../components/assets/search.png';
import cloudsun from '../components/assets/cloudsun.png';
import sun from '../components/assets/sun.png';
import rainsun from '../components/assets/rainsun.png';

export default function Weather() {
    const api_key = "646b2e4f14b3e8142de7fcf6827cdd20";

    const [wicon, setWicon] = useState(cloudsun);
    const [humidity, setHumidity] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    const [temperature, setTemperature] = useState('');
    const [location, setLocation] = useState('Tokyo');
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        search(location);
    }, []);

    const search = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            setHumidity(Math.floor(data.main.humidity) + '%');
            setWindSpeed(Math.floor(data.wind.speed) + 'km/h');
            setTemperature(Math.floor(data.main.temp) + '°C');
            setLocation(data.name);

            if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
                setWicon(sun);
            } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
                setWicon(rainsun);
            } else {
                setWicon(sun);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = () => {
        search(inputValue);
        setInputValue('');
    };

    return (
        <div className="weather-container">
        <div className="weather-item">
            <div className="weather-top-bar">
    <div className="weather-search-bar">
  <input 
    className="city-input" 
    type="text" 
    placeholder="Search City..."
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
  />
  <div>
    <img src={searchIcon} alt="Search" onClick={handleSearch} className="weather-search-icon"/>
  </div>
</div>

                    <div className="weather-location">
                        <h1>{location}</h1>
                    </div>
                    <div className="weather-temp">
                        <h2>{temperature}</h2>
                    </div>

            </div>

            <div>
                <img src={wicon} alt="Weather icon" className="weather-img" />
            </div>

            <div className="data-container">
                <div className="weather-element">
                    <img src="" className="icon" alt="" />
                    <div className="weather-data">
                    <div className="weather-text">
                            <h3>Humidity</h3>
                        </div>
                        <div className="humidity-percentage">
                            <h4>{humidity}</h4>
                        </div>
                    </div>
                </div>
                <div className="weather-element">
                    <img src="" className="icon" alt="" />
                    <div className="weather-data">
                    <div className="weather-text">
                            <h3>Wind Speed</h3>
                        </div>
                        <div className="wind-speed">
                            <h4>{windSpeed}</h4>
                        </div>

                    </div>
                </div>
            </div>
        </div>    
        </div>
    );
}