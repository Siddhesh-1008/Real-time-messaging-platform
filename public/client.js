//GET IO LIBRARY MEANS IMPORT
//const socket = io() establishes a connection between your client (usually a web browser) and the server.
const socket=io()

let name;
//SHOW THE PROMPT UNTIL USER DOESNOT ENTER NAME
do{
    name=prompt("PELASE ENTER UR NAME")
}while(!name)

let h1=document.querySelector(".h")
h1.innerHTML=`WASSUPP:-${name}`

//BASICALLY GET TEXTAREA THEN WHENVER U CLICK ON KEYS THE textarea.addEventListener('keyup') IT WILL RUN
//IF PRESSED KEY IS ENTER THEN run SEND MSG FUNCTION AS WELL A SENT MSG DATA IN SNEDMESSAGE FUNCTION
let textarea=document.querySelector('#textarea')
textarea.addEventListener('keyup',function(e){
    console.log(e)
    if(e.key==='Enter'){
        console.log("MSG DATA->",e.target.value)
        sendMessage(e.target.value)
    }
})

// msg contains MESSAGE TEXT THAT HAS BEEN ENTER IN TEXTAREA
// user:name BASICALLY USER WILL CONTIAN name THAT HAS BEEN ENTER IN A PROMPT
function sendMessage(outgoingmessage){
    let msg={
        user:name,
        message:outgoingmessage.trim() 
    }
    // APPEND IN THE BOXX WHERE MSGS ARE DISPLAYED AS WELL IT IS OUTGOING MSG
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()
    

    //SEND MESSAGE OBJECT FROM CONNECTED CLIENT TO SERVER using socket.emit("name",{object}) AND LLISTEN IT ON 
    socket.emit('message',{
        user:name,
        message:outgoingmessage.trim()
    })
}

//MESSAGEAREA WHERE U WANT TO ADD INCOMING AND OUTGOING MSGS TEXT ALONG WITH NAME
let messageArea=document.querySelector(".message__area")
function appendMessage(msg,type){
    // DYNAMICALLY CREATE HTML ELEMENT
    let maindiv=document.createElement("div")
    let className=type
    maindiv.classList.add(className,'message')

    let markup=`
    <h4>👨${msg.user}</h4>
    <p>${msg.message}</p>
    `
    
    maindiv.innerHTML=markup
    messageArea.appendChild(maindiv)

}

//SOCKET.ON BASICALLT USED FOR SPECIFIC CONNECTION BETWEEN CLIENT AND SERVER
//RECEIVE ALL broadcasted MSG THAT HAS BEEN SENT BY SERVER(RECEIVED FROM SENDER CLIENT)AND THEN ADD TO THE MESSAGE AREA BUT IN INCOMING MSG TYPE 
socket.on("message",(msg)=>{
    console.log("RECEIVED FROM ANOTHER CLIENT",msg)
    appendMessage(msg,'incoming')
    scrollToBottom()
})


//AUTOMAIC SCROLLER
function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}