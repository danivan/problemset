// solutions here
const { asyncOp, RandStream } = require('./lib/lib');
const events = require('events');

//solution for problem 1
const doAsync = (arrInput) => {
    arrInput.reduce( (input) => {
        if (typeof input === 'string') {
			asyncOp(input);
		} else {
			input.map( (mapInput) =>  { asyncOp(mapInput) });
		}
	});
}

//solution for problem 2
class RandStringSource extends events.EventEmitter
{
    constructor (randStream) {
		this.randStream = randStream;
		this.emitDataEvent();
	}

	emitDataEvent () {
		let arrMatch = this.randStream.split('.');
		arrMatch.shift();
		arrMatch.pop();
		if(arrMatch.length > 0) {
			arrMatch.map((data) => {
				this.emit(data);
			});
		}
	}
}

// solution for problem 3
class ResourceManager extends events.EventEmitter
{
	constructor (count) {
		this.count = count;
	}

	borrow (callback) {
		const eventEmitter = this;
		eventEmitter.on('addCount', () => {
			this.count++;
		});

		let resource = {
			release () {
                eventEmitter.emit('addCount');
			},
			count: this.count
		};
		if (this.count > 0) {
		    this.count--;
			callback(resource);
		}	
	}
}
