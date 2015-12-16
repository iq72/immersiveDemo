var React = require('react');

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

module.exports = Status;
