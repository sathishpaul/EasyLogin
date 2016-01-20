/**
 * Component for list of login items.
 */
import React from 'react';
import LoginItem from './LoginItem';
import samples from '../sample-login-items';

var LoginItems = React.createClass({
  getInitialState: function() {
    return {
      loginItems: samples
    };
  },

  renderLoginItem: function(key) {
    console.dir(arguments);
    return <LoginItem key={key}
      name={this.state.loginItems[key].name}
      url={this.state.loginItems[key].url}
      username={this.state.loginItems[key].username}
    />;
  },

  render: function() {
    return (
      <div className="loginItemsContainer">
        {Object.keys(this.state.loginItems).map(this.renderLoginItem)}
      </div>
    );
  }
});

export default LoginItems;