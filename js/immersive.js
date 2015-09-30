function main (){
  console.log("loaded");
  document.addEventListener('keydown', onKeydown, false);
  document.addEventListener('keyup', onKeyup, false);
}
document.addEventListener('DOMContentLoaded', main, false);
var lastEvent,
    requestID,
    loopStoped=true,
    velocity=0,
    lastTime=0,
    interval=0;

// reset to defualt
function onKeyup(){
  // console.log("keyup");
  velocity=0;
  lastTime = 0;
  interval = 0;

  // stop the move loop
  if(requestID){
    // console.log(requestID);
    window.cancelAnimationFrame(requestID);
    requestID = undefined;
    loopStoped=true;
  }
}

function onKeydown(e){
  // console.log(e.keyCode);
  switch (e.keyCode) {
    case 13:
      console.log("enter");
      break;
    case 40:
      console.log("arrowDown");
      naviBackward();
      break;
    case 37:
      console.log("arrowLeft");
      break;
    case 39:
      console.log("arrowRight");
      break;
    case 38:
      console.log("arrowUp");
      // start the moveForward loop;
      if(loopStoped){
          requestID = window.requestAnimationFrame(moveForward);
      }
      break;
    default:
      break;
  }
}

function moveForward(timestamp) {
  loopStoped=false;
  // console.log("requestID is " + requestID);
  //  velocity < 1 ? velocity+=0.1 : velocity = 1;
   velocity=0.3;
  if ( 0 === lastTime) {
    // first loop, dont move; set velocity to 0
    velocity=0;
  }else{
    // we got a interval
    interval=timestamp - lastTime;
    // console.log("time between two frame is " + interval);

    var dz;
    var cards=document.querySelectorAll('.center .card');

    for (var i=0; i<cards.length; i++){
      var card=cards[i];

      // get card's z value
      var st=window.getComputedStyle(card,null); //get computed style
      var transform=st.getPropertyValue("transform"); //get transform property
      var transformValue=transform.split('(')[1].split(')')[0].split(',');// get value, split
      var scaleX, scaleY, scaleZ, y, z;
      if(16 == transformValue.length){ // if 3d matrix
        scaleX=parseInt(transformValue[0]);
        scaleY=parseInt(transformValue[5]);
        scaleZ=parseInt(transformValue[10]);
        y=parseInt(transformValue[13]) / scaleY;
        z=parseInt(transformValue[14]) / scaleZ;// get z value in int
      }else { // 2d matrix
        scaleX=scaleY=scaleZ=1;
        y=z=0;
      }

      // different cards with different speed
    if(z < -200){ // for cards in behind
      dz = velocity * interval;
      console.log("NORMAL: \n"+"i= "+i +";    " + "dz= " + dz );
      z = Math.round(z+dz);
      card.style.transform="translate3d(0px, 0px, " + z +"px)";
    }else if(-200 <= z && 100 > z){ // speed * 3 for the second card to makesure all cards arrive at same time
      dz = velocity * interval * 3;
      console.log("3X: \n"+"i= "+i +";    " + "dz= " + dz );
      
      z=Math.round(z+dz);
      card.style.transform="translate3d(0px, 0px, " + z +"px)";

    }else if (100 <= z && 150 > z) { // speed * 1/2 for the first card
      dz = velocity*interval/2;
      console.log("1/2X: \n"+"i= "+i +";    " + "dz= " + dz );

      scaleX = scaleY += dz*0.2/50;
      scaleZ += dz*0.5/50;
      z=Math.round(z+ dz);
      // opacity
      var opacity=st.getPropertyValue("opacity");
      opacity=parseFloat(opacity);
      opacity-=dz/50;
      // set style
      card.style.opacity=opacity;
      card.style.transform="translate3d(0px, 0px, " + z +"px) "+
                           "scale3d(" + scaleX +", "+scaleY+", "+scaleZ +")";
    }else{// resert the card to start point when reach end
      dz = velocity*interval -500;
      z =Math.round(z+dz);
      card.style.transform="translate3d(0px, 0px, " + z +"px)";
      card.style.opacity=1;

    }
    if(i==0){
      // console.log(card.style.transform);
    }
    }
  }
  lastTime = timestamp;
  requestID = window.requestAnimationFrame(moveForward);
}

function naviForward() {
  // manipulating the cards UI, by change class to "layer-"+1
    var cards=document.querySelectorAll('.center .card');
    // console.log(cards);
    for (var i=0; i<cards.length; i++){
      console.log("change started");
      var card=cards[i];
      var curClass="layer-"+i ,
          newClass;
      if(i<6){
        newClass="layer-"+(1+i);
      }else {
        newClass="layer-0";
        document.querySelector('.center').insertBefore(card, document.querySelector('.main .layer-1'));
        // need to rebind layer-0 content
      }
      card.classList.remove(curClass);
      card.classList.add(newClass);
    }
}

function naviBackward() {
  // manipulating the cards UI, by change class to "layer-"-1
    var cards=document.querySelectorAll('.center .card');
    // console.log(cards);
    for (var i=0; i<cards.length; i++){
      console.log("change started");
      var card=cards[i];
      var curClass="layer-"+i ,
          newClass;
      if(i>0){
        newClass="layer-"+(i-1);
      }else {
        newClass="layer-6";
        document.querySelector('.center').appendChild(card);
        // need to rebind layer-6 content
      }
      card.classList.remove(curClass);
      card.classList.add(newClass);
    }
}
