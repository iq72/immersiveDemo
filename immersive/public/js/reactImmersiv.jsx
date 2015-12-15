console.log("REACT LOADED");
// document.addEventListener("keydown", handleKeydown);
// document.addEventListener("keyup", handleKeyup);

function handleKeydown(e){
  // console.log("hearing keydown event from body");
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
    var a = (Vmax / Atime);
    percentage = Math.pow(interval, 2) * (a / 2) ;
  }else{
        //linear after
    percentage = interval*Vmax - (Atime * Vmax / 2);
  }
      return percentage;
}

var ImsvUI = React.createClass({
  collectionsCount:8,
  focusPostition: 1,
  //hack keydown events
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("keyup", this.handleKeyup)
  },
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
    document.removeEventListener("keyup", this.handleKeyup)
  },
  handleKeyup: function(e){
    console.log("KEYUP hacked \n " + e.keyCode);
    //TODO : reposite cards and collections to grid
    switch (e.keyCode) {
      case 13:
        console.log("enter")
        break;
      case 38:
        console.log("arrowUp");
        var centerCollection=this.explorer.center;
        centerCollection.setState({
          scrollVertical:centerCollection.state.scrollVertical+1
        });
        break;
      case 40:
        console.log("arrowDown");
        var centerCollection=this.explorer.center;
        centerCollection.setState({
          scrollVertical:centerCollection.state.scrollVertical-1
        });
        break;
      case 37:
        console.log("arrowLeft");
        var newScrollHorizontal = this.state.scrollHorizontal + 1;
        this.setState({
          scrollHorizontal: newScrollHorizontal
        });
        break;
      case 39:
        console.log("arrowRight");
        var newScrollHorizontal = this.state.scrollHorizontal - 1;
        this.setState({
          scrollHorizontal: newScrollHorizontal
        });
        break;
      default:
        break;
    }
  },
  handleKeydown: function(e){
    console.log("KEYdown hacked \n " + e.keyCode);
    //TODO : move cards and collections
    switch (e.keyCode) {
      case 38:
        console.log("arrowUp");
        break;
      case 40:
        console.log("arrowDown");
        break;
      case 37:
        console.log("arrowLeft");
        //move collections clockwise
        break;
      case 39:
        console.log("arrowRight");
        //move collections anti-clockwise
        break;
      default:
        break;
    }
  },

  getInitialState: function(){
    return {
      scrollHorizontal:0,
    };
  },
  render : function(){
    var rotate={};
    rotate.transform= 'rotateY(' + (this.state.scrollHorizontal*360/8) + 'deg)';
    return (
      <div className="imsvUI">
        <Status></Status>
        <Explorer collectionsCount={this.collectionsCount} cardsCount={7} scrollHorizontal={this.state.scrollHorizontal} rotate={rotate} focusPostition={this.focusPostition+this.state.scrollHorizontal}  ref={ref => this.explorer = ref}></Explorer>
        <Inspector></Inspector>
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

//
// Explorer
//

var Explorer = React.createClass({
  // getInitialState: function(){
  //   return{
  //     scrollVertical:0
  //   };
  // },
  handleMoveCard:function(direction, percentage){
    console.log("got command to move card: \n"+ direction + percentage);
    //TODO move cards vertically
  },
  render: function(){
    var catergories = [];
    for(var i=0;i<8;i++){
      var className = "collections";
      if(this.props.focusPostition===i){
        className += " center";
        catergories.push(
          <CardCollections catergory="video" className={className} key={i}  ref={(ref) => this.center = ref}/>
        );
      }else {
        catergories.push(
          <CardCollections catergory="card"  className={className} key={i}/>
        );
      }
    }
    return (
      <main>
        <section style={this.props.rotate} className="container-3d transition">
          {catergories}
        </section>
      </main>
    );
  }
});

var CardCollections = React.createClass({
  catergory:"",
  className:"",
  // handleMove: function(direction, percentage){
  //   console.log("handleMove trigged");
  //   percentage = percentage * "forward"==direction? 1 : -1;
  //   var newOrders=[], newStyles=[];
  //   for(var i=0; i<7; i++){
  //     var order=(this.children[i].props.order + percentage)%7;
  //     var newStyle={};
  //     var z,y,scaleX,scaleY,opacity;
  //     //logic for new style
  //     if(order<4){
  //       //linear translateZ -600 ~ -200
  //       z = Math.round(order*100 - 600);
  //       style.opacity=1;
  //       style.transform="translate3d(0px, 0px, " + z +"px)";
  //     }else if (order<5) {
  //       //linear translateZ -200 ~ 100
  //       z = Math.round(order*300 - 1400);
  //       style.opacity=1;
  //       style.transform="translate3d(0px, 0px, " + z +"px)";
  //     }else if (order<6) {
  //       //scale3d + translateZ + opacity
  //       scaleX = scaleY = (order-5)*0.2 + 1;
  //       // scaleZ += dz*0.5/50;
  //       z=Math.round((order-5)*150 + 100);
  //       y=Math.round((order-5)*260);
  //       // opacity
  //
  //       opacity=1-((order-5)*1.5);
  //       // if(opacity <= 0){
  //       //   console.log("z position: "+ z);
  //       // }
  //       // set style
  //       style.opacity=opacity;
  //       style.transform="translate3d(0px, "+ y +"px, " + z +"px) "+
  //                            "scale3d(" + scaleX +", "+scaleY+", "+scaleZ +")";
  //     }else {
  //       z = Math.round((order-6)*100 + 250);
  //       style.opacity=0;
  //       style.transform="translate3d(0px, "+ y +"px, " + z +"px) "+
  //                            "scale3d(" + scaleX +", "+scaleY+", "+scaleZ +")";
  //     }
  //
  //     newOrders.push(order);
  //   }
  // },
  getInitialState: function(){
    return{
      scrollVertical:0
    };
  },
  render:function(){
    var collections=[];
    for (var i=0; i<7; i++) {
        var j=(i+this.state.scrollVertical+7)%7; // scroll pointer
        var layer = "card layer-"+j;
        var key="layer-"+j;
        var src=videoJSON[i].SRC;
        var poster=videoJSON[i].Poster;
        if("video"==this.props.catergory){
          collections.push(
            <VideoCard layer={layer} key={key} src={src} poster={poster}/>
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
