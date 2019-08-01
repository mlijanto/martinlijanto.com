import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import { breakpoints, colorThemes, IColors } from "./scripts/variables";
import Hello from "./components/hello";

const Container = styled.div<{ colors: IColors; isDaytime: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: ${props => props.colors.foreground};
  background: ${props => props.colors.background};
  overflow: hidden;

  @media (min-width: ${breakpoints.vp2}px) {
    justify-content: center;
  }

  & > div {
    position: relative;
    width: 88%;
    min-width: 200px;
    max-width: 1000px;

    @media (min-width: ${breakpoints.vp1}px) {
      width: 84%;
    }

    @media (min-width: ${breakpoints.vp2}px) {
      width: 64%;
    }

    @media (min-width: ${breakpoints.vp3}px) {
      width: 70%;
    }

    @media (min-width: ${breakpoints.vp4}px) {
      width: 80%;
    }
  }

  & > div:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 53px;
    top: 89px;
    left: 3px;
    background: url("/images/bg.jpg") no-repeat center left;

    @media (min-width: ${breakpoints.vp1}px) {
      height: 56px;
      top: 95px;
    }

    @media (min-width: ${breakpoints.vp2}px) {
      height: 65px;
      top: 110px;
    }

    @media (min-width: ${breakpoints.vp4}px) {
      height: 73px;
      top: 126px;
    }
  }

  p {
    position: relative;
    width: 74%;
    margin: 24px 3px;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.48;
    color: ${props => props.colors.foregroundSecondary};
    z-index: 1;

    @media (min-width: ${breakpoints.vp2}px) {
      width: 64%;
      font-size: 15px;
    }

    @media (min-width: ${breakpoints.vp3}px) {
      margin: 28px 3px;
    }

    @media (min-width: ${breakpoints.vp4}px) {
      width: 58%;
      margin: 36px 3px;
      font-size: 16px;
    }
  }

  a {
    color: ${props => props.colors.theme};
    font-weight: ${props => (props.isDaytime ? 400 : 300)};
    text-decoration: none;
    border-bottom: 1px solid transparent;
  }

  a:hover,
  a:focus {
    border-color: ${props => props.colors.themeSecondary};
  }
`;

interface IAppStates {
  colors: IColors;
  weatherId: number;
  isDaytime: boolean;
  day?: string;
  time?: string;
}

class App extends React.Component<any, IAppStates> {
  public componentDidMount(): void {
    this.getWeatherData().then((weatherData: any): void => {
      const queryParams: URLSearchParams = new URLSearchParams(this.props.location.search);

      const isDaytime: boolean =
        queryParams.get("isDaytime") !== null
          ? queryParams.get("isDaytime") === "true"
            ? true
            : false
          : weatherData
          ? this.getIsDaytime(weatherData.sys.sunrise, weatherData.sys.sunset)
          : true;

      const colors: IColors =
        queryParams.get("colorTheme") !== null
          ? colorThemes[queryParams.get("colorTheme")!]
          : isDaytime
          ? colorThemes.light
          : colorThemes.dark;

      const weatherId: number =
        queryParams.get("weatherId") !== null
          ? parseInt(queryParams.get("weatherId")!, 10)
          : weatherData
          ? weatherData.weather[0].id
          : 0;

      const day: string | undefined = queryParams.get("day") !== null ? queryParams.get("day")! : undefined;
      const time: string | undefined = queryParams.get("time") !== null ? queryParams.get("time")! : undefined;

      this.setState({
        isDaytime,
        colors,
        weatherId,
        day,
        time
      });
    });
  }

  public render(): JSX.Element {
    return (
      <>
        {this.state && this.state.colors && (
          <Container className="app" colors={this.state.colors} isDaytime={this.state.isDaytime}>
            <div>
              <Hello
                colors={this.state.colors}
                isDaytime={this.state.isDaytime}
                weatherId={this.state.weatherId}
                day={this.state.day}
                time={this.state.time}
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
          </Container>
        )}
      </>
    );
  }

  private getWeatherData = async (): Promise<any | null> => {
    return await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=d5881f3f27784a8f8d0d1e2930819aad")
      .then((res: Response) => {
        return res.json();
      })
      .then((locationJSON: Promise<JSON>) => {
        const location: any = JSON.parse(JSON.stringify(locationJSON));

        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.country_code2}&appid=875ec7cd0ebdf3e110e473f7a3c2a42e&units=imperial`
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

  private getIsDaytime = (sunriseUtc: number, sunsetUtc: number): boolean => {
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

export default withRouter(App);
