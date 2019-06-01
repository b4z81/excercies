import React from 'react';
import './App.scss';
import WeahterCard from './components/weatherCard/weatherCard';

class App extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            currentLocation: {
                lat: undefined,
                lng: undefined,
            },
            isLoading: true,
            error: null
        };
    }

    componentDidMount() {
        this.findCoordinates();
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <section className="content">
                    <div className="cards">
                        <WeahterCard location={this.state.currentLocation} />
                    </div>
                </section>
            );
        }
        else {
            return (
                <section className="content">
                    <div className="loadingRing"></div>
                </section>
            );
        }
    }

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const coords = position.coords;

            this.setState({
                currentLocation: {
                    lat: coords.latitude.toFixed(3),
                    lng: coords.longitude.toFixed(3)
                },
                isLoading: false
            });
        },error => window.alert(error.message));
    }
}

export default App;
