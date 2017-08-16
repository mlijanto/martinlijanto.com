import React from 'react';
import { getTime } from '../utilities';

export default class Tile extends React.Component {
    render() {
        return (
            <div className="tile">
                <section>
                    <h1>Good<br />{getTime()}.</h1>
                    <p>I'm Martin. I do front-end web development at Microsoft.
                        I'm still working on this site. In the meantime, you can checkout my <a href="https://github.com/mlijanto">GitHub</a> and <a href="https://www.linkedin.com/in/martinlijanto">LinkedIn</a> profiles.
                        Or <a href="https://chrome.google.com/webstore/detail/scrollbar-of-contents/cfmkncejaemmcobmaabfigljmnkeecdm">this little Chrome extension</a> that I&nbsp;created.
                    </p>
                </section>
            </div>
        );
    }
}