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

    //JSON representing a login item
    var loginItem = {
      name: 'gmail',
      attributes: [
        {
          name: 'username',
          selector: 'id', //can be hidden or implicit for v1
          value: 'sathishpaul'
        },
        {
          name: 'password',
          selector: 'id',
          value: 'asdf'
        }
      ],
      loginBtnId: 'submit'
    }

  },

  renderDialog: function() {
    var dialogStyles = {
        base: {
          width: '650px',
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
          * Start here, add attribute name, attribute value and an 'Add Attribute' button
          * Then need to save
          * */
          <form autoComplete="off">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Name to identify this item" autoComplete="off" />
            </div>
            <div className="form-group">
                <input type="text" className="form-control attributeRow" placeholder="username" autoComplete="off" />
                <input type="password" className="form-control attributeRow" id="inputPassword3" placeholder="Password"
                       autoComplete="off"/>
            </div>
          </form>
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