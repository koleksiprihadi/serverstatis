//inisialiasasi variable

var http = require('http'),
    parse = require('url').parse,
    join = require('path').join,
    fs = require('fs'),
    root = join(__dirname, 'www'),
    PORT = 3400,
    qs = require('querystring'),
    data = [];

server = http.createServer(function (req, res) {

    if ('/' == req.url) {
        switch (req.method) {
            case 'GET':
                tampilkanForm(res);
                break;
            case 'POST':
                prosesData(req, res);
                break;
            default:
                badRequest(res);
        }
    } else {
        notFound(res);
    }

});

function tampilkanForm(res) {
    var html = '<html><head><title>Keseharianku</title></head><body>'
        + '<h1>Keseharianku</h1>'
        + '<form method="post" action="/">'
        + '<p><input type="text" name="kegiatanPagi"></p>'
        + '<p><input type="submit" value="Simpan"></p>'
        + '</form></body></html>';

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function prosesData(req, res) {
    var body = '';
    req.setEncoding('utf-8');
    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {
        var data = qs.parse(body);
        res.setHeader('Content-Type', 'text/plain');
        res.end('Kegiatan Pagiku adalah ' + data.kegiatanPagi)
    });
}

function badRequest(res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('400 - Bad Request');
}

function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404 - Not Found');
}


server.listen(PORT);
console.log('server http berjalan pada port 3400');
