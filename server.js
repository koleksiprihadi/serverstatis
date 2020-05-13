//inisialisasi variable
var http = require('http'),
    parse = require('url').parse,
    join = require('path').join,
    fs = require('fs'),
    root = join(__dirname, 'www'),
    PORT = 3400,

    server = http.createServer(function(req, res){
      var url = parse(req.url),
          path = join(root, url.pathname),
          stream = fs.createReadStream(path);

      stream.on('data', function(bagian){
        res.write(bagian);
      });
      stream.on('end', function(){
        res.end();
      });
      stream.on('error', function(){
        res.setHeader('Content-Tpe', 'text/html');

        var url_test = "http://localhost:"+ PORT + "/index.html";
        res.write("Klik disini <a href ="+ url_test + ">"+ url_test +"</a>");
        res.end();
      });
    });

    server.listen(PORT);
    console.log('port :'+ PORT +'Server File');
