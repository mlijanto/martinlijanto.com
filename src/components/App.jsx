import React from 'react';
import SunCalc from 'suncalc';

import Background from './Background.jsx';
import Tile from './Tile.jsx';
import { sun, getSunriseSunsetByHour } from '../utilities';

import '../styles/main.scss';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.googleGeolocationURL = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCvIdoRERBXPh2HdY8xkc95_WU4MtoQ6_A';

        this.getSunriseSunset();
    }

    getSunriseSunset() {
        if (self.fetch) {
            fetch(this.googleGeolocationURL, { method: 'POST' }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                this.getSunriseSunsetFallback();
                console.log('Geolocation service response was not ok.');
            }).then((locationJson) => {
                let hour = new Date().getHours();
                let sunTime = SunCalc.getTimes(new Date(), locationJson.location.lat, locationJson.location.lng);

                if (hour < sunTime.sunrise.getHours() || hour > sunTime.sunset.getHours()) {
                    this.setState({
                        sun: sun.sunset
                    });
                }
            }).catch((error) => {
                this.getSunriseSunsetFallback();
                console.log(`Geolocation service error: ${error.message}`);
            });
        } else {
            this.getSunriseSunsetFallback();
        }
    }

    getSunriseSunsetFallback() {
        this.setState({
            sun: getSunriseSunsetByHour()
        })
    }

    render() {
        return (
            <div className={this.state.sun}>
                <Background sun={this.state.sun} />
                <Tile />
            </div>
        );
    }
}