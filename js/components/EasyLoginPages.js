import React from 'react';
import AddLoginItem from './AddLoginItem';

const EasyLoginPages = React.createClass({

  EASY_LOGIN_COLLECTION: "easyLoginCollection",

  getInitialState: function() {
    return {
      "easyLoginItems": {}
    };
  },

  componentDidMount: function() {
    chrome.storage.sync.get(this.EASY_LOGIN_COLLECTION, function(data) {
      this.setState({
        "easyLoginItems": data[this.EASY_LOGIN_COLLECTION]
      })
    }.bind(this));
  },

  /*
  * Start here
  *   - on click of item, launch new tab, inject script to auto fill and submit
  *   - Extract collection id into constants file
  * */
  renderLoginItem: function(item, index) {
    return (
      <div key={index} className="pageItem" title={item.url}>
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
