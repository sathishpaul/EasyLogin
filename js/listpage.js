//Popup menu shown when user clicks on extension icon
//Also adds Options... button at the end

chrome.storage.sync.get('ICS_LOGIN_COLLECTION', function(items) {
	var container = $("#listContainer"),
		data = items['ICS_LOGIN_COLLECTION'],
        key;
	for(key in data) {
		var item = data[key],
			div = $("<div></div>").text(item.name).addClass('loginItem').data(item).appendTo(container);
		div.on('click', function() {
			var item = $(this).data();
			chrome.extension.sendMessage({item: item});
		});
	}
	div = $("<div></div>").text("Options...").addClass('loginItem optionsDiv').appendTo(container);	

	div.on('click', function() {
		chrome.tabs.create({'url': chrome.extension.getURL("html/options.html") } );
	});
});