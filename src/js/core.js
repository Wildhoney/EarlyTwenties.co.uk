import React from 'react'
import {render} from 'react-dom'
import {Router, Route, Link} from 'react-router'
import createHashHistory from 'history/lib/createHashHistory';

import App from './app';
import Home from './pages/home';
import About from './pages/about';

document.addEventListener('DOMContentLoaded', () => {

    const history = createHashHistory();

    render((
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="home" component={Home} />
                <Route path="about" component={About} />
            </Route>
        </Router>
    ), document.body);

});
