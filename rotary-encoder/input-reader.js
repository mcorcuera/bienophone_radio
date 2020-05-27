const fs = require('fs');
const { EventEmitter } = require('events');

const EV_SYN = 0;
const EV_REL = 2;

const EVENTS = {
    [EV_SYN]: 'sync',
    [EV_REL]: 'rel',
};

class InputReader extends EventEmitter {
    constructor(device, onRead) {
        super();
        this.device = device;
        this.buffer = new Buffer(24);
        this.onRead = onRead;

        this._open();
    }

    _open() {
        fs.open(this.device, 'r', (error, fd) => {
            if (error) {
                console.error(error);
            } else {
                this.fd = fd;
                this._startRead();
            }
        })
    }

    _startRead() {
        fs.read(this.fd, this.buffer, 0, 24, null, () => this._onRead());
    }

    _onRead() {
        const event = this._parse(this.buffer);
        this.emit(EVENTS[event.type], event);
        this._startRead();
    }

    _parse(buffer) {
        const event = {
            timeS: buffer.readUInt32LE(0),
            timeMS: buffer.readUInt32LE(4),
            type: buffer.readUInt16LE(8),
            code: buffer.readUInt16LE(10),
            value: buffer.readInt32LE(12),
        }
        return event;
    }
}

module.exports = {
    InputReader,
};