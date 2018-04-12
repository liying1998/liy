var ws = require("nodejs-websocket")
var PORT=3000


//客户端的计数器
var clientCount = 0

var server = ws.createServer(function(conn){
	console.log("New connection")
	clientCount++
	conn.nickname = 'user'+clientCount
	var mes={}
	mes.type="enter"
	mes.data=conn.nickname + 'come in'
	broadcast(JSON.stringify(mes))
	conn.on("text",function(str){
		console.log("Received"+str)
		var mes={}
		mes.type="message"
		mes.data=conn.nickname+'says'+str
		broadcast(JSON.stringify(mes))
		//这里实现的就是将消息广播出去
		//实现一个echo的功能的话，这里就只是需要conn.sendText(str)
		//实现的就是直接将接受到的消息发送回去
	})
	conn.on("close",function(code,reason){
		console.log("connection close")
		var mes={}
		mes.type="leave"
		mes.data=conn.nickname+"leave"
		broadcast(JSON.stringify(mes))
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

//这里实现的就是一个客户端的广播,告诉我们谁来了
function broadcast(str){
	server.connections.forEach(function(connection){
      connection.sendText(str)
	})
}

