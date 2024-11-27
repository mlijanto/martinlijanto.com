import { FASTElement, customElement, observable } from "@microsoft/fast-element";
import { colors, IColors } from "../../variables/colors";
import { template } from "./app-container.template";
import { styles } from "./app-container.styles";

@customElement({ name: "app-container", template, styles })
export class AppContainer extends FASTElement {
  @observable
  public daytime?: boolean;

  @observable
  public weatherId?: number;

  @observable
  public welcomeMessageOne?: string;

  @observable
  public welcomeMessageTwo?: string;

  @observable
  public welcomeMessageThree?: string;

  private colors: IColors = colors.light;

  public async connectedCallback(): Promise<void> {
    super.connectedCallback();

    await this.setData();
    this.setColors();
    this.generateWelcomeMessage();
  }

  private async setData(): Promise<void> {
    const queryParams: URLSearchParams = new URLSearchParams(window.location.search);

    let ip: string = "";

    try {
      ip = await (await fetch("https://api.ipify.org/")).text();
    } catch (error) {
      console.log(error);
    }

    const location = ip
      ? await (
          await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=d5881f3f27784a8f8d0d1e2930819aad&ip=${ip}`)
        ).json()
      : null;

    const weather = ip
      ? await (
          await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.country_code2}&appid=875ec7cd0ebdf3e110e473f7a3c2a42e&units=imperial`,
          )
        ).json()
      : null;

    this.daytime =
      queryParams.get("daytime") !== null
        ? queryParams.get("daytime") === "true"
          ? true
          : false
        : weather
          ? this.getDaytime(weather.sys.sunrise, weather.sys.sunset)
          : this.getDaytime();

    this.colors =
      queryParams.get("theme") !== null
        ? colors[queryParams.get("theme") === "light" ? "light" : "dark"]
        : this.daytime
          ? colors.light
          : colors.dark;

    this.weatherId =
      queryParams.get("weatherId") !== null
        ? parseInt(queryParams.get("weatherId")!, 10)
        : weather
          ? weather.weather[0].id
          : 0;
  }

  private setColors(): void {
    this.style.setProperty("--color-foreground", this.colors.foreground);
    this.style.setProperty("--color-foreground-secondary", this.colors.foregroundSecondary);
    this.style.setProperty("--color-background", this.colors.background);
    this.style.setProperty("--color-theme", this.colors.theme);
    this.style.setProperty("--color-theme-secondary", this.colors.themeSecondary);
  }

  private getDaytime = (sunriseUtc?: number, sunsetUtc?: number): boolean => {
    if (!sunriseUtc || !sunsetUtc) {
      return new Date().getHours() < 18 && new Date().getHours() >= 6;
    } else {
      const sunrise: Date = new Date(sunriseUtc * 1000);
      const sunset: Date = new Date(sunsetUtc * 1000);
      const now: Date = new Date();

      return now >= sunrise && now < sunset;
    }
  };

  private generateWelcomeMessage = (): void => {
    const day: string = this.generateDayString();
    const time: string = this.generateTimeString();

    let first: string = day;
    let second: string = time;
    let third: string = "hello";

    // https://openweathermap.org/weather-conditions
    switch (this.weatherId) {
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
        second = day;
        third = time;
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
        second = day;
        third = time;
        break;

      case 701:
        first = "Misty";
        second = day;
        third = time;
        break;

      case 711:
        first = "Smoky";
        second = day;
        third = time;
        break;

      case 721:
        third = "haze";
        break;

      case 731:
      case 761:
        first = "Dusty";
        second = day;
        third = time;
        break;

      case 741:
        first = "Foggy";
        second = day;
        third = time;
        break;

      case 751:
        first = "Sandy";
        second = day;
        third = time;
        break;

      case 762:
        third = "ash";
        break;

      case 771:
        third = "squall";
        break;

      case 781:
        third = "tornado";
        break;

      case 800:
        if (this.daytime) {
          first = "Sunny";
        } else {
          first = "Clear";
        }
        second = day;
        third = time;
        break;

      case 801:
      case 802:
      case 803:
      case 804:
        first = "Cloudy";
        second = day;
        third = time;
        break;
    }

    this.welcomeMessageOne = first;
    this.welcomeMessageTwo = second;
    this.welcomeMessageThree = third;
  };

  private generateDayString = (): string => {
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
