import React from 'react';
import './weatherCard.scss';
import MapBox from '../mapBox/mapBox';
import Moment from 'moment';

class WeatherCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weather: {},
            isLoading: true,
            error: null
        };
    }
    componentDidMount() {
        this.getWeatherFromLocation(this.props.location);
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <div className="weatherCard">
                    <div className="weatherCard__side weatherCard__side--front">
                        <div className="weatherCard__description">
                            <h3>
                                {this.state.weather.city.name}
                            </h3>
                            <span className={"weatherIcon weatherIcon--big weatherIcon--" + this.state.weather.list[0].weather[0].icon}></span>
                            <h4>
                                {this.state.weather.list[0].main.temp.toFixed(0)}°
                            </h4>
                            <p>{this.state.weather.list[0].weather[0].description}</p>
                            <p>Humidity: {this.state.weather.list[0].main.humidity}%</p>
                            <ul className="weatherWeek">
                            {this.state.weather.list.map((value, index) => {
                                if((index % 8) === 0) {
                                    const date = value.dt_txt;
                                    return (
                                        <li className={"weatherWeek__box " + (index === 0 ? 'weatherWeek__box--current' : '')} key={index}>
                                            <span className="weatherWeek__day">
                                                {Moment(date).format('ddd D')} 
                                            </span>
                                            <span className={"weatherIcon weatherIcon--medium weatherIcon--" + this.state.weather.list[index].weather[0].icon}></span>
                                            <span>
                                                {value.main.temp_max.toFixed(0)}° {value.main.temp_min.toFixed(0)}°
                                            </span>
                                        </li>
                                    )
                                }
                            })}
                            </ul>
                        </div>
                    </div>
                    <div className="weatherCard__side weatherCard__side--back">
                        <div className="weatherCard__description">
                            <MapBox location={this.props.location} />
                        </div>
                    </div>
                </div>
            );
        }  else {
            return (                
                <div className="loadingRing"></div>
            );
        }
    }

    getWeatherFromLocation = (location) => {   
        const apiKey = 'bc7d98df81a8ca950c00046fd18c66a0';         

        fetch(`http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${location.lat}&lon=${location.lng}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data =>
            this.setState({
                weather: data,
                isLoading: false
            }))
        .catch(error => this.setState({ error, isLoading: false }))
    }
}

export default WeatherCard;