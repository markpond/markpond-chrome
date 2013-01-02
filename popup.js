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

		if ($('input#private').is(':checked')) {
			isPrivate = 'true';
		} else {
			isPrivate = '';
		}

		$('#form').css('display', 'none');
		$('#loader').fadeIn(500, function() {
			$.ajax({
			  type: "POST",
			  url: "https://markpond.com/core/bookmarklets/chrome",
			  data: {
				url: $('#url').val(),
				title: $('#title').val(),
				tags: $('#tags').val(),
				excerpt: $('#excerpt').val(),
				private: isPrivate
			  },
			  cache: false
			}).done(function(msg) {
				if (msg == 'NotLoggedIn') {
					$('#loader').css('padding', '15px');
					$('#loader').css('height', '50px');
					$('#loader').html('<p>Please log in to Markpond first</p>');
				} else {
				  	$('#loader').css('background', 'url(done.png) no-repeat center center').delay(5000, function() {
						$('#done').delay(500).fadeIn(1000, function() {
							window.close();
						})
					});
			  	}
			});
		});
	});

});