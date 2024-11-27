import { ElementStyles, css } from "@microsoft/fast-element";
import { breakpoints } from "../../variables/breakpoints";

export const styles: ElementStyles = css`
  :host {
    --color-foreground: #131313;
    --color-foreground-secondary: #000;
    --color-background: #f1f1f1;
    --color-theme: rgb(255, 128, 24);
    --color-theme-secondary: rgba(255, 128, 24, 0.8);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    color: var(--color-foreground);
    background: var(--color-background);
    overflow: hidden;
  }

  @media (min-width: ${breakpoints.vp2}) {
    :host {
      justify-content: center;
    }
  }

  :host > div {
    position: relative;
    width: 88%;
    min-width: 200px;
    max-width: 1000px;
  }

  @media (min-width: ${breakpoints.vp1}) {
    :host > div {
      width: 84%;
    }
  }

  @media (min-width: ${breakpoints.vp2}) {
    :host > div {
      width: 64%;
    }
  }

  @media (min-width: ${breakpoints.vp3}) {
    :host > div {
      width: 70%;
    }
  }

  @media (min-width: ${breakpoints.vp4}) {
    :host > div {
      width: 80%;
    }
  }

  :host > div:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 53px;
    top: 89px;
    left: 3px;
    background: url("/images/bg.jpg") no-repeat center left;
  }

  @media (min-width: ${breakpoints.vp1}) {
    :host > div:before {
      height: 56px;
      top: 95px;
    }
  }

  @media (min-width: ${breakpoints.vp2}) {
    :host > div:before {
      height: 65px;
      top: 110px;
    }
  }

  @media (min-width: ${breakpoints.vp4}) {
    :host > div:before {
      height: 73px;
      top: 126px;
    }
  }

  h1 {
    position: relative;
    margin: 0;
    font-size: 60px;
    font-weight: 900;
    line-height: 0.8;
    letter-spacing: -0.036em;
    z-index: 1;
  }

  @media (min-width: ${breakpoints.vp1}) {
    h1 {
      font-size: 64px;
    }
  }

  @media (min-width: ${breakpoints.vp2}) {
    h1 {
      font-size: 74px;
    }
  }

  @media (min-width: ${breakpoints.vp4}) {
    h1 {
      font-size: 84px;
    }
  }

  h1 > span {
    display: block;
    margin-left: -3px;
    color: var(--color-background);
  }

  p {
    position: relative;
    width: 74%;
    margin: 24px 3px;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.48;
    color: var(--color-foreground-secondary);
    z-index: 1;
  }

  @media (min-width: ${breakpoints.vp2}) {
    p {
      width: 64%;
      font-size: 15px;
    }
  }

  @media (min-width: ${breakpoints.vp3}) {
    p {
      margin: 28px 3px;
    }
  }

  @media (min-width: ${breakpoints.vp4}) {
    p {
      width: 58%;
      margin: 36px 3px;
      font-size: 16px;
    }
  }

  a {
    color: var(--color-theme);
    font-weight: 300;
    text-decoration: none;
    border-bottom: 1px solid transparent;
  }

  :host([daytime]) a {
    font-weight: 400;
  }

  a:hover,
  a:focus {
    border-color: var(--color-theme-secondary);
  }
`;
