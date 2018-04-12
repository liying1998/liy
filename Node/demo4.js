var app = require('http').createServer()
var io = require('socket.io')(app);

app.listen(3000);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
//socket代表的是客户端的连接
//emit:发送数据
//{ hello: 'world' }  发送的对象