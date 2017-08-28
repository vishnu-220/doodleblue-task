var tropo = require('tropo');

tropo.on('call:incoming', function (event) {
	tropo.log.info("A special someone?");
});

tropo.on('call:outgoing', function (event) {
	tropo.log.info("Good for you. I hope it's your mom.");
});

tropo.on('call:connected', function(event) {
    event.call.say('Hello World!');
});
