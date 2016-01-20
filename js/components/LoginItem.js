/**
 * Created by Paul on 12/26/15.
 */
import React from 'react';

var LoginItem = React.createClass({
  render: function() {
    return (
      <div className="card" key={this.props.key}>
        <img className="cardImg" src="../../images/si-glyph-basketball.svg"
             width="64" height="64" />
        <div className="cardInfo">
          <p>{this.props.name}</p>
          <p>{this.props.username}</p>
          <p>{this.props.url}</p>
        </div>
      </div>
    )
  }
});

export default LoginItem;