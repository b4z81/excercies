import React from 'react';
import './weatherCard.scss';
import MapBox from '../mapBox/mapBox';

class WeatherCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            weather: {
                city: undefined,
                list: {}
            },
            currentLocation: {
                lat: undefined,
                lng: undefined,
            },
            isLoading: true,
            error: null
        };

        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async pos => {
                const coords = pos.coords;
                
                this.setState({
                    currentLocation: {
                        lat: coords.latitude.toFixed(3),
                        lng: coords.longitude.toFixed(3)
                    }
                });

                fetch(`/forecast?lat=${this.state.currentLocation.lat}&lon=${this.state.currentLocation.lng}&appid=bc7d98df81a8ca950c00046fd18c66a0`)
                .then(response => response.json())
                .then(data => this.setState({
                    data,
                    isLoading: false 
                }))
                .catch(error => this.setState({ error, isLoading: false }));
            });
        }
    }

    render() {
        if(!this.state.isLoading) {
            return (
                <div className="weatherCard">
                    <div className="weatherCard__side weatherCard__side--front weatherCard__side--front-1">
                        <div className="weatherCard__description">
                            <h3>
                                {this.state.weather.city}
                            </h3>
                            <p>
                                <img alt="" src="../../images/weather/Cloud.svg" />
                            </p>
                            <h4>
                                {this.state.weather.list[0].main.temp}°
                            </h4>
                            <p>Feels like:</p>
                            <p>Humidity: {this.state.weather.list[0].main.humidity}%</p>
                        </div>
                        <ul className="weatherCard__week">
                            {this.state.weather.list.map((value, index) => {
                                return <li key={index}>{value.dt_txt} {value.weather.icon} {value.main.temp_max} {value.main.temp_min}</li>
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