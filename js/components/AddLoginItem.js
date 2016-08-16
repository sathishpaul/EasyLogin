import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalClose, ModalHeader, ModalBody, ModalTitle } from 'react-modal-bootstrap';

var AddLoginItem = React.createClass({

  EASY_LOGIN_COLLECTION: "easyLoginCollection",

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
      'url': '',
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
      isPasswordType: false
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

  onChangeUrl: function(e) {
    var url = e.target.value;
    this.setState({
      loginItem: {
        ...this.state.loginItem,
        url: url
      }
    });
  },

  onChangeAttributeName: function(key, e) {
    var attributes = this.state.loginItem.attributes.map((item) => item),
      attributeObj = this.state.loginItem.attributes[key];
    attributeObj.name = e.target.value;

    //update DOM node type based on the name of the attribute
    if(e.target.value === "password") {
      attributeObj.isPasswordType = true;
    } else {
      attributeObj.isPasswordType = false;
    }

    this.setState({
      loginItem: {
        ...this.state.loginItem,
        attributes: attributes
      }
    });
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

  save: function() {
    var obj = {
      ...this.state.loginItem,
      "id": Date.now() + ""
    };

    //TODO: validation for empty attributes

    chrome.storage.sync.get(this.EASY_LOGIN_COLLECTION, function(items) {
      if(items && !items[this.EASY_LOGIN_COLLECTION]) {
        items[this.EASY_LOGIN_COLLECTION] = {};
      }
      items[this.EASY_LOGIN_COLLECTION][obj.id] = obj;
      chrome.storage.sync.set(items, function() {
        // Notify that we saved.
        console.log("Login Item "+obj.name+" saved.");

        //close dialog
        this.closeAddDialog();
      }.bind(this));
    }.bind(this));
  },

  renderAttributeRow: function(attribute, key) {
    var type = "text";
    if(attribute.isPasswordType) {
      type = "password";
    }
    return (
      <div className="form-group" key={key}>
        <input type="text" className="form-control attributeRow" placeholder="Attribute selector" autoComplete="off"
               value={attribute.name} onChange={this.onChangeAttributeName.bind(this, key)} />


        <input type={type} className="form-control attributeRow leftSpacer" placeholder="Attribute value"
               autoComplete="off" value={attribute.value} onChange={this.onChangeAttributeValue.bind(this, key)} />
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
              <input type="text" className="form-control" placeholder="Url"
                     autoComplete="off" value={this.state.loginItem.url} onChange={this.onChangeUrl}/>
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
        <button className="btn btn-success" onClick={this.showAddDialog}>Add New Login</button>
        <div>
          {this.renderDialog()}
        </div>

      </div>
    );
  }
});

export default AddLoginItem;