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

  /*
  * Start here, open decrypted item in the page, and inject script
  * */
  openItem: function(id) {
    var item = Object.assign({}, this.state.easyLoginItems[id]);
    item.attributes = [];
    item.attributes = this._decryptAttributes(this.state.easyLoginItems[id]);
    console.dir(item);
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
