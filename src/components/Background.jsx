import React from 'react';
import { sun, getSunriseSunset } from '../utilities';

const BgColor1920Webp = require('../assets/images/bg-color-1920.webp');
const BgColor1440Webp = require('../assets/images/bg-color-1440.webp');
const BgColor1280Webp = require('../assets/images/bg-color-1280.webp');
const BgColor1024Webp = require('../assets/images/bg-color-1024.webp');
const BgColor800Webp = require('../assets/images/bg-color-800.webp');

const BgColor1920Jpg = require('../assets/images/bg-color-1920.jpg');
const BgColor1440Jpg = require('../assets/images/bg-color-1440.jpg');
const BgColor1280Jpg = require('../assets/images/bg-color-1280.jpg');
const BgColor1024Jpg = require('../assets/images/bg-color-1024.jpg');
const BgColor800Jpg = require('../assets/images/bg-color-800.jpg');

const BgBw1920Webp = require('../assets/images/bg-bw-1920.webp');
const BgBw1440Webp = require('../assets/images/bg-bw-1440.webp');
const BgBw1280Webp = require('../assets/images/bg-bw-1280.webp');
const BgBw1024Webp = require('../assets/images/bg-bw-1024.webp');
const BgBw800Webp = require('../assets/images/bg-bw-800.webp');

const BgBw1920Jpg = require('../assets/images/bg-bw-1920.jpg');
const BgBw1440Jpg = require('../assets/images/bg-bw-1440.jpg');
const BgBw1280Jpg = require('../assets/images/bg-bw-1280.jpg');
const BgBw1024Jpg = require('../assets/images/bg-bw-1024.jpg');
const BgBw800Jpg = require('../assets/images/bg-bw-800.jpg');

export default class Background extends React.Component {
    render() {
        if (this.props.sun === sun.sunrise) {
            return (
                <picture>
                    <source srcset={BgColor1920Webp} media="(min-width: 1441px)" type="image/webp" />
                    <source srcset={BgColor1440Webp} media="(min-width: 1281px)" type="image/webp" />
                    <source srcset={BgColor1280Webp} media="(min-width: 1025px)" type="image/webp" />
                    <source srcset={BgColor1024Webp} media="(min-width: 801px)" type="image/webp" />
                    <source srcset={BgColor800Webp} media="(min-width: 0)" type="image/webp" />
                    <source srcset={BgColor1920Jpg} media="(min-width: 1441px)" />
                    <source srcset={BgColor1440Jpg} media="(min-width: 1281px)" />
                    <source srcset={BgColor1280Jpg} media="(min-width: 1025px)" />
                    <source srcset={BgColor1024Jpg} media="(min-width: 801px)" />
                    <source srcset={BgColor800Jpg} media="(min-width: 0)" /> 
                    <img srcset={BgColor1280Jpg} src={BgColor1280Jpg} alt="Blurred photograph of Seattle skyline at dusk" />
                </picture>
            );
        } else {
            return (
                <picture>
                    <source srcset={BgBw1920Webp} media="(min-width: 1441px)" type="image/webp" />
                    <source srcset={BgBw1440Webp} media="(min-width: 1281px)" type="image/webp" />
                    <source srcset={BgBw1280Webp} media="(min-width: 1025px)" type="image/webp" />
                    <source srcset={BgBw1024Webp} media="(min-width: 801px)" type="image/webp" />
                    <source srcset={BgBw800Webp} media="(min-width: 0)" type="image/webp" />
                    <source srcset={BgBw1920Jpg} media="(min-width: 1441px)" />
                    <source srcset={BgBw1440Jpg} media="(min-width: 1281px)" />
                    <source srcset={BgBw1280Jpg} media="(min-width: 1025px)" />
                    <source srcset={BgBw1024Jpg} media="(min-width: 801px)" />
                    <source srcset={BgBw800Jpg} media="(min-width: 0)" />
                    <img srcset={BgBw1280Jpg} src={BgBw1280Jpg} alt="Black and white photograph of Seattle skyline at dusk" />
                </picture>
            );
        }
    }
}