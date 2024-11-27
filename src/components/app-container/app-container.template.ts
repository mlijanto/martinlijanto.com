import { ViewTemplate, html } from "@microsoft/fast-element";
import { AppContainer } from "./app-container";

export const template: ViewTemplate<AppContainer> = html<AppContainer>`<div>
  <h1>
    ${(x) => x.welcomeMessageOne}
    <br />
    ${(x) => x.welcomeMessageTwo}
    <br />
    <span>${(x) => x.welcomeMessageThree}.</span>
  </h1>
  <p>
    Hi! I'm Martin, a UX engineer at Microsoft. I'm still working on this site. In the meantime, you can checkout my
    <a href="https://github.com/mlijanto">GitHub</a> and
    <a href="https://www.linkedin.com/in/martinlijanto">LinkedIn</a> profiles. Or
    <a href="https://chrome.google.com/webstore/detail/scrollbar-of-contents/cfmkncejaemmcobmaabfigljmnkeecdm">
      this little Chrome extension
    </a>
    that I&nbsp;created.
  </p>
</div>`;
