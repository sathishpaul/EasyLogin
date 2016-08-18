var getElementOnPage = function(selector) {
  //try an id or class match first
  if(selector && (selector.indexOf("#") === 0 || selector.indexOf(".") === 0)) {
    return document.querySelector(selector);
  } else {
    //return a name match
    var selectedElements = document.getElementsByName(selector);
    if(selectedElements && selectedElements.length > 0) {
      return selectedElements[0];
    }
    return null;
  }
};

var messageListener = function(request, sender, sendResponse) {
  if (request.item) {
    var attributes = request.item.attributes;
    attributes.forEach(function(attr) {
      var name = attr.name,
        value = attr.value,
        element = getElementOnPage(name);
      if(element) {
        element.value = value;
      }
    });

    //TODO: Submit form, click button etc
  } else {
    console.log("got an unintended message");
  }
};

chrome.runtime.onMessage.addListener(messageListener);