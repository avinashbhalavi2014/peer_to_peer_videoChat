//WEBRTC - stands for real time communication
//setup api in browser
//peer to peer communication to send data back and forth
//usind simple peer npm install simple-peer --save
navigator.webkitGetUserMedia({video: true, audio:true},function(stream){

var Peer =  require('simple-peer'); //give us a class
var peer = new Peer({//create new instance of class
//we need to know which peer is initiating this session
 initiator :location.hash==='#init',  //setting true / false
 //initiating whether it is first peer or not
 trickle: false,
 stream:stream
});
//we have individual peer to use
//we want our peer to discover each other for this we will use
//server that let each each other know and signal each other capabilities

//listen for event
peer.on('signal',function(data){
  document.getElementById('yourId').value=JSON.stringify(data);
  console.log('yourId:',data);
});

document.getElementById('connect').addEventListener('click',function(){
  var otherId = JSON.parse(document.getElementById('otherId').value)
  peer.signal(otherId)
  console.log('otherId:',otherId);
});

document.getElementById('send').addEventListener('click',function(){
  var yourMessage = document.getElementById('yourMessage').value
  peer.send(yourMessage);
  console.log('YourMessage:',yourMessage);
})

peer.on('data',function(data){
  document.getElementById('message').textContent += data+'\n'
  console.log(data);
});
//for video_chat
  peer.on('stream',function(stream){
    var video = document.createElement('video')
    document.body.appendChild(video);

   //video.src = window.URL.createObjectURL(stream)
   video.srcObject = stream;
    video.play()//this will begin playing video
  })
},function(err){
  console.log(err);
});
