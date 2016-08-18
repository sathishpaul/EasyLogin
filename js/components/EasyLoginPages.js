import React from 'react';
import AddLoginItem from './AddLoginItem';
import CryptoUtils from './CryptoUtils';

const EasyLoginPages = React.createClass({

  EASY_LOGIN_COLLECTION: "easyLoginCollection",

  getInitialState: function() {
    return {
      "easyLoginItems": {}
    };
  },

  componentDidMount: function() {
    chrome.storage.sync.get(this.EASY_LOGIN_COLLECTION, function(data) {
      if(data && data[this.EASY_LOGIN_COLLECTION]) {
        this.setState({
          "easyLoginItems": data[this.EASY_LOGIN_COLLECTION]
        })
      }
    }.bind(this));
  },

  openItem: function(id) {
    var item = Object.assign({}, this.state.easyLoginItems[id]);
    item.attributes = [];
    item.attributes = this._decryptAttributes(this.state.easyLoginItems[id]);

    //Doing the login in the same tab (using chrome.tabs.update) does not work, the message does not get received.
    //So create a new tab and inject the url + attributes
    chrome.tabs.create({url: item.url}, function(tab) {
      chrome.tabs.executeScript(tab.id, {file:"doLogin.js"}, function(results) {
        chrome.tabs.sendMessage(tab.id, {item: item}, function(response) {
        });
      });
    });
  },

  _decryptAttributes: function(item) {
    var attributes = item.attributes;
    if(attributes && attributes.length > 0) {
      attributes = attributes.map(function(attr) {
        //Make a clone of the attribute object to prevent the page state mutation
        var attribute = Object.assign({}, attr);
        if(attribute.isPasswordType) {
          attribute.value = CryptoUtils.decrypt(attribute.value);
        }
        return attribute;
      });
    }
    return attributes;
  },

  renderLoginItem: function(item, index) {
    return (
      <div key={index} data-id={item.id} className="pageItem" title={item.url}
           onClick={this.openItem.bind(this, item.id)}>
        {item.name}
      </div>
    );
  },

  renderEasyLoginItems: function() {
    var keys = Object.keys(this.state.easyLoginItems);
    return keys.map(function(id, index) {
      return this.renderLoginItem(this.state.easyLoginItems[id], index);
    }.bind(this));
  },

  render() {
    return (
      <div>
        <AddLoginItem />
        <div className="easyLoginItemsContainer">
          {this.renderEasyLoginItems()}
        </div>
      </div>
    );
  }
});

export default EasyLoginPages;
