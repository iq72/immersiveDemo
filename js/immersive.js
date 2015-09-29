function main (){
  console.log("loaded");
  document.addEventListener('keydown', onKeydown, false)
}
document.addEventListener('DOMContentLoaded', main, false);

function onKeydown(e){
  console.log(e.keyCode);
  switch (e.keyCode) {
    case 13:
      console.log("enter");
      break;
    case 40:
      console.log("arrowDown");
      break;
    case 37:
      console.log("arrowLeft");
      break;
    case 39:
      console.log("arrowRight");
      break;
    case 38:
      console.log("arrowUp");
      naviForward();
      break;
    default:
      break;
  }
}

function naviForward() {
    var cards=document.querySelectorAll('.center .card');
    console.log(cards);
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
      }
      card.classList.remove(curClass);
      card.classList.add(newClass);
    }
}
