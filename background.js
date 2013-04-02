// Set up the context menus
chrome.contextMenus.create({
	"title": "Save to Markpond",
	"contexts": ["page", "selection", "link"],
	"onclick" : function(e) {

        var url = e.pageUrl;

        var endpoint = "http://localhost:3000/bookmarklets/tiny"

        if (e.selectionText) { excerpt = encodeURIComponent(e.selectionText); }
        if (e.linkUrl) { url = encodeURIComponent(e.linkUrl); }

        $.ajax({
        	type: "POST",
        	url: endpoint,
        	data: {
        		bookmark_url: url,
        		source: "Chrome Extension",
        		excerpt: excerpt
        	},
        	cache: false,
        	complete: function(jqXHR, textStatus) {
        		switch (jqXHR.status) {
        			case 200:
        				alert("Saved Successfully");
        				break;
        			case 401:
        				alert("Please log in to Markpond first");
        				break;
        			default:
        				alert("Something went wrong. Please try agian.")
        		}
        	}
        });
    }
});