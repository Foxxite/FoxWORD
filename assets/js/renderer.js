// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Setting up all required JS files
const { remote, BrowserWindow, shell } = require('electron')
const app = remote.app;
const currentWindow = remote.getCurrentWindow()
const basePath = app.getPath('userData') + "/databases/database.foxword";

const fs = require('fs')

$("#content").hide();

//All page code
$(document).ready(function() {
	
	console.log(app.getPath('userData'));

	//Setup right event handlers
	$(document).on('click', 'a[href^="http"]', function(event) {
        event.preventDefault();
        shell.openExternal(this.href);
    });

	//Figure Out If First Launch & Decrypt Database
	fs.access(basePath, fs.F_OK, (err) => {
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
		displayAjaxError(jqXHR, textStatus, errorThrown);
	});
}

function setupUser()
{
	//Insert logic to load right page on first start
	$.get('pages/main.html')
	.done(function(data) {
		$("body").show("drop", { direction: 'right', mode: 'show' }, 500);
		$("body").html(data);
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		displayAjaxError(jqXHR, textStatus, errorThrown);
	});
}

function displayAjaxError(jqXHR, textStatus, errorThrown)
{
	var errorMessage;

	if (textStatus == 'timeout')
		errorMessage = 'An IO operation timed out!';

	if (textStatus == 'error')
		errorMessage = textStatus + " " + errorThrown;

	$("body").html("<h1>An internal error occurred.</h1><h3>"+errorMessage+"</h3>");
}