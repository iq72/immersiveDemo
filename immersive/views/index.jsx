var React = require('react');

module.exports = React.createClass({
  render:function(){
    return(
      <html>
        <head>

        </head>
        <body>
        <p>这是 LeanEngine{typeof this.props.currentTime.Time} 的示例应用</p>
        <p>当前时间</p>
        <p><a href="/todos">一个简单的{this.props.name}示例</a></p>
        <p><a href="/immersive">immersiveUI示例</a></p>
        <p><a href="/imsv">immersiveUI示例2</a></p>
        </body>
      </html>
    )
  }
});
