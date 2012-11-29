$(function() {
	chrome.tabs.getSelected(null, function(tab) {
        //var tabId = tab.id;
        var tabUrl = tab.url;
        $('#url').val(tabUrl);
    });
    chrome.tabs.getSelected(null,function(tab) { // null defaults to current window
        var title = tab.title;
        $('#title').val(title);
        
    });

    $('#save').click(function() {
    	var baseURL = 'http://markpond.com/core/bookmarklets/chrome?';
    	baseURL += 'url=' + encodeURIComponent($('#url').val());
    	baseURL += '&title=' + encodeURIComponent($('#title').val());
    	baseURL += '&tags=' + encodeURIComponent($('#tags').val());
    	baseURL += '&excerpt=' + encodeURIComponent($('#excerpt').val());
    	if ($('input#private').is(':checked')) {
    		baseURL += '&private=true';
		}
    	$('#form').css('display', 'none');
    	$('#loader').fadeIn(500, function() {
    		$('#popup-load').load(baseURL, function() {
    			window.close();
    		});
    	});
    });

});