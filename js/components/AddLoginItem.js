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

    /*
     * Start here
     *  - Add a +, - buttons to add or remove row
     *  - Update model when new row is added
     *  - Need to add a submit action  with
     *    - submit by clicking on button with id/class
     *    - submit by hitting enter on attribute
     *    - submit by invoking function?
     * Then need to save
     * */
    return (
      <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal} dialogStyles={dialogStyles}>
        <ModalHeader>
          <ModalTitle>Create a new Login Item</ModalTitle>
        </ModalHeader>
        <ModalBody>

          <form autoComplete="off">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Name to identify this item" autoComplete="off" />
            </div>
            <div className="form-group">
              <textarea rows="3" cols="5" className="form-control" placeholder="Short description" />
            </div>
            <p>Attributes</p>
            <div className="form-group">
              <img src="/images/addIcon.svg" width="32px" height="32px" />
              <input type="text" className="form-control attributeRow" placeholder="Attribute name" autoComplete="off" />
              <input type="text" className="form-control attributeRow" placeholder="Attribute value" autoComplete="off" />

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