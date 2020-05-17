// solutions here
const { asyncOp, RandStream } = require('./lib/lib');
const events = require('events');

//solution for problem 1
const doAsync = (arrInput) => {
    arrInput.reduce( (input) => {
        if (typeof input === 'string') {
			asyncOp(input);
		} else {
			input.map(asyncOp(input));
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
		arrMatch.map((data) => {
			this.emit(data);
		});
	}
}
