console.log("REACT LOADED");

if(videoJSON){
  console.log("We can use videoJSON in react");
}else{
  console.log("ERROR: something wrong with the JSON data");
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
  render:function(){
    var collections=[];
    for (var i=0; i<7; i++) {
        var layer = "card layer-"+i;
        var key="layer-"+i;
        var src=videoJSON[i].SRC;
        var poster=videoJSON[i].Poster;
        if("video"==this.props.catergory){
          collections.push(
            <VideoCard layer={layer} key={key} src={src} poster={poster}/>
          );
        }else{
          collections.push(
            <Card layer={layer} key={key}/>
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
      <div className={this.props.layer}>
        I am a card.
      </div>
    );
  }
});

var VideoCard = React.createClass({
  render:function(){
    return(
      <div className={this.props.layer}>
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
