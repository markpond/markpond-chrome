$(document).ready(function() {
	$('#tags').tagsInput({
	  autocomplete_url: 'https://markpond.com/ajax/tags.json',
	  removeWithBackspace: true
	});
});

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
				url: "https://markpond.com/bookmarklets/chrome",
				data: {
					url: $('#url').val(),
					title: $('#title').val(),
					tags: $('#tags').val(),
					excerpt: $('#excerpt').val(),
					private: isPrivate
				},
				cache: false,
				complete: function(jqXHR, textStatus) {
					switch (jqXHR.status) {
						case 200:
							$('#loader').css('background', 'url(done.png) no-repeat center center').delay(5000, function() {
								$('#done').delay(500).fadeIn(1000, function() {
									window.close();
								})
							});
							break;
						case 401:
							$('#loader').css('padding', '15px');
							$('#loader').css('height', '50px');
							$('#loader').html('<p>Please log in to Markpond first</p>');
							break;
						default:
							alert("Something went wrong. Please try agian.");
					}
				}
			});
		});
	});

});
