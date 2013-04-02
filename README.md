Markpond Chrome Extension
=============

This is the source code of the Chrome Extension for Markpond Beta, written in Javascript, HTML and CSS.

Authenticaion
-------------

Markpond uses cookies to figure out which user the bookmark belongs to, and they are the same as the session cookies used on markpond.com.

Right now, no errors are thrown if you are not logged in to Markpond, which will mean that your bookmarks will not be stored. I will add this when I have the time. 

Endpoints
---------

Markpond contacts this endpoint when saving bookmarks from the popup menu:

	https://markpond.com/bookmarklets/chrome
	
And this one when saving using the context menu:

	https://markpond.com/bookmarklets/chrome_context