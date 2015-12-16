var React = require('react');
import Explorer from './components/Explorer';
import Inspector from './components/Inspector';
import Status from './components/Status';


console.log("REACT LOADED");
// document.addEventListener("keydown", handleKeydown);
// document.addEventListener("keyup", handleKeyup);


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
      <html>
        <head>
          <meta charset="utf-8" />
          <title>immersiveUI</title>
          <link rel="stylesheet" href="./css/immersive.css" media="screen" title="no title" charset="utf-8" />
          <link rel="stylesheet" href="./css/icon-fonts.css" media="screen" title="no title" charset="utf-8" />
        </head>
        <body>
          <div className="imsvUI">

              <Status></Status>
                <Explorer collectionsCount={this.collectionsCount} cardsCount={7} scrollHorizontal={this.state.scrollHorizontal} rotate={rotate} focusPostition={this.focusPostition+this.state.scrollHorizontal}  ref={ref => this.explorer = ref} videos={this.props.videos}></Explorer>
              <Inspector></Inspector>
          </div>
        </body>
      </html>
    );
  }
});








module.exports = ImsvUI;
