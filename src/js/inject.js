chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			onDocumentReady();					
		}
	}, 10);
});

function onDocumentReady() {
	var body = document.getElementsByTagName("body")[0];
	var contentScript = document.createElement("script");
    contentScript.setAttribute('type', 'text/javascript');
    contentScript.setAttribute('src', chrome.extension.getURL('/js/content.js'));
	body.appendChild(contentScript);
}
