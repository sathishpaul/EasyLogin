/**
 * Component that represents the EasyLogin App.
 *
 * Created by Paul on 12/26/15.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import LoginItems from './LoginItems';
import DialogComponent from './../modal';
import samples from '../sample-login-items';
import AddLoginItem from './AddLoginItem';

var EasyLogin = React.createClass({
  render: function() {
    return (
      <div>
        <AddLoginItem />
        <LoginItems />
      </div>
    );
  }
});

export default EasyLogin;