const { RotaryEncoder } = require('./rotary-encoder/rotary-encoder');

class VolumeRotaryController {
    constructor(context, device) {
    }
}

class BienophoneRadio {
    constructor() {
        this.volumeRotaryEncoder = new RotaryEncoder('/dev/input/event0');
        // Add listeners to change volume
        // Add listener to set volume
    }
}