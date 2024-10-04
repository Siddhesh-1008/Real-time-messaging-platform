// CREATING SERVER USING NODEJS
const express=require('express')
const app=express()
const http=require('http')
const path = require('path')

//SERVER CREATED FOR EXPRESS APPLICATION
//Here, we create an HTTP server using the http module's createServer method. We pass the app (the Express application) as an argument. This means the server will use the Express application to handle incoming requests.
const server=http.createServer(app)

//GETTING PORT NUMBER FROM .env IF DOESNOT GET PORT NUMBER THEN KEEP DEFAULLT PORT NUMBER 3000 
const PORT=process.env.PORT || 3000

//SETTIG UP PUBLIC STATIC FILES
app.use(express.static(path.join(__dirname,'/public')))

//ROUTE request
app.get("/",function(req,res){
    // res.send("HI")
    //TO RENDER OR RUN HTML FILE DIRNAME GIVES THE PATH TO THE FOLDER AND WE ADD '/index.html' TO IT 
    res.sendFile(__dirname+'/index.html')
})

//SERVER LISTEN AT PORT NUMBER 3000
server.listen(PORT,()=>{
    console.log(`LISTENING ON PORT ${PORT}`)
})


//SETUP SOCKET
//SOCKET 
//FIRST REQUIRE SOCKET.IO AND PASSED SERVER ON WHICH SOCKET.IO SHOULD WORK
//Initializing Socket.IO: By passing server to require("socket.io"), you're telling Socket.IO to use your existing HTTP server for setting up real-time communication.
const io=require("socket.io")(server)

/*io.on('connection', ...):
    This line listens for new clients that are requesting for connecting to the server.HERE CLIENT.JS
function(socket) { ... }:
    This is what happens when a new client connects.
socket.on('message',(msg)=>{ console.log(msg)})
    IT IS RESPONSIBLE FOR RECEIVEING MSG FROM CLIENT SIDE
    basically it gets msgtext that emit by socket from client.js
    and send it to all the clients that are requestiong for connecting to the server
socket.broadcast.emit('message',msg)
     socket.broadcast.emit('message', msg) is used to send a message to all connected clients except the one that originated the message.
socket: Represents the connection with a specific client.
*/
io.on('connection',function(socket){
    console.log("CLIENT CONNECTED")
    socket.on('message',(msg)=>{
        console.log("MESSAGE RECEVIED FROM CLIENT",msg)
        socket.broadcast.emit('message',msg,()=>{
            console.log("MESAGE SENT BY SERVER TO CLIENT")
        })
    })
})

