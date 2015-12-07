var React = require('react');
var Card = React.createClass({
  render : function() {
    return (
    <div className="card">
      <p>{this.props.name}</p>
    </div>
    )
  }
});

export default Card;