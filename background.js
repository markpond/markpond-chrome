// Set up the context menus
chrome.contextMenus.create({
	"title": "Save to Markpond",
	"contexts": ["page", "selection", "link"],
	"onclick" : function(e) {
		var url = e.pageUrl;
		var markpondURL = "http://markpond.com/core/bookmarklets/chrome-context?";
          
        if (e.selectionText) { markpondURL += "title=" + encodeURIComponent(e.selectionText) + "&"; }
          
        if (e.linkUrl) { url = e.linkUrl; }
          
        markpondURL += "url=" + encodeURIComponent(url);
        $('#load').load(markpondURL);
    }
});