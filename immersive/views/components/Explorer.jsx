var React=require('react');

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
    if(this.props.videos[0].get('Title')){
      console.log("We got Videos");
    }else {
      console.log("No Videos");
    }
    var catergories = [];
    for(var i=0;i<8;i++){
      var className = "collections";
      if(this.props.focusPostition===i){
        className += " center";
        catergories.push(
          <CardCollections catergory="video" videos={this.props.videos} className={className} key={i}  ref={(ref) => this.center = ref}/>
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
        if("video"==this.props.catergory){
          var src=this.props.videos[i].get('SRC');
          var poster=this.props.videos[i].get('Poster');
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

module.exports = Explorer;
