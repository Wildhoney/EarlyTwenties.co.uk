import 'gsap';
import React from 'react';
import {findDOMNode} from 'react-dom';

export default class extends React.Component {

    /**
     * @method componentWillMount
     * @return {void}
     */
    componentDidMount() {

        this.state = { expanded: false };

        const pictures = findDOMNode(this.refs.pictures);

        new TimelineLite()
            .from(pictures, 1, { transform: `scale(0.7)` }, 'appear')
            .from(pictures, 2, { opacity: 0 }, 'appear');

    }

    changeSize() {

        const home = findDOMNode(this.refs.home);
        const pictures = findDOMNode(this.refs.pictures);

        if (!this.state.expanded) {

            const width = getComputedStyle(pictures).getPropertyValue('width');

            new TimelineLite()
                .to(home, .35, { padding: '30px' })
                .to(pictures, .25, { maxWidth: `${Number.MAX_SAFE_INTEGER}`, width: `${innerWidth}px` }, 'expand')
                .to(pictures, .25, { transform: 'scale(1.03)' }, 'expand+=0.15')
                .to(pictures, .25, { transform: 'scale(1)' });

            this.setState({ expanded: true });
            return;

        }

        new TimelineLite()
            .to(home, .35, { padding: '100px 30px 30px 30px' })
            .to(pictures, .6, { maxWidth: '600px', width: '600px' }, 'expand');

        this.setState({ expanded: false });

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <main className="home" ref="home">
                <section className="pictures" ref="pictures" onDoubleClick={() => this.changeSize()}>
                    <h2>Portfolio</h2>
                    <div className="browser">
                        <ul className="categories">
                            <li><a>Nature</a></li>
                            <li><a>Travel</a></li>
                            <li><a>Urban Landscapes</a></li>
                        </ul>
                    </div>
                </section>
            </main>
        );

    }

}
