var ws = require("nodejs-websocket")
var PORT=3000

var sever = ws.createServer(function(conn){
	console.log("New connection")
	conn.on("text",function(str){
		console.log("Received"+str)
		conn.sendText(str.toUpperCase()+"!!!")
		//实现一个echo的功能的话，这里就只是需要conn.sendText(str)
		//实现的就是直接将接受到的消息发送回去
	})
	conn.on("close",function(code,reason){
		console.log("connection close")
	})
	conn.on("error",function(err){
		console.log("handle err")
		console.log(err)
	})
}).listen(PORT)

console.log("websocket sever listening on port "+PORT)

//conn 代表的是连接
//8001 代表的是端口
//conn.on("text"   客户端有消息发过来的时候的回掉函数
// str  里面放的就是消息

