var React = require('react');

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
        <Rate />
        <Staff />
      </div>
    );
  }
});

var Rate = React.createClass({
  render:function(){
    return(
      <p>rate</p>
    );
  }
});

var Staff = React.createClass({
  render : function(){
    return(
      <p>staff</p>
    );
  }
});

module.exports = Inspector;
