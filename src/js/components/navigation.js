import 'gsap';
import React from 'react';
import {findDOMNode} from 'react-dom';
import {fromEvent} from 'baconjs';

export default class extends React.Component {

    /**
     * @method componentDidMount
     * @return {void}
     */
    componentDidMount() {

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <nav>
                <ul>
                    <li><a>Pictures</a></li>
                    <li className="active"><a>About</a></li>
                    <li><a>Contact</a></li>
                </ul>
            </nav>
        );

    }

}
