import React from 'react'
import {render} from 'react-dom'
import {Router, Route, Link} from 'react-router'
import createHashHistory from 'history/lib/createHashHistory';

import Home from './pages/home';
import About from './pages/about';
import Background from './components/background';
import Navigation from './components/navigation';

class App extends React.Component {

    render() {
        return (
            <main>
                <Background {...this.props} images={[
                    '1453387_10153573511785500_1899755281_n.jpg',
                    '1501290_10153594457450500_512797407_o.jpg',
                    '10919772_10204037928682634_3559155281616018900_o.jpg',
                    '11537596_10205200764592805_3267665941076830075_o.jpg'
                ]} />
                <Navigation />
                <header>
                    <h1>Portfolio of <var>Maria</var>.</h1>
                </header>
            </main>
        );
    }

}

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