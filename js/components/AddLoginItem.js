import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalClose, ModalHeader, ModalBody, ModalTitle } from 'react-modal-bootstrap';

var AddLoginItem = React.createClass({

  getInitialState: function() {
    return {
      'isOpen': false,
      'dialogMode': '',
      'loginItem': this._getEmptyLoginItem()
    };
  },

  showAddDialog: function() {
    this.setState({
      isOpen: true,
      loginItem: this._getEmptyLoginItem()
    });
  },

  closeAddDialog: function() {
    this.setState({
      dialogMode: '',
      isOpen: false
    });
  },

  _getEmptyLoginItem: function() {
    var emptyAttribute = this._getEmptyAttributeModel();
    return  {
      'name': '',
      'description': '',
      'attributes': [
        {
          ...emptyAttribute
        }
      ]
    };
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

  onChangeAttributeName: function(key, e) {
    var attributes = this.state.loginItem.attributes.map((item) => item),
      attributeObj = this.state.loginItem.attributes[key];

    attributeObj.name = e.target.value;

    this.setState({
      loginItem: {
        ...this.state.loginItem,
        attributes: attributes
      }
    });

    if(e.target.value === "password") {
      //TODO: need to change input type to password to hide text?
    }
  },

  onChangeAttributeValue: function(key, e) {
    var attributes = this.state.loginItem.attributes.map((item) => item),
      attributeObj = attributes[key];

    attributeObj.value = e.target.value;

    this.setState({
      loginItem: {
        ...this.state.loginItem,
        attributes: attributes
      }
    });
  },

  /**
   * Start here
   *  - validation for incomplete elements
   *  - pre-save process to figure out selector - . vs # on attribute names?
   *  - save object using chrome.sync.set, need id?
   */

  save: function() {
    console.dir(this.state.loginItem);
  },

  renderAttributeRow: function(attributeRow, key) {
    return (
      <div className="form-group" key={key}>
        <input type="text" className="form-control attributeRow" placeholder="Attribute selector" autoComplete="off"
               value={attributeRow.name} onChange={this.onChangeAttributeName.bind(this, key)} />
        <input type="text" className="form-control attributeRow leftSpacer" placeholder="Attribute value" autoComplete="off"
          value={attributeRow.value} onChange={this.onChangeAttributeValue.bind(this, key)} />
        <img src="/images/add.svg" className="attributeRowImg leftSpacer"  onClick={this.addNewAttributeRow} />
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
      <Modal isOpen={this.state.isOpen} onRequestHide={this.closeAddDialog} dialogStyles={dialogStyles}>
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
          <button type="button" className="btn btn-secondary" onClick={this.closeAddDialog}>Close</button>
          <button type="button" className="btn btn-primary leftSpacer" onClick={this.save}>Save changes</button>
        </div>
      </Modal>
    );
  },

  render: function() {
    return (
      <div className="addBtnContainer">
        <button className="btn btn-success" onClick={this.showAddDialog}>Add Item</button>
        <div>
          {this.renderDialog()}
        </div>

      </div>
    );
  }
});

export default AddLoginItem;