import 'gsap';
import React from 'react';
import {findDOMNode} from 'react-dom';

export default class extends React.Component {

    /**
     * @method componentWillMount
     * @return {void}
     */
    componentDidMount() {

        const pictures = findDOMNode(this.refs.pictures);

        console.log('x');

        new TimelineLite()
            .from(pictures, 0.5, { transform: `scale(0.9)` }, 'appear')
            .from(pictures, 2, { opacity: 0 }, 'appear')
            .to(pictures, 0.2, { opacity: 1, transform: `scale(1.03)` })
            .to(pictures, 0.5, { transform: `scale(1.0)` });

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <main className="home">
                <section className="pictures" ref="pictures">
                    <h2>Portfolio</h2>
                    <div className="browser">
                        <ul className="categories">
                            <li><a>Nature</a></li>
                            <li><a>Travel</a></li>
                            <li><a>Urban Landscapes</a></li>
                        </ul>
                        <div className="viewer" style={{ backgroundImage: `url(images/11537596_10205200764592805_3267665941076830075_o.jpg)` }}>
                        </div>
                    </div>
                </section>
            </main>
        );

    }

}
