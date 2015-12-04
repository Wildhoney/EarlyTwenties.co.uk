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
            .from(pictures, 0.25, { opacity: 0 }, 'appear')
            .to(pictures, 0.2, { opacity: 1, transform: `scale(1.03)` })
            .to(pictures, 0.5, { transform: `scale(1.0)` });

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {
        return (

            <section className="canvas">
                <section className="pictures" ref="pictures">
                    <h2>About Me</h2>
                </section>
            </section>

        );
    }

}
