import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalClose, ModalHeader, ModalBody, ModalTitle } from 'react-modal-bootstrap';

var AddLoginItem = React.createClass({

  getInitialState: function() {
    return {
      'isOpen': false,
      'dialogMode': ''
    };
  },

  showAddDialog: function() {
    this.setState({
      isOpen: true
    });
  },

  hideModal: function() {
    this.setState({
      dialogMode: '',
      isOpen: false
    });
  },

  renderDialog: function() {
    var dialogStyles = {
        base: {
          width: '450px',
          outline: 'none'
        }
      };

    return (
      <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal} dialogStyles={dialogStyles}>
        <ModalHeader>
          <ModalTitle>Create a new Login Item</ModalTitle>
        </ModalHeader>
        <ModalBody>

          /*
            START HERE....Ensure form contents look good

          //We need the following:
          // name of Login item
          // 'Add attribute' button which adds a new row in the form
            //Each row has two attributes: name of the attribute (e.g username) and the value to be filled
          //Form action to use
            //enter key
            //id of the submit button to click on?
            //javascript function name to invoke

          //Save and cancel buttons must look good

          */
        </ModalBody>
        <div className="modal-footer">
          <button type="button" className="btn-sm btn-default" data-dismiss="modal">Close</button>
          <button type="button" className="btn-sm btn-primary">Save changes</button>
        </div>
      </Modal>
    );
  },

  render: function() {
    return (
      <div className="addBtnContainer">
        <button className="btn btn-success" data-target="#myModal" onClick={this.showAddDialog}>Add Item</button>
        <div>
          {this.renderDialog()}
        </div>

      </div>
    );
  }
});

export default AddLoginItem;