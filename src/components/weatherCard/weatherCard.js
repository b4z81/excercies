import React from 'react';
import './weatherCard.scss';
import MapBox from '../mapBox/mapBox';
import Moment from 'moment';
import logo from '../../images/icons/04n.svg';

const apiKey = 'bc7d98df81a8ca950c00046fd18c66a0';

class WeatherCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weather: {},
            currentLocation: {
                lat: undefined,
                lng: undefined,
            },
            isLoading: true,
            error: null
        };
    }

    componentDidMount(){
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async pos => {
                const coords = pos.coords;
                
                this.setState({
                    currentLocation: {
                        lat: coords.latitude.toFixed(3),
                        lng: coords.longitude.toFixed(3)
                    }
                });

                fetch(`http://api.openweathermap.org/data/2.5/forecast?lang=it&units=metric&lat=${this.state.currentLocation.lat}&lon=${this.state.currentLocation.lng}&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => 
                    this.setState({
                        weather: data,
                        isLoading: false}))
                .catch(error => this.setState({ error, isLoading: false }))
            });
        }
    }

    render() {
        Moment.locale('it');
        if(!this.state.isLoading) {
            return (
                <div className="weatherCard">
                    <div className="weatherCard__side weatherCard__side--front weatherCard__side--front-1">
                        <div className="weatherCard__description">
                            <h3>
                                {this.state.weather.city.name}
                            </h3>
                            <img alt="" src={`../images/icons/${this.state.weather.list[0].weather[0].icon}.svg`} className="weatherCard__icon" />
                            <img alt="" src={logo} className="weatherCard__icon" />
                            <h4>
                                {this.state.weather.list[0].main.temp.toFixed(0)}°
                            </h4>
                            <p>{this.state.weather.list[0].weather[0].description}</p>
                            <p>Humidity: {this.state.weather.list[0].main.humidity}%</p>
                        </div>
                        <ul className="weatherCard__week">
                            {this.state.weather.list.map((value, index) => {
                                if((index % 8) === 0) {
                                    const day = value.dt_txt;
                                    return (
                                        <li key={index}>
                                            <span>
                                                {Moment(day).format('L')} 
                                            </span>
                                            <span>
                                                {value.weather[0].icon} 
                                            </span>
                                            <span>
                                                {value.main.temp_max} {value.main.temp_min}
                                            </span>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                    <div className="weatherCard__side weatherCard__side--back weatherCard__side--back-1">
                        <div className="weatherCard__description">
                            <MapBox location={this.state.currentLocation} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="weatherCard">
                    <div className="weatherCard__side weatherCard__side--front">
                        <div className="weatherCard__description">
                            <div className="lds-dual-ring"></div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default WeatherCard;