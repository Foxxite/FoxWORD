// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Setting up all required JS files
const { remote, BrowserWindow } = require('electron')
const app = remote.app;
const currentWindow = remote.getCurrentWindow()

//All page code
$(document).ready(function() {
	
	console.log(app.getPath('userData'));
	
});