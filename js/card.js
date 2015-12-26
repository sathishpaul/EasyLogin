var React = require('react');
var Card = React.createClass({
  render : function() {
    return (
    <div className="card">
      <img className="cardImg" src="../images/si-glyph-basketball.svg" 
        width="64" height="64" />
      <div className="cardInfo">
      	<p>{this.props.name}</p>
      	<p>{this.props.url}</p>
      </div>
    </div>
    )
  }
});

export default Card;