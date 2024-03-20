'use strict';

const Hapi   = require('@hapi/hapi');

const Server = new Hapi.Server({
//    host: 'localhost',  // 20240320 chloong -- hashed out for open up access from other network interface 0.0.0.0 instead of localhost only
    port: 3000
});
const Hello  = require('./lib/hello');

Server.route({
    method: 'GET',
    path: '/hello/{user}',
    handler: function (request, reply) {

        const result = Hello(decodeURIComponent(request.params.user));
        return result;
    }
});

// don't start server if this file was required

if (!module.parent) {

    Server.start((err) => {

        if (err) {
            throw err;
        }

        console.log(`Server running at: ${Server.info.uri}`);
    });
}

module.exports = Server;
