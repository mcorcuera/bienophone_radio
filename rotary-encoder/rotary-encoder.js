const { EventEmitter } = require('events');
const { InputReader } = require('./input-reader');

const ROTATE_CLOCKWISE = -1;
const ROTATE_COUNTERCLOCKWISE = 1;

class RotaryEncoder extends EventEmitter {
    constructor(device, buttonGpio = undefined) {
        super();
        this._inputReader = new InputReader(device);
        this._inputReader.on('rel', event => {
            const rotation = event.value === ROTATE_CLOCKWISE ? 'clock' : 'counter';
            this.emit('rotation', rotation);
        });
    }
}

// const encoder = new RotaryEncoder('/dev/input/event0');
// encoder.on('rotation', rotation => console.log(rotation));