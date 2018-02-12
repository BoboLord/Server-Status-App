const net = require('net');

function ping(port, opts){
	opts = Object.assign({timeout: 1000}, opts);
    //console.log(port)

	return new Promise((resolve => {

		const socket = new net.Socket();

		const onError = () => {
            socket.destroy();
            //console.log(opts)
            console.log("false1")
			resolve(false);
		};

		socket.setTimeout(opts.timeout);
		socket.on('error', onError);
		socket.on('timeout', onError);
        //console.log("black1")


		socket.connect(port, opts.host, () => {
            console.log("true1");

            socket.end();

			resolve(true);
		})
    }))
}

exports.ping = ping;