import React from 'react';
import AddLoginItem from './AddLoginItem';
import CryptoUtils from './CryptoUtils';
import PubSub from 'pubsub-js';
import Constants from './Constants';
import sweetAlert from 'sweetalert';

const EasyLoginPages = React.createClass({

  EASY_LOGIN_COLLECTION: "easyLoginCollection",

  SUBSCRIPTION: '',

  getInitialState: function() {
    return {
      "easyLoginItems": {}
    };
  },

  fetchItems: function() {
    chrome.storage.sync.get(this.EASY_LOGIN_COLLECTION, function(data) {
      if(data && data[this.EASY_LOGIN_COLLECTION]) {
        this.setState({
          "easyLoginItems": data[this.EASY_LOGIN_COLLECTION]
        })
      }
    }.bind(this));
  },

  msgHandler: function(msg, data) {
    if(data === Constants.EASY_LOGIN_ITEM_SAVED) {
      this.fetchItems();
    }
  },

  componentDidMount: function() {
    this.fetchItems();
    this.SUBSCRIPTION = PubSub.subscribe(Constants.EASY_LOGIN_ITEMS_TOPIC, this.msgHandler);
  },

  componentWillUnmount: function() {
    if(this.SUBSCRIPTION !== '') {
      PubSub.unsubscribe(this.SUBSCRIPTION);
      this.SUBSCRIPTION = '';
    }
  },

  openItem: function(id) {
    var item = Object.assign({}, this.state.easyLoginItems[id]);
    item.attributes = [];
    item.attributes = this._decryptAttributes(this.state.easyLoginItems[id]);

    //Doing the login in the same tab (using chrome.tabs.update) does not work, the message does not get received.
    //So create a new tab and inject the url + attributes
    chrome.tabs.create({url: item.url}, function(tab) {
      console.log("tab created "+tab.id);
      // chrome.webNavigation.onCommitted.addListener(function(data) {
      //   console.log("navigation committed in "+data.tabId);
      //   console.dir(data);
      //   if(data.transitionQualifiers && data.transitionQualifiers.length === 0 && data.tabId === tab.id) {
      //     console.log("gotcha");
      //     chrome.tabs.executeScript(data.tabId, {file:"doLogin.js"}, function() {
      //       console.log("done executing, sending message");
      //       chrome.tabs.sendMessage(data.tabId, {item: item}, function(response) {
      //         console.log("sent message");
      //       });
      //     });
      //   }
      // });
      //
      // chrome.webNavigation.onDOMContentLoaded.addListener(function(data) {
      //   console.log("dom content loaded");
      //   console.dir(data);
      // });

      var onCompleteHander = function(data) {
        console.dir(data);
        if(data.tabId === tab.id) {
          console.log("tab matched, sending item ");
          chrome.tabs.executeScript(data.tabId, {file:"doLogin.js"}, function() {
            console.log("done executing, sending message");
            chrome.tabs.sendMessage(data.tabId, {item: item}, function(response) {
              console.log("sent message");
            });
            chrome.webNavigation.onCompleted.removeListener(onCompleteHander);
          });
        }
      };

      chrome.webNavigation.onCompleted.addListener(onCompleteHander);
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

  editItem: function(item) {
    PubSub.publish(Constants.EASY_LOGIN_ITEMS_TOPIC, {
      "action": Constants.EASY_LOGIN_ITEM_EDIT,
      "id": item
    });
  },

  deleteItem: function(id) {
    var items = Object.assign({}, this.state["easyLoginItems"]);

    sweetAlert({
      title: 'Are you sure?',
      text: 'Deleting will remove the item and all associated attributes!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, go back!',
      closeOnConfirm: false
    }, () => {
      sweetAlert('Deleted!', 'Your item has been deleted.', 'success');
      //remove item by id
      delete items[id];

      //set in chrome.storage.sync
      chrome.storage.sync.set({
        "easyLoginCollection": items
      }, function() {
        this.fetchItems();
      }.bind(this));
    });
  },

  renderLoginItem: function(item, index) {
    return (
      <div key={index} data-id={item.id} className="pageItem" title={item.url}>
        <div className="imgHoverOptions">
          <img src="images/edit.svg" onClick={this.editItem.bind(this, item.id)} />
          <img src="images/delete-plain.svg" onClick={this.deleteItem.bind(this, item.id)} />
        </div>
        <div className="itemText" onClick={this.openItem.bind(this, item.id)}>{item.name}</div>
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
      <div className="displayFlex flexColumnDirection">
        <div className="pageTitle">
          <h3>Easy Login pages</h3>
          <AddLoginItem />
        </div>
        <div className="easyLoginItemsContainer">
          <div className="loginItemsWidthEnforcer">
            {this.renderEasyLoginItems()}
          </div>
        </div>
      </div>
    );
  }
});

export default EasyLoginPages;
