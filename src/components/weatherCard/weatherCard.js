import React from 'react';
import './weatherCard.scss';
import MapBox from '../mapBox/mapBox';
import cors from 'cors';

const API = '/forecastrss/';
const LOCATION = 'location=sunnyvale&lat=37.372&lon=-122.038&format=json';

class WeatherCard extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          hits: [],
        };
    }

    render() {
        return (
            <div class="weatherCard">
                <div class="weatherCard__side weatherCard__side--front weatherCard__side--front-1">
                    <div class="weatherCard__description">1</div>
                </div>
                <div class="weatherCard__side weatherCard__side--back weatherCard__side--back-1">
                    <div class="weatherCard__description"><MapBox /></div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        fetch('https://weather-ydn-yql.media.yahoo.com/forecastrss/location=sunnyvale&lat=37.372&lon=-122.038&format=json', {mode:cors})
            .then(response => response.json())
            .then(data => this.setState({ hits: data.hits }));
    }
}

export default WeatherCard;