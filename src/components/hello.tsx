import React from "react";
import styled from "styled-components";
import { breakpoints, IColors } from "../scripts/variables";

const Heading = styled.h1`
  position: relative;
  margin: 0;
  font-size: 60px;
  font-weight: 900;
  line-height: 0.8;
  letter-spacing: -0.036em;
  z-index: 1;

  @media (min-width: ${breakpoints.vp1}px) {
    font-size: 64px;
  }

  @media (min-width: ${breakpoints.vp2}px) {
    font-size: 74px;
  }

  @media (min-width: ${breakpoints.vp4}px) {
    font-size: 84px;
  }
`;

const Last = styled.span<{ color: string }>`
  display: block;
  margin-left: -3px;
  color: ${props => props.color};
`;

interface IHelloProps {
  colors: IColors;
  isDaytime: boolean;
  weatherId: number;
  day?: string;
  time?: string;
}

export default class Hello extends React.Component<IHelloProps> {
  public render(): JSX.Element {
    return <Heading>{this.generateWelcomeMessage()}</Heading>;
  }

  private generateWelcomeMessage = (): JSX.Element => {
    const day: string = this.generateDayString();
    const time: string = this.generateTimeString();

    let first: string = "";
    let second: string = day;
    let third: string = time;

    // https://openweathermap.org/weather-conditions
    switch (this.props.weatherId) {
      case 200:
      case 201:
      case 202:
      case 210:
      case 211:
      case 212:
      case 221:
      case 230:
      case 231:
      case 232:
        first = day;
        second = time;
        third = "thunderstorm";
        break;

      case 300:
      case 301:
      case 302:
      case 310:
      case 311:
      case 312:
      case 313:
      case 314:
      case 321:
        first = day;
        second = time;
        third = "drizzle";
        break;

      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
      case 511:
      case 520:
      case 521:
      case 522:
      case 531:
        first = "Rainy";
        break;

      case 600:
      case 601:
      case 602:
      case 611:
      case 612:
      case 613:
      case 615:
      case 616:
      case 620:
      case 621:
      case 622:
        first = "Snowy";
        break;

      case 701:
        first = "Misty";
        break;

      case 711:
        first = "Smoky";
        break;

      case 721:
        first = day;
        second = time;
        third = "haze";
        break;

      case 731:
      case 761:
        first = "Dusty";
        break;

      case 741:
        first = "Foggy";
        break;

      case 751:
        first = "Sandy";
        break;

      case 762:
        first = day;
        second = time;
        third = "ash";
        break;

      case 771:
        first = day;
        second = time;
        third = "squall";
        break;

      case 781:
        first = day;
        second = time;
        third = "tornado";
        break;

      case 800:
        if (this.props.isDaytime) {
          first = "Sunny";
        } else {
          first = "Clear";
        }
        break;

      case 801:
      case 802:
      case 803:
      case 804:
        first = "Cloudy";
        break;
    }

    return (
      <>
        {first}
        <br />
        {second}
        <br />
        <Last color={this.props.colors.background}>{third}.</Last>
      </>
    );
  };

  private generateDayString = (): string => {
    if (this.props.day) {
      return this.props.day;
    }

    const day: number = new Date().getDay();

    switch (day) {
      case 0:
        return "Sunday";

      case 1:
        return "Monday";

      case 2:
        return "Tuesday";

      case 3:
        return "Wednesday";

      case 4:
        return "Thursday";

      case 5:
        return "Friday";

      case 6:
        return "Saturday";

      default:
        return "";
    }
  };

  private generateTimeString = (): string => {
    if (this.props.time) {
      return this.props.time;
    }

    const hour: number = new Date().getHours();

    if (hour < 12) {
      return "morning";
    } else if (hour < 16) {
      return "afternoon";
    } else if (hour < 20) {
      return "evening";
    } else {
      return "night";
    }
  };
}
