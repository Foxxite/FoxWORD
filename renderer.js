// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Setting up all required JS files
const { remote, BrowserWindow } = require('electron')
const app = remote.app;
const currentWindow = remote.getCurrentWindow()

$("#content").hide();

//All page code
$(document).ready(function() {
	
	console.log(app.getPath('userData'));

	//Main App Logic
	$("#logo_nav").click(function() {

		$(".navside").toggle("drop", { direction: 'left', mode: 'toggle' }, 500);
		
		if($(".navside").visible())
		{
			$(".main-content").css("left", "0px");
		}
		else
		{
			$(".main-content").css("left", "150px");
		}

	});


	//Insert logic to load right page on first start

	$.get('pages/home.html')
	.done(function(data) {
		$("#content").show("drop", { direction: 'right', mode: 'show' }, 500);
		$("#content").html(data);
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		var errorMessage;

		if (textStatus == 'timeout')
			errorMessage = 'The server is not responding';

		if (textStatus == 'error')
			errorMessage = textStatus + " " + errorThrown;

		$("#content").html("<h1>An internal error occured.</h1><h3>"+errorMessage+"</h3>");
	});
	
});