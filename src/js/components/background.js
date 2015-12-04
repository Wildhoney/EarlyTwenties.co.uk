import 'gsap';
import React from 'react';
import {findDOMNode} from 'react-dom';
import {fromEvent} from 'baconjs';

export default class extends React.Component {

    static propTypes = {
        index: React.PropTypes.number,
        images: React.PropTypes.array.isRequired
    };

    /**
     * @method componentWillMount
     * @return {void}
     */
    componentWillMount() {

        this.state = {
            images: this.props.images,
            index: this.props.index || 0,
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

                const clockwise = event.deltaY > 0;
                const duration = 0.7;
                const opacity = 1;
                const view = clockwise ? next : previous;

                const swapImages = () => {

                    const {index, images} = this.state;
                    const replaceIndex    = clockwise ? index + 1 : index - 1;

                    this.setState({
                        index: images[replaceIndex] ? replaceIndex : (clockwise ? 0 : images.length - 1),
                        animating: false
                    });

                };

                new TimelineLite()
                    .to(previous.querySelector('div.image'), 0, { transform: 'scale(1)' })
                    .to(current.querySelector('div.image'), 0, { transform: 'scale(1)' })
                    .to(next.querySelector('div.image'), 0, { transform: 'scale(1)' })

                    .to(container, duration, { transform: 'scale(1)' }, 'main')
                    .to(ul, duration, { top: clockwise ? '-100%' : '100%' }, 'main')
                    .to(current, duration, { opacity: 0, transform: 'scale(0.7)' }, 'main')
                    .to(view, duration, { opacity, transform: 'scale(1)' }, 'main')
                    .to(ul, 0, { top: '0%' }, 'reset')
                    .to(current, 0, { opacity, transform: 'scale(1)' }, 'reset')
                    .to(view, 0, { opacity, transform: 'scale(0.7)', onComplete: swapImages }, 'reset')

                    .to(previous.querySelector('div.image'), 3, { transform: 'scale(1.03)' }, 'reset-=0.5')
                    .to(current.querySelector('div.image'), 3, { transform: 'scale(1.03)' }, 'reset-=0.5')
                    .to(next.querySelector('div.image'), 3, { transform: 'scale(1.03)' }, 'reset-=0.5');

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
            <main>
                <section className="background" ref="container">
                    <ul className="inner" ref="animation">
                        <li ref="previous">
                            <div className="image">
                                <img src={`images/${previous}`} />
                            </div>
                        </li>
                        <li ref="current">

                            <div className="image">
                                <img src={`images/${images[index]}`} />
                            </div>

                            <div className="container" ref="view">
                                {this.props.children}
                            </div>

                        </li>
                        <li ref="next">
                            <div className="image">
                                <img src={`images/${next}`} />
                            </div>
                        </li>
                    </ul>
                </section>
            </main>
        );

    }

}
