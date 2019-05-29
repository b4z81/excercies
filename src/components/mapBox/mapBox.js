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
                    lat: -1.2884,
                    lng: 36.8233
                }}>
                <Marker position={{ lat: 48.00, lng: -122.00 }} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ''
})(MapBox);