Readme

What is this about?
EasyLogin is a Chrome extension that allows you to quickly login to your favorite web applications. It provides one-click login to most Web applications right from within Chrome's "New Tab" page that you are so familiar with.

How do I use it?
After you install it from the Chrome Web store (link here), when you open a new tab in Chrome, you will be greeted with a page like this.

<insert screenshot>

Click on the "Add new Login" button, enter the url, username, and password details along with the submit button selector. Save the changes and you are ready to one-click login for that URL.

What's a 'selector' mentioned in the 'Create' dialog?
A selector is simply a term used to identify a HTML element (text boxes, buttons etc). It could be either a name, id or a CSS class associated with that element.
 
 

For example: if the login page of your application has the following HTML structure

<input type="text" name="username" id="" class="unameCls" />
<input type="password" name="password" id="" class="unameCls" />



Frequently asked questions.

Why do I need this? Isn't the browser password manager or 1Password enough?

What about security? Where are my username, password details stored?
	- Explain the use of SJCL - Stanford JavaScript Cryptographic Library
	- Urls, usernames and passwords are not stored in any cloud
	- They are synced between your Chrome devices using the API chrome.storage.sync


This extension doesn't work the way I expect it to. File a bug report here (github link)

If you have read this far, Thank You!
