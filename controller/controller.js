// Controller Source

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
var validStart = false;
var vectorReady = false;
var socket;

var gestureManager = new GestureManager(false);

function main()
{

  gestureManager.doubleTapThresholdMs = 400; // The maximum time between two taps for it to be registered as a doubleTap
  gestureManager.longTouchThresholdMs = 3500; // The minimum hold time for a long touch
  gestureManager.doubleTapCallback = function()
  {
    console.log("Double Tap Detected");
  };
  gestureManager.touchStartCallbackUser = touchStartCallback;
  document.addEventListener("touchmove", touchMoveCallback, {passive:false});
  gestureManager.touchEndCallbackUser = touchEndCallback;


  var ws = new WebSocket("ws://149.153.106.148:8080/wstest");

  //called when the websocket is opened
  ws.onopen = function() {
    var message = {};
    message.type = "connect";
    message.data = "controller";
    var mString = JSON.stringify(message);
    ws.send(mString);
  };

  //called when the client receives a message
  ws.onmessage = function (evt) {
    console.log("Message Received, Discarded");
 };

 init(ws);

 socket = ws;
}

function touchStartCallback(e) {
  var centerX = window.innerWidth / 2;
  var centerY = window.innerHeight / 2;
  var rad = Math.min(canvas.width, canvas.height) * 0.4;
  if(getDistance(centerX, centerY, e.touches[0].clientX, e.touches[0].clientY) < rad)
  {
    startX = centerX;
    startY = centerY;
    validStart = true;
  }
}

function touchMoveCallback(e) {
  if(validStart)
  {
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;
    vectorReady = true;
    render();
  }
}

function touchEndCallback(e) {
  if(vectorReady)
  {
    validStart = false;
    vectorReady = false;
    sendUpdate(socket);
  }
  render();
}

function init(ws) {
  // Canvas Setup
  var canvas = document.createElement("canvas");
  canvas.id = "canvas";

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext('2d');
  document.body.appendChild(canvas);
  render();
}

function render()
{
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle="#000000";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  var rad = Math.min(canvas.width, canvas.height) * 0.4;
  ctx.arc(canvas.width / 2, canvas.height / 2, rad, 0, 2 * Math.PI);
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.fillStyle = "grey";
  ctx.fill();
  if(vectorReady)
  {
    ctx.strokeStyle="#FF0000";
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
}

function getDistance(x1, y1, x2, y2)
{
  return Math.sqrt((x2 -x1) * (x2 -x1) + (y2 - y1) * (y2 - y1));
}

function sendUpdate(ws)
{
  console.log("Send Update: " + startX + "," + startY + " - " + endX + "," + endY);
  var object = {};
  object.type = "vec";
  object.data = { x: startX - endX, y: startY - endY };
  var messageString = JSON.stringify(object);
  if(ws.readyState === ws.OPEN)
  {
    console.log("Sending Message")
    ws.send(messageString);
  }
}
