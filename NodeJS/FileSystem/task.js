var http = require("http");
var fs = require("fs");
http
  .createServer(function (request, response) {
    fs.readFile("MyBlog.txt", function (err, data) {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      return response.end();
    });
  })
  .listen(8080);
fs.writeFile(
  "MyBlog.txt",
  " I am glad to welcome you on my website devoted to traveling. My name is Uliana, I am 30 years old and as you may guess I am fond of exploring this big and incredible world. I was born in Kiev, Ukraine and I am living and working there between my travels. I am sorry for my English which is far away from perfect, but I hope it will not disturb you much and you will find my articles and stories interesting and informative. .",
  function (err) {
    if (err) throw err;
    console.log("Updated!");
  }
);
console.log("Server running at http://127.0.0.1:8080/");
