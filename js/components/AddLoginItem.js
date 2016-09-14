import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalClose, ModalHeader, ModalBody, ModalTitle } from 'react-modal-bootstrap';
import CryptoUtils from './CryptoUtils';
import Constants from './Constants';
import PubSub from 'pubsub-js';

var AddLoginItem = React.createClass({

  EASY_LOGIN_COLLECTION: "easyLoginCollection",

  SUBSCRIPTION: '',

  getInitialState: function() {
    return {
      'isOpen': false,
      'loginItem': this._getEmptyLoginItem()
    };
  },

  componentDidMount: function() {
    this.SUBSCRIPTION = PubSub.subscribe(Constants.EASY_LOGIN_ITEMS_TOPIC, this.msgHandler);
  },

  componentWillUnmount: function() {
    if(this.SUBSCRIPTION !== '') {
      PubSub.unsubscribe(this.SUBSCRIPTION);
      this.SUBSCRIPTION = '';
    }
  },

  msgHandler: function(msg, data) {
    var itemId = data.id;
    if(itemId) {
      chrome.storage.sync.get(this.EASY_LOGIN_COLLECTION, function(data) {
        if(data && data[this.EASY_LOGIN_COLLECTION]) {
          var loginItem = data[this.EASY_LOGIN_COLLECTION][itemId];
          if(loginItem) {
            this.setState({
              'isOpen': true,
              'loginItem': loginItem
            });
          }
        }
      }.bind(this));
    }
  },

  showAddDialog: function() {
    this.setState({
      isOpen: true,
      loginItem: this._getEmptyLoginItem()
    });
  },

  closeAddDialog: function() {
    this.setState({
      isOpen: false
    });
  },

  _getEmptyLoginItem: function() {
    var emptyAttribute = this._getEmptyAttributeModel();
    return  {
      'name': '',
      'url': '',
      'submitSelector': '',
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

  onChangeSubmitSelector: function(e) {
    var selector = e.target.value;
    this.setState({
      loginItem: {
        ...this.state.loginItem,
        submitSelector: selector
      }
    });
  },

  onChangeAttributeName: function(key, e) {
    var attributes = this.state.loginItem.attributes.map((item) => item),
      attributeObj = this.state.loginItem.attributes[key];
    attributeObj.name = e.target.value;

    //update DOM node type based on the name of the attribute
    attributeObj.isPasswordType = (e.target.value.indexOf("password") >= 0);

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

  _encryptPasswordValues: function(attributes) {
    var encryptedAttrs = [];
    if(attributes && attributes.length > 0) {
      encryptedAttrs = attributes.map(function(attribute) {
        if(attribute.isPasswordType) {
          attribute.value = CryptoUtils.encrypt(attribute.value);
        }
        return attribute;
      }, this);
    }
    return encryptedAttrs;
  },

  save: function() {
    var obj = {
      ...this.state.loginItem,
      "id": Date.now() + ""
    };

    obj.attributes = this._encryptPasswordValues(obj.attributes);
    //TODO: validation for empty attributes

    chrome.storage.sync.get(this.EASY_LOGIN_COLLECTION, function(items) {
      if(items && !items[this.EASY_LOGIN_COLLECTION]) {
        items[this.EASY_LOGIN_COLLECTION] = {};
      }
      items[this.EASY_LOGIN_COLLECTION][obj.id] = obj;
      chrome.storage.sync.set(items, function() {
        this.closeAddDialog();
        PubSub.publish(Constants.EASY_LOGIN_ITEMS_TOPIC, Constants.EASY_LOGIN_ITEM_SAVED);
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

  /**
   * Start here
   *  - add a way to submit form - button to click, enter key to press on attribute etc
   *  - use pub-sub.js to send message to container to refresh itself?
   */
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
              <input type="text" autoFocus className="form-control" placeholder="Name to identify this item"
                     autoComplete="off" value={this.state.loginItem.name} onChange={this.onChangeNameHandler}/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Url"
                     autoComplete="off" value={this.state.loginItem.url} onChange={this.onChangeUrl}/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Submit button selector"
                     value={this.state.loginItem.submitSelector} onChange={this.onChangeSubmitSelector} />
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