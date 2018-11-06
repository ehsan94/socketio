var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
let roomOneData = '';

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api', function(req, res) {
    res.sendFile(__dirname + '/api.html');
});



app.get('/endPoint', function (req, res) {
 
 	//console.log("here comes"+roomOneData);
    res.send( JSON.stringify(roomOneData) );
})

io.on('connection', function(socket) {
    console.log('A new WebSocket wants to join');
      socket.on('room', function(room) {
      	 console.log('A new WebSocket connection has been established with room'+room);
        socket.join(room);
		});
});

//broadcasting random data to rooms
setInterval(function() {
	var min=1; 
    var max=4;  
    var rooms = Math.floor(Math.random() * (+max - +min) + +min); 
    //console.log(rooms);
    var stockprice = Math.floor(Math.random() * 1000);
    if(rooms === 1){
       roomOneData = stockprice;
      // console.log("value"+roomOneData);
    }else{
    	roomOneData = '';
    }
  io.sockets.in(rooms).emit('stock price update', stockprice);
 
}, 700);


http.listen(8000, function() {
    console.log('Listening on *:8000');
});