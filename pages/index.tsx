import React from "react";
import fetch from "isomorphic-unfetch";
import { breakpoints, colorThemes, IColors } from "../scripts/variables";
import Hello from "../components/hello";

interface IHomeProps {
  colors: IColors;
  weatherId: number;
  isDaytime: boolean;
  day?: string;
  time?: string;
}

export default class Home extends React.Component<IHomeProps> {
  public static async getInitialProps({ query }: { query: any }): Promise<IHomeProps> {
    const weatherData: any = await Home.getWeatherData();

    const isDaytime: boolean = query.isDaytime
      ? query.isDaytime === "true"
        ? true
        : false
      : weatherData
      ? Home.getIsDaytime(weatherData.sys.sunrise, weatherData.sys.sunset)
      : true;

    const colors: IColors = query.colorTheme
      ? colorThemes[query.colorTheme]
      : isDaytime
      ? colorThemes.light
      : colorThemes.dark;

    const weatherId: number = query.weatherId
      ? parseInt(query.weatherId, 10)
      : weatherData
      ? weatherData.weather[0].id
      : 0;

    return { colors, weatherId, isDaytime, day: query.day, time: query.time };
  }

  public render(): JSX.Element {
    return (
      <div className="container">
        <div>
          <Hello
            colors={this.props.colors}
            isDaytime={this.props.isDaytime}
            weatherId={this.props.weatherId}
            day={this.props.day}
            time={this.props.time}
          />
          <p>
            Hi! I'm Martin, a UX engineer at Microsoft. I'm still working on this site. In the meantime, you can
            checkout my <a href="https://github.com/mlijanto">GitHub</a> and{" "}
            <a href="https://www.linkedin.com/in/martinlijanto">LinkedIn</a> profiles. Or{" "}
            <a href="https://chrome.google.com/webstore/detail/scrollbar-of-contents/cfmkncejaemmcobmaabfigljmnkeecdm">
              this little Chrome extension
            </a>{" "}
            that I&nbsp;created.
          </p>
        </div>
        <style jsx>{`
          .container {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            color: ${this.props.colors.foreground};
            background: ${this.props.colors.background};
            overflow: hidden;
          }

          & > div {
            position: relative;
            width: 88%;
            min-width: 200px;
            max-width: 1000px;
          }

          & > div:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 53px;
            top: 89px;
            left: 3px;
            background: url("/static/images/bg.jpg") no-repeat center left;
          }

          p {
            position: relative;
            width: 74%;
            margin: 24px 3px;
            font-size: 14px;
            font-weight: 300;
            line-height: 1.48;
            color: ${this.props.colors.foregroundSecondary};
            z-index: 1;
          }

          a {
            color: ${this.props.colors.theme};
            font-weight: ${this.props.isDaytime ? 400 : 300};
            text-decoration: none;
            border-bottom: 1px solid transparent;
          }

          a:hover,
          a:focus {
            border-color: ${this.props.colors.themeSecondary};
          }

          @media (min-width: ${breakpoints.vp1}px) {
            & > div {
              width: 84%;
            }

            & > div:before {
              height: 56px;
              top: 95px;
            }
          }

          @media (min-width: ${breakpoints.vp2}px) {
            .container {
              justify-content: center;
            }

            & > div {
              width: 64%;
            }

            & > div:before {
              height: 65px;
              top: 110px;
            }

            p {
              width: 64%;
              font-size: 15px;
            }
          }

          @media (min-width: ${breakpoints.vp3}px) {
            & > div {
              width: 70%;
            }

            p {
              margin: 28px 3px;
            }
          }

          @media (min-width: ${breakpoints.vp4}px) {
            & > div {
              width: 80%;
            }

            & > div:before {
              height: 73px;
              top: 126px;
            }

            p {
              width: 58%;
              margin: 36px 3px;
              font-size: 16px;
            }
          }
        `}</style>
      </div>
    );
  }

  private static getWeatherData = async (): Promise<any> => {
    return await fetch("http://api.ipstack.com/check?access_key=97e2c7f76cda32d0f609ed71eb31a751")
      .then((res: Response) => {
        return res.json();
      })
      .then((locationJSON: Promise<JSON>) => {
        const location: any = JSON.parse(JSON.stringify(locationJSON));

        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location.city},${
            location.country_code
          }&appid=875ec7cd0ebdf3e110e473f7a3c2a42e&units=imperial`
        );
      })
      .then((res: Response) => {
        return res.json();
      })
      .then((weatherJSON: Promise<JSON>) => {
        return JSON.parse(JSON.stringify(weatherJSON));
      })
      .catch((error: Error) => {
        console.error("Error fetching weather data", error);
        return null;
      });
  };

  private static getIsDaytime = (sunriseUtc: number, sunsetUtc: number): boolean => {
    const now: number = new Date().getTime();
    const sunrise: number = new Date(sunriseUtc * 1000).getTime();
    const sunset: number = new Date(sunsetUtc * 1000).getTime();

    if (now < sunrise || now > sunset) {
      return false;
    } else {
      return true;
    }
  };
}
