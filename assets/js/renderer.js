// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Setting up all required JS files
const { remote, BrowserWindow } = require('electron')
const app = remote.app;
const currentWindow = remote.getCurrentWindow()

const fs = require('fs')

$("#content").hide();

//All page code
$(document).ready(function() {
	
	console.log(app.getPath('userData'));

	//Figure Out If First Launch & Decrypt Database

	const basePath = app.getPath('userData');

	fs.access(basePath + "/databases/database.foxword", fs.F_OK, (err) => {
		if (err) {
			setupNewUser();
		}
		else
		{
			setupUser();
		}
	})

	//Show first load animations
	$(".navbar").hide();
	$(".navside").hide();

	$(".navbar").show("drop", { direction: 'up', mode: 'show' }, 500);
	$(".navside").show("drop", { direction: 'left', mode: 'show' }, 500);
	setTimeout(function () { $("body").css("background-color", "white"); }, 200);

	//Render Dynamic Launch Content
	$("#version span").html(app.getVersion());

});

function setupNewUser()
{
	$("body").hide();
	$.get('pages/newuser.html')
	.done(function(data) {
		$("body").html(data);
		$("body").show("drop", { direction: 'up', mode: 'show' }, 500);
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		var errorMessage;

		if (textStatus == 'timeout')
			errorMessage = 'The server is not responding';

		if (textStatus == 'error')
			errorMessage = textStatus + " " + errorThrown;

		$("#content").html("<h1>An internal error occurred.</h1><h3>"+errorMessage+"</h3>");
	});
}

function setupUser()
{
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

		$("#content").html("<h1>An internal error occurred.</h1><h3>"+errorMessage+"</h3>");
	});
}