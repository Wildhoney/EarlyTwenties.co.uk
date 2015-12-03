import {fromEvent} from 'baconjs';

fromEvent(document, 'mousewheel')
    .filter(event => Math.abs(event.deltaY) > 50)
    .debounceImmediate(250)
    .onValue(event => {

        const element = document.querySelector('section.background');
        const current = element.querySelector('div:nth-of-type(1)');
        const next    = element.querySelector('div:nth-of-type(2)');

        current.classList.add('shift');
        next.classList.add('shift');

    });
