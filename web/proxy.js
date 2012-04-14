// Proxy server

var http = require('http'),
    https = require('https'),
    httpProxy = require('http-proxy');

function middleware(res, callback) {
    var _end = res.end;
    res.end = function(data) {
        _end.call(res, data);
        if (callback) callback();
    }
}

var body='';

var proxy = httpProxy.createServer({
    target: { host: 'graph.facebook.com', port: 443, https: true },
    changeOrigin: true },
    function (req, res, proxy) {
        console.log("Received request.");
        var buffer = httpProxy.buffer(req);
        proxy.on('data', function(data) {
            console.log(data);
            body+=data;
        });
        proxy.on('end', function() {
            console.log(body);
        });
       // middleware(res, function() {
       //     console.log("The request was proxied");
       // });
        proxy.proxyRequest(req, res, buffer);
}).listen(8000);

proxy.on('data', function(data) {
  console.log(data);
});
