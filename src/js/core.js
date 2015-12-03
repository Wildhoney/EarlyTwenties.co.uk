import {fromEvent} from 'baconjs';

fromEvent(document, 'mousewheel')
    .filter(event => Math.abs(event.deltaY) > 100)
    .debounceImmediate(250)
    .onValue(event => console.log('Move'));
