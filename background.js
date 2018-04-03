chrome.browserAction.onClicked.addListener(function(){
    var viewTabUrl = chrome.extension.getURL('player.html');
    chrome.tabs.create({url:viewTabUrl});
});
