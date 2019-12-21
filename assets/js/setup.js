const { remote, BrowserWindow } = require('electron')
const app = remote.app;

var fs = require('fs');
const basePath = app.getPath('userData') + "/databases";
const databaseName = "/database.foxword";

let username = process.env.username || process.env.user;

//Dropbox Password Strength Lib
var zxcvbn = require('zxcvbn');
var strength =
{
    0: "Worst",
    1: "Bad",
    2: "Weak",
    3: "Good",
    4: "Strong"
}


$(document).ready(function () {

    //Reset View
    console.log(username);
    $("#username").text(username);
    $("#setupnew").hide();
    $("#setupdb").hide();
    $("#bckbtn").hide();

    //Back Button Code
    $("#bckbtn").click(function () {

        $("#setupnew").hide();
        $("#setupdb").hide();
        $("#bckbtn").hide();

        $("#firstaction").show("drop", { direction: 'up', mode: 'show' }, 500, function () { });

    });


    /* #region New Database */

    var password = $('input[name="pass1"]');
    var meter = $('#password-strength-meter');
    var text = $('#password-strength-text');

    password.keyup(function () { 

        var val = password.val();
        var result = zxcvbn(val);

        // Update the password strength meter
        meter.val(result.score);

        // Update the text indicator
        if (val !== "")
        {
            text.html("Password strength: " + "<strong>" + strength[result.score] + "</strong> " + "<span class='feedback'>" + result.feedback.warning + "&nbsp;" + result.feedback.suggestions + "</span>"); 
        }
        else
        {
            text.html("");
        }

    });

    $("#new").click(function () {

        $("#firstaction").hide("drop", { direction: 'left', mode: 'hide' }, 500, function () {
            $("#bckbtn").show();
            $("#setupnew").show("drop", { direction: 'right', mode: 'show' }, 500, function () { });
        });

    });

    $("#create").click(function () {

        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath);
        }
        fs.writeFileSync(basePath + databaseName, "");

    })
    /* #endregion */


    //Implement this later
    $("#import").click(function () {
        $("#databaseFile").trigger('click');
    });

});