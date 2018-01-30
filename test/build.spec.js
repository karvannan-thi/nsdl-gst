var test = require('ava');
var nsdlgst = require('../dist/build');

test('the log method', t => {
    t.is(nsdlgst.log('hi'), 'Logging the message : hi');
});