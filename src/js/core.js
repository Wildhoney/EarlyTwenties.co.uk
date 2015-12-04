import 'gsap';
import React from 'react';
import {render, findDOMNode} from 'react-dom';
import {fromEvent} from 'baconjs';

class Background extends React.Component {

    static propTypes = {
        images: React.PropTypes.array.isRequired
    };

    /**
     * @method componentWillMount
     * @return {void}
     */
    componentWillMount() {

        this.state = {
            images: this.props.images,
            index: 0,
            animating: false
        };

    }

    /**
     * @method componentDidMount
     * @return {void}
     */
    componentDidMount() {

        const container = findDOMNode(this.refs.container);
        const ul        = findDOMNode(this.refs.animation);
        const previous  = findDOMNode(this.refs.previous);
        const current   = findDOMNode(this.refs.current);
        const next      = findDOMNode(this.refs.next);

        fromEvent(document, 'mousewheel')
            .filter(event => Math.abs(event.deltaY) > 100)
            .debounceImmediate(250)
            .filter(() => !this.state.animating)
            .onValue(event => {

                this.setState({ animating: true });

                const timeline = new TimelineLite();
                const clockwise = event.deltaY > 0;
                const duration = 1.2;
                const opacity = 0.7;

                const swapImages = () => {

                    const {index, images} = this.state;
                    const replaceIndex    = clockwise ? index + 1 : index - 1;

                    this.setState({
                        index: images[replaceIndex] ? replaceIndex : (clockwise ? 0 : images.length - 1),
                        animating: false
                    });

                };

                timeline
                    .to(container, duration, { transform: 'scale(1)' }, 'main')
                    .to(ul, duration, { top: clockwise ? '-100%' : '100%' }, 'main')
                    .to(current, duration, { opacity: 0, transform: 'scale(0.7)' }, 'main')
                    .to(clockwise ? next : previous, duration, { opacity, transform: 'scale(1)' }, 'main')
                    .to(ul, 0, { top: '0%' }, 'reset')
                    .to(current, 0, { opacity, transform: 'scale(1)' }, 'reset')
                    .to(clockwise ? next : previous, 0, { opacity, transform: 'scale(0.7)', onComplete: swapImages }, 'reset')
                    .to(container, 3, { transform: 'scale(1.02)' });

            });

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        const {images, index} = this.state;
        const previous = images[index - 1] || images[images.length - 1];
        const next = images[index + 1] || images[0];

        return (
            <section className="background" ref="container">
                <ul className="inner" ref="animation">
                    <li ref="previous"><img src={`images/${previous}`} /></li>
                    <li ref="current"><img src={`images/${images[index]}`} /></li>
                    <li ref="next"><img src={`images/${next}`} /></li>
                </ul>
            </section>
        );

    }

}

document.addEventListener('DOMContentLoaded', () => {

    render(
        <Background images={[
            '1453387_10153573511785500_1899755281_n.jpg',
            '1501290_10153594457450500_512797407_o.jpg',
            '10919772_10204037928682634_3559155281616018900_o.jpg',
            '11537596_10205200764592805_3267665941076830075_o.jpg'
        ]} />,
        document.body
    );

});
