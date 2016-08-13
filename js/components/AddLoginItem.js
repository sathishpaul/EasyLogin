import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalClose, ModalHeader, ModalBody, ModalTitle } from 'react-modal-bootstrap';

var AddLoginItem = React.createClass({

  getInitialState: function() {
    var emptyAttribute = this._getEmptyAttributeModel();
    return {
      'isOpen': false,
      'dialogMode': '',
      'loginItem': {
        'name': '',
        'description': '',
        'attributes': [
          {
            ...emptyAttribute
          }
        ]
      }
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

  _getEmptyAttributeModel: function() {
    return {
      name: '',
      value: '',
      selector: 'id'
    };
  },

  addNewAttributeRow: function() {
    var newAttribute = this._getEmptyAttributeModel(),
      loginItem = this.state.loginItem,
      attributes = loginItem.attributes;
    attributes.push(newAttribute);
    this.setState({
      loginItem: {
        ...this.state.loginItem,
        attributes: attributes
      }
    });
  },

  removeAttribute: function(index) {
    if(index >=0 && this.state.loginItem.attributes.length > 1) {
      var loginItem = this.state.loginItem,
        attributes = loginItem.attributes.map((item) => item);

      attributes.splice(index, 1);
      loginItem.attributes = attributes;
      this.setState({
        loginItem: {
          ...this.state.loginItem,
          attributes: attributes
        }
      });
      console.log("deleted");
    } else {
      console.log("cant delete the last item");
    }
  },

  onChangeNameHandler: function(e) {
    var nameValue = e.target.value;
    this.setState({
      loginItem: {
        ...this.state.loginItem,
        name: nameValue
      }
    });
  },

  onChangeDesc: function(e) {
    var description = e.target.value;
    this.setState({
      loginItem: {
        ...this.state.loginItem,
        description: description
      }
    });
  },

  onChangeAttribute: function(key) {
    /*
     * Start here
     *  - need to capture change of attribute per row and update model with key
     *    figure out hwo to pass this function handler to onChange and receive key and newValue
     *  - Need to add a submit action  with
     *    - submit by clicking on button with id/class
     *    - submit by hitting enter on attribute
     *    - submit by invoking function?
     * Then need to save
     * */
  },

  renderAttributeRow: function(attributeRow, key) {
    return (
      <div className="form-group" key={key}>
        <input type="text" className="form-control attributeRow" placeholder="Attribute name" autoComplete="off"
               value={attributeRow.name} />
        <input type="text" className="form-control attributeRow" placeholder="Attribute value" autoComplete="off"
          value={attributeRow.value} />
        <img src="/images/add.svg" className="attributeRowImg" onClick={this.addNewAttributeRow} />
        <img src="/images/remove.svg" className="attributeRowImg leftSpacer"
             onClick={this.removeAttribute.bind(this, key)} />
      </div>
    );
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
          <form autoComplete="off">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Name to identify this item"
                     autoComplete="off" value={this.state.loginItem.name} onChange={this.onChangeNameHandler}/>
            </div>
            <div className="form-group">
              <textarea rows="3" cols="5" className="form-control" placeholder="Short description"
                value={this.state.loginItem.description} onChange={this.onChangeDesc}/>
            </div>
            <p>Attributes</p>
            {this.state.loginItem.attributes.map(this.renderAttributeRow)}
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