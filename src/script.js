const radiusFace = 100;
const radiusEyeBalls = 10
const radiusMouthX = 30;
const radiusMouthY = 20;
const btwEyes = 40;
const eyeWidth = 40;
const listBrows = ["sad", "angry", "surprise"];
const listMouth = ["sad", "happy", "surprise"];
const listEyes = ["normal", "closed", "sad"];
let count = 0;
let isSpeedingDown = false;


const drawEyes = (context, type)=>{
  switch(type){
    case "normal":
      context.fillStyle = 'black';
      context.beginPath();
      context.arc(canvas.width/2 - radiusFace/2,canvas.height/2 -radiusFace/4, radiusEyeBalls,0,360)
      context.moveTo(canvas.width/2 + (radiusFace/2 + radiusEyeBalls),canvas.height/2 -radiusFace/4)
      context.arc(canvas.width/2 + radiusFace/2,canvas.height/2 -radiusFace/4, radiusEyeBalls,0,360)
      context.fill();
      break;
    case "closed":
      context.beginPath();
      context.moveTo(canvas.width/2 - btwEyes/2,canvas.height/2 -radiusFace/4)
      context.lineTo(canvas.width/2 - (btwEyes/2 + eyeWidth),canvas.height/2 -radiusFace/4)
      context.lineTo(canvas.width/2 - (btwEyes/2 + eyeWidth),canvas.height/2 - radiusFace/4 +radiusEyeBalls)
      context.stroke();
      context.beginPath();
      context.moveTo(canvas.width/2 + (btwEyes/2 + eyeWidth),canvas.height/2 -radiusFace/4)
      context.lineTo(canvas.width/2 + btwEyes/2,canvas.height/2 -radiusFace/4)
      context.lineTo(canvas.width/2 + btwEyes/2,canvas.height/2 -radiusFace/4 +radiusEyeBalls)
      context.stroke();
      break;
      case "sad":
      context.beginPath();
      context.arc(canvas.width/2 - (btwEyes/2 + eyeWidth/2),canvas.height/2 -radiusFace/4, eyeWidth/2,0,180/180*Math.PI);
      context.stroke();
      context.beginPath();
      context.arc(canvas.width/2 + (btwEyes/2 + eyeWidth/2),canvas.height/2 -radiusFace/4, eyeWidth/2,0,180/180*Math.PI);
      context.stroke();
      break;
    }
}

const drawMouth = (context, type)=>{
  switch(type){
    case "surprise":
      context.beginPath();
      context.lineWidth = 2;
      context.ellipse(canvas.width/2,canvas.height/2 +radiusFace/3, radiusMouthX,radiusMouthY,0,0,360)
      context.fillStyle = 'white';
      context.fill();
      context.stroke();
      break;
     case "happy":
      context.beginPath();
      context.arc(canvas.width/2,canvas.height/2 +radiusFace/3, radiusMouthX,0,(180/180)*Math.PI);
      context.stroke();
      break;
     case "sad":
      context.beginPath();
      context.arc(canvas.width/2,canvas.height/2 +radiusFace/3, radiusMouthX,0,(180/180)*Math.PI, true);
      context.stroke();
    break;
  default:
  }
}

const drawEyeBrows = (context, type)=>{
 context.lineWidth = 5;
 switch(type){
   case "sad":
    context.beginPath();
    context.moveTo(canvas.width/2 - btwEyes/2,canvas.height/4)
    context.lineTo(canvas.width/2- radiusFace,canvas.height/8*3)
    context.moveTo(canvas.width/2 + btwEyes/2,canvas.height/4)
    context.lineTo(canvas.width/2+ radiusFace,canvas.height/8*3)
    context.stroke();
    break;

  // angry eyebrows
  case "angry":
    context.beginPath();
    context.moveTo(canvas.width/2 - btwEyes/2,canvas.height/8*3)
    context.lineTo(canvas.width/2- (radiusFace/2*1),canvas.height/4)
    context.moveTo(canvas.width/2 + btwEyes/2,canvas.height/8*3)
    context.lineTo(canvas.width/2+ (radiusFace/2*1),canvas.height/4)
    context.stroke();
    break;

  // surprise eyebrows
  case "surprise":
    context.beginPath();
    context.arc(canvas.width/2 - btwEyes ,canvas.height/3, btwEyes/2,0,Math.PI, true)
    context.stroke();
    context.beginPath();
    context.arc(canvas.width/2 + btwEyes ,canvas.height/3, btwEyes/2,0,Math.PI, true)
    context.stroke();
    break;
    default:
 }
}

window.addEventListener("DOMContentLoaded",()=> {
    const cvs = document.getElementById( "canvasFace" );
    const context = cvs.getContext("2d");

    // draw initial face
    context.beginPath();
    context.lineWidth = 1;
    context.fillStyle = 'yellow';
    context.arc(canvasFace.width/2, canvasFace.height/2, radiusFace, 0, 360)
    context.fill();

});

const start = ()=>{
  isSpeedingDown = false;
  document.getElementById("start").disabled = true;
  const cvs2 = document.getElementById( "canvas" );
  const context2 = cvs2.getContext("2d");

  setTimeout(()=>{
    onTimeOut()
  },10*(1.1**count))

  const onTimeOut= ()=>{
      context2.clearRect(0, 0, canvas.width, canvas.height)
      const index1 = Math.floor(Math.random()*3)
      const index2 = Math.floor(Math.random()*3)
      const index3 = Math.floor(Math.random()*3)
      drawEyes(context2, listEyes[index3]);
      drawMouth(context2, listMouth[index2]);
      drawEyeBrows(context2, listBrows[index1]);

      // stopボタンが押されればcount開始
      if(isSpeedingDown){
        count = count + 1;
      }

      //間隔が1秒になったら止まる
      if(10*(1.1**count) > 1000){
        end();
      }else{
        setTimeout(()=>{
          onTimeOut()
        },10*(1.08**count))
      }
   }
}

const stop = ()=>{
  isSpeedingDown = true;
  // document.getElementById("stop").disabled = true;
}

const end = ()=>{
  count = 0;
  document.getElementById("stop").disabled = false;
  document.getElementById("start").disabled = false;

}

