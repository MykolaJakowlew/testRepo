const cmd = require('node-command-line');
const { to } = require('await-to-js');
async function SaveRequire(name) {
    console.log('Start');
    try {
        return require(name);
    } catch (err) {
        console.log('Run CMD');
        [err] = await to(cmd.run(`npm i --save ${name}`));
        console.log('End');
        if (err) {
            console.error('SaveRequire:' + JSON.stringify(err, null, '  '));
            return null;
        } else {
            return require(name);
        }
    }
}
low_start();

function low_start() {
    SaveRequire('http').then(http => {
        const server = http.createServer(function(request, response) {
            console.log((new Date()) + ' HTTP server. URL' + request.url + ' requested.');

            switch (request.url) {
                case '/':
                    {
                        if (request.method !== 'GET') {
                            break;
                        }
                        response.writeHead(200, { 'Content-Type': 'text/html' });
                        response.write("Hello world!");
                        response.end();
                        break;
                    }
                default:
                    {
                        response.writeHead(404, { 'Content-Type': 'text/html' });
                        response.write(404);
                        response.end();
                    }
            }
        });
        server.listen(8080, function() {
            console.log((new Date()) + " Server is listening on port " + 8080);
        });
    });


}