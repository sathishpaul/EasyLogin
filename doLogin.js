chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.item) {
    	var scriptNode = document.createElement('script');
		scriptNode.textContent='doLogin();';
		document.getElementsByName('username')[0].value = request.item.name;
        //TODO: include username here instead of name
		document.getElementsByName('password')[0].value = request.item.password;
		document.body.appendChild(scriptNode);
    } else {
    	console.log("got an unintended message");
    }
});