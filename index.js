// solutions here
const { asyncOp, RandStream } = require('./lib/lib');
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
