// create http server using http library
const http = require("http")
const WebSocketServer = require("websocket").server
let connection = null;


const httpServer = http.createServer((req, res) => {

    console.log("We have received a request");  // first call (upgrade)
});


const WebSocket = new WebSocketServer({
    "httpServer" : httpServer // handshake part. Send the http server created which underneath it has a socket which has the TCP connection
})

WebSocket.on("request", request => {
    // make the GET request (upgrade) then decide if you want(accept) the websocket request or not. Send the Switching protocol and get the connection after accepting
    connection = request.accept(null, request.origin) // accept anything. Also check the origin if it's trusted or not

    connection.on("open", () => console.log("Opened!!!")) // if the connection is open call the func
    connection.on("close", () => console.log("Closed!!!")) 
    connection.on("message", message => {

        console.log(`Received message ${message.utf8Data}`) // print the message received from client
    })
    sendEvery5seconds();
})

httpServer.listen(8080, () => console.log("My server is listening on port 8080"))

// function to send data from server to client every 5 sec
function sendEvery5seconds() {

    connection.send(`Message ${Math.random()}`)

    setTimeout(sendEvery5seconds, 5000)
}





// Browser code -- Websocket comes with every browser
// In the developer console(chrome)
    // ws = new WebSocket("ws://localhost:8080")
    // ws.onmessage = message => console.log(`We received a message from server ${message.data}`)

//  Send message from server to client
    // connection.send("Hello Client, this is a message from me the server")

//  Send message from client to server
    // ws.send("Hello server, it's me the client")
    // ws.close() // close connection