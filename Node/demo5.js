var app = require('http').createServer()
var io = require('socket.io')(app)
var clientCount=0
var PORT=3000
app.listen(PORT);

io.on('connection', function (socket) {
  clientCount++
  socket.nickname = 'user'+clientCount
  io.emit('enter', socket.nickname + 'come in')
  socket.on('message', function (str) {
    io.emit('message',socket.nickname+'says: '+str)
  })

  socket.on('disconnect',function(){
  	 io.emit('leave',socket.nickname+"leave") 
  })
})

console.log("websocket server listening on port:"+PORT)
//socket代表的是客户端的连接
//emit:发送数据
// socket.emit  这里是给其中socket的客户端发送消息
// io.emit   进行广播 
//{ hello: 'world' }  发送的对象
//socket.on('my other event'  我们可以给里面添加任何的事件

