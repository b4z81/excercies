import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapBox extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                    lat: this.props.location.lat,
                    lng: this.props.location.lng
                }}>
                <Marker position={{ lat: this.props.location.lat, lng: this.props.location.lng }} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyD_yHhu7UUwggb4aKzulYJkSIe3osy9NzQ'
})(MapBox);