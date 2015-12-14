console.log("REACT LOADED");
document.addEventListener("keydown", handleKeydown);
document.addEventListener("keyup", handleKeyup);

function handleKeydown(e){
  console.log("hearing keydown event from body");
  switch (e.keyCode) {
    case 13:
      console.log("enter");
      // fullscreen
      break;
    case 40:
      console.log("arrowDown");
      // move backward
      break;
    case 37:
      console.log("arrowLeft");
      // rotate right
      break;
    case 39:
      console.log("arrowRight");
      // rotate left
      break;
    case 38:
      console.log("arrowUp");
      // move forward
      break;

    default:
      break;
  }
}

function handleKeyup(e){
  console.log("hearing Keyup event from body");
  switch (e.keyCode) {
    case 13:
      console.log("enter");
      // fullscreen
      break;
    case 40:
      console.log("arrowDown");
      // move backward
      break;
    case 37:
      console.log("arrowLeft");
      // rotate right
      break;
    case 39:
      console.log("arrowRight");
      // rotate left
      break;
    case 38:
      console.log("arrowUp");
      // move forward
      break;

    default:
      break;
  }
}

var lastEvent,
    requestID,
    loopStoped=true,
    velocity=0,
    startTime=0,
    lastTime=0,
    interval=0,
    Vmax= 0.005, // Max speed of card moving
    Atime= 500,  // Accelerating time
    rotate=0,
    Zpositions=[
      -600,
      -500,
      -400,
      -300,
      -200,
      100,
      250,
      350
    ];

function getPercentage(interval){
  var percentage;
  if(interval<Atime){
        // p=1/2 * a* t * t
    var a = Vmax / Atime;
    percentage = Math.pow(interval, 2) * a / 2 ;
  }else{
        //linear after
    percentage = interval*Vmax - (Atime * Vmax / 2);
  }
      return percentage;
}

var ImsvUI = React.createClass({
  render : function(){
    return(
      <div className="imsvUI">
        <Status />
        <Explorer />
        <Inspector />
      </div>
    );
  }
});

var Status = React.createClass({
  render : function(){
    return (
      <header>
        <StatusLeft />
        <StatusRight />
        <Catergory />
      </header>
    );
  }
});

var StatusLeft = React.createClass({
  render : function(){
    return (
      <div className="status-left">
        <span className="icon-notifications"> </span>
        <span className="icon-file_download"> </span>
      </div>
    );
  }
});

var StatusRight = React.createClass({
  render : function(){
    return (
      <div className="status-right">
        <span className="icon-bluetooth"> </span>
        <span className="icon-wifi"> </span>
        <span className="icon-cast_connected"> </span> 20:15
      </div>
    );
  }
});

var Catergory = React.createClass({
  render : function(){
    return (
      <h1 className="titles">Videos</h1>
    );
  }
});

var Explorer = React.createClass({
  render: function(){
    var catergories = [];
    for(var i=0;i<8;i++){
      var className = "collections";
      if(1===i){
        className += " center";
        catergories.push(
          <CardCollections catergory="video" className={className} key={i}/>
        );
      }else {
        catergories.push(
          <CardCollections catergory="card" className={className} key={i}/>
        );
      }

    }
    return (
      <main>
        <section className="container-3d transition">
          {catergories}
        </section>
      </main>
    );
  }
});

var CardCollections = React.createClass({
  catergory:"",
  className:"",
  getInitialState:function(){
    return{
      orders:[0,1,2,3,4,5,6,7],
      styles:[{},{},{},{},{},{},{}]
    };
  },
  handleMove: function(direction, percentage){
    percentage = percentage * "forward"==direction? 1 : -1;
    var newOrders=[], newStyles=[];
    for(var i=0; i<7; i++){
      var order=(this.children[i].props.order + percentage)%7;
      var newStyle="";

      newOrders.push(order);
    }
  },
  render:function(){
    var collections=[];
    for (var i=0; i<7; i++) {
        var layer = "card layer-"+i;
        var key="layer-"+i;
        var src=videoJSON[i].SRC;
        var poster=videoJSON[i].Poster;
        if("video"==this.props.catergory){
          collections.push(
            <VideoCard layer={layer} key={key} src={src} poster={poster} order={this.state.orders[i]} style={this.state.styles[i]}/>
          );
        }else{
          collections.push(
            <Card layer={layer} key={key} />
          );
        }
    }
    return(
      <div className = {this.props.className}>
        {collections}
      </div>
    );
  }
});


var Card = React.createClass({
  layer:"",
  render:function(){
    return(
      <div className={this.props.layer} >
      </div>
    );
  }
});

var VideoCard = React.createClass({
  render:function(){
    return(
      <div className={this.props.layer} style={this.props.style}>
        <img src={this.props.poster} alt="#" />
      </div>
    );
  }
});

var Inspector = React.createClass({
  render: function(){
    return(
      <footer>
        <InfoLeft />
        <InfoRight />
        <Title />
      </footer>
    );
  }
});

var Title = React.createClass({
  render : function(){
    return(
      <h1 className="titles-item">This is a video</h1>
    );
  }
});

var InfoLeft = React.createClass({
  render: function(){
    return(
      <div className="info-left">
      <p>Discriptions of the Card show on the "left".</p>
      </div>
    );
  }
});

var InfoRight = React.createClass({
  render: function(){
    return(
      <div className="info-right">
      <p>Discriptions of the Card show on the "right".</p>
      </div>
    );
  }
});

var Rate = React.createClass({
  rate:0,
  render:function(){
    return(
      <p>{this.props.rate}</p>
    );
  }
});

var Staff = React.createClass({
  staff:"",
  render : function(){
    return(
      <p>{this.props.staff}</p>
    );
  }
})

ReactDOM.render(
  <ImsvUI />,
  document.getElementById('content')
);
