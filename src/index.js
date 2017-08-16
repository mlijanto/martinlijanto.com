import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';

if (process.env.NODE_ENV === 'production') {
    require('./manifest.json');
    require('./sw-registration.js');
}

ReactDOM.render(<App />, document.getElementById('root'));