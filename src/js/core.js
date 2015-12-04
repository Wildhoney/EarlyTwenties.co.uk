import 'gsap';
import React from 'react';
import {render, findDOMNode} from 'react-dom';
import {fromEvent} from 'baconjs';

class Background extends React.Component {

    static propTypes = {
        previous: React.PropTypes.string.isRequired,
        current: React.PropTypes.string.isRequired,
        next: React.PropTypes.string.isRequired
    };

    /**
     * @method componentWillMount
     * @return {void}
     */
    componentWillMount() {

        this.state = {
            previous: this.props.previous,
            current: this.props.current,
            next: this.props.next,
            animating: false
        };

    }

    /**
     * @method componentDidMount
     * @return {void}
     */
    componentDidMount() {

        const element  = findDOMNode(this.refs.animation);
        const previous = findDOMNode(this.refs.previous);
        const current  = findDOMNode(this.refs.current);
        const next     = findDOMNode(this.refs.next);

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
                    this.setState({
                        current: this.state.next,
                        animating: false
                    });
                };

                timeline
                    .to(element, duration, { top: clockwise ? '-100%' : '100%' }, 'main')
                    .to(current, duration, { opacity: 0, transform: 'scale(0.7)' }, 'main')
                    .to(clockwise ? next : previous, duration, { opacity, transform: 'scale(1)' }, 'main')
                    .to(element, 0, { top: '0%' }, 'reset')
                    .to(current, 0, { opacity, transform: 'scale(1)' }, 'reset')
                    .to(clockwise ? next : previous, 0, { opacity, transform: 'scale(0.7)', onComplete: swapImages }, 'reset');

            });

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        const {previous, current, next} = this.state;

        return (
            <section className="background">
                <ul className="inner" ref="animation">
                    <li ref="previous" style={{ backgroundImage: `url(${previous})` }} />
                    <li ref="current" style={{ backgroundImage: `url(${current})` }} />
                    <li ref="next" style={{ backgroundImage: `url(${next})` }} />
                </ul>
            </section>
        );

    }

}

document.addEventListener('DOMContentLoaded', () => {

    render(
        <Background previous="images/landscape-large-03.jpg"
                    current="images/Inside_the_Batad_rice_terraces.jpg"
                    next="images/landscape-large-03.jpg" />,
        document.body
    );

});
