chrome.tabs.getSelected(null,function(tab) { // null defaults to current window
	var title = tab.title;
	$('#title').val(title);
});

// Set up the context menus
chrome.contextMenus.create({
	"title": "Save to Markpond",
	"contexts": ["page", "selection", "link"],
	"onclick" : function(e) {

        var url = e.pageUrl;

        if (e.selectionText) { var excerpt = encodeURIComponent(e.selectionText); } else { var excerpt = ''; }
        if (e.linkUrl) { url = encodeURIComponent(e.linkUrl); }

        $.ajax({
        	type: "POST",
        	url:  "https://markpond.com/bookmarklets/tiny",
        	data: {
        		url: url,
        		title: $('#title').val(),
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