var React = require('react');

var Inspector = React.createClass({
  render: function(){
    return(
      <footer>
        <InfoLeft content={this.props.video.get('Discriptions')}/>
        <InfoRight video={this.props.video}/>
        <Title content={this.props.video.get('Title')} />
      </footer>
    );
  }
});

var Title = React.createClass({
  render : function(){
    return(
      <h1 className="titles-item">{this.props.content}</h1>
    );
  }
});

var InfoLeft = React.createClass({
  render: function(){
    return(
      <div className="info-left">
        <p>{this.props.content}</p>
      </div>
    );
  }
});

var InfoRight = React.createClass({
  render: function(){
    return(
      <div className="info-right">
        <Rate content={this.props.video.get('Rate')}/>
        <Staff content={this.props.video.get('Staff')}/>
      </div>
    );
  }
});

var Rate = React.createClass({
  render:function(){
    return(
      <p>{this.props.content}</p>
    );
  }
});

var Staff = React.createClass({
  render : function(){
    return(
      <p>{this.props.content}</p>
    );
  }
});

module.exports = Inspector;
