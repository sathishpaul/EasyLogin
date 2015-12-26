/**
 * Handlers for options page
 *  - load list of existing items
 *  - create/save new item
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Card from './card';
import DialogComponent from './modal';

ReactDOM.render(<DialogComponent />, document.querySelector("#dialogContainer"));
ReactDOM.render(<Card name="myCard1" url="http://oracle.com"
    />, document.querySelector('#cardContainer'));

var myCollection = "ICS_LOGIN_COLLECTION";
var loadExistingInfo = function () {
    // chrome.storage.sync.get(myCollection, function(items) {
    //     var container = $("#cardContainer"),
    //         data = items[myCollection],
    //         item, key;
    //     container.empty();
    //     for(key in data) {
    //         item = data[key];
    //         makeHtmlFromItem(item).appendTo(container);
    //     }
    // });
};

var makeHtmlFromItem = function(item) {
    var div = $("<div></div>").addClass("card2"), p = $("<p></p>"), options = $("<span></span>").appendTo(div);
    p.text(item.name).appendTo(div);
    options.addClass("optionCls hide");
    div.on('click', function() {
        chrome.extension.sendMessage({item: item});
    });
    return div;
};

var saveHandler = function() {
    var obj = _prepareItem();
    chrome.storage.sync.get(myCollection, function(items) {
        if(items && !items[myCollection]) {
            items[myCollection] = {};
        }
        items[myCollection][obj.id] = obj;
        chrome.storage.sync.set(items, function() {
            // Notify that we saved.
            console.log('Settings saved');
            chrome.storage.sync.get(myCollection, function(data) {
                console.dir(data);
            });
        });
        $("#addUrlDialog").slideUp(200);
        loadExistingInfo();
    });
};

var _prepareItem = function() {
    var name = $("#name").val(),
        url = $("#url").val(),
        password = $("#password").val(),
        key = Date.now() + "";

    return {
        "id": key,
        "name": name,
        "url": url,
        "password": sjcl.encrypt(myCollection, password)
    };
};

var showAddDialog = function() {
    var $name = $("#name");
    $name.val('');
    $("#url").val('');
    $("#password").val('');
    $("#addUrlDialog").slideDown(200, function() {
        $name.focus();
    });
};

var hideAddDialog = function() {
    $("#addUrlDialog").slideUp(200);
};

window.onload = function() {
    /*$("#addBtn").on("click", showAddDialog);
    $("#saveBtn").on("click", saveHandler);
    $("#cancelBtn").on("click", hideAddDialog);
    loadExistingInfo();
*/};

