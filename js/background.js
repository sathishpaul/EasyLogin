var myCollection = "ICS_LOGIN_COLLECTION";
var createTabForRequest = function(request, sender) {
    if (request.item) {
        var item = request.item;
        createTab(item);
    } else {
        console.log("got an unintended message");
    }
};

//Icon click handler
var clickHandler = function() {
    chrome.storage.sync.get('ICS_LOGIN_COLLECTION', function(items) {
        var data = items['ICS_LOGIN_COLLECTION'],
            item;
        for(key in data) {
            item = data[key];
            createTab(item);
            break;
        }
    });
};

//Create a tab, inject script, and send a message to the tab
//TODO: this method does too many things?
var createTab = function (item) {
    var properties = {url: item.url};
    item.password = sjcl.decrypt(myCollection, item.password);
    chrome.tabs.create(properties, function(tab) {
        chrome.tabs.executeScript(tab.id, {file:"doLogin.js"}, function(results) {
            chrome.tabs.sendMessage(tab.id, {item: item}, function(response) {
                console.dir(response);
            });
        });
    });
};

//Register handlers with chrome
chrome.runtime.onMessage.addListener(createTabForRequest);

//TODO: verify if this function call works
chrome.commands.onCommand.addListener(clickHandler);
chrome.browserAction.onClicked.addListener(clickHandler);

/*
    //Enable this if you want to see the popup when the extension icon is clicked
    chrome.browserAction.setPopup({
	popup: "../html/popup.html"
});
*/



