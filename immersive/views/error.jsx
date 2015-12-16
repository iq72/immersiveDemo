var React = require('react');

module.exports = React.createClass({
  render:function(){
    return(
      <html>
        <head>
          <title>Error</title>
          <link rel="stylesheet" href="/stylesheets/style.css" />
        </head>
        <body>
          <h1>{this.props.message}</h1>
          <h2>{this.props.error.status}</h2>
          <pre>{this.props.error.stack}</pre>
        </body>
      </html>
    );
  }
});
