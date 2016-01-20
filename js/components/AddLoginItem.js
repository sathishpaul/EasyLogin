import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';

var AddLoginItem = React.createClass({

  showAddDialog: function() {
    console.log("hi");
  },

  render: function() {
    return (
      <div className="addBtnContainer">
        <Button bsStyle="success" onClick={this.showAddDialog}>Add Item</Button>
      </div>
    );
  }
});

export default AddLoginItem;