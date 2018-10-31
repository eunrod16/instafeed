if (window.WebSocket === undefined) {
   console.log("sockets not supported");
}else {
   if (typeof String.prototype.startsWith != "function") {
      String.prototype.startsWith = function (str) {
         return this.indexOf(str) == 0;
      };
   }

   window.addEventListener("load", repeatOnLoad, false);
}

	   function repeatOnLoad(){
		onLoad();
		setInterval(onLoad, 90000);
	   }
var conectado = 0;
var count = 0;
function onLoad() {
  if(!conectado){
    //var wsUri="wss://ec2-18-217-228-0.us-east-2.compute.amazonaws.com";
    //var wsUri = "ws://localhost:5000";
    var wsUri = "wss://dreadful-beast-29781.herokuapp.com"
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
  }
}

function onOpen(evt) {
   console.log("Connected to server");
   conectado = 1;
}

function onClose(evt) {
   console.log("Not connected");
   conectado = 0;
}

function onMessage(evt) {
   // There are two types of messages:
   // 1. a chat participant message itself
   // 2. a message with a number of connected chat participants
   var message = evt.data;
   if(message=="test conection") return;
   count++;
   if(count==9){
     $( "#app" ).fadeOut( "fast" );
     $( ".loading" ).fadeIn( "slow" );
     setTimeout(function(){
       $( ".loading" ).fadeOut( "fast" );
       $( "#app" ).fadeIn( "slow" );
     }, 3000);
     count=0;
   }
   else{
     $( ".loading" ).fadeOut( "fast" );
     $( "#app" ).fadeIn( "fast" );
   }
   var array = JSON.parse(message);
   console.log(array);
   $('#app').html('');
   for(var index in array) {
     $('#app').prepend(`
       <div class="card-container">
         <div class="card-especial">
         <div class="side">
             <div class="card p-3 card`+index+`" style="     -webkit-column-break-inside:avoid;
                -moz-column-break-inside:avoid;
                     column-break-inside:avoid;">
               <img class="card-img-top" src="`+array[index].img+`" alt="Card image cap">
               <div class="card-body">
                 <h5 class="card-title">`+array[index].user+`</h5>
                 <p class="card-text">`+array[index].text+`</p>
                 <i style="float:right; color:#888;"class="fa fa-instagram fa-2x" aria-hidden="true"></i>
               </div>
             </div>
             </div>

            </div>
           </div>`)
    }



}

function onError(evt) {
   console.log("Communication error");
}

function addMessage() {
   var message = chat.value;
   chat.value = "";
   websocket.send(message);
}
