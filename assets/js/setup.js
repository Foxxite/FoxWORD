const { remote, BrowserWindow } = require('electron')
const app = remote.app;

var fs = require('fs');
const basePath = app.getPath('userData') + "/databases";
const databaseName = "/database.foxword";

const username = process.env.username || process.env.user;

const viewPass = require('./showpassword.js');

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

    $("#new").click(function () {

        $("#firstaction").hide("drop", { direction: 'left', mode: 'hide' }, 500, function () {
            $("#bckbtn").show();
            $("#setupnew").show("drop", { direction: 'right', mode: 'show' }, 500, function () { });
        });

    });

    var password = $('input[name="pass1"]');
    var meter = $('#password-strength-meter');
    var text = $('#password-strength-text');

    var canContinueStrength = false;
    var canContinueMatch = false;
    var continueError = "";

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

        //update the button
        if(result.score >= 3)
        {
            canContinueStrength = true;
        }
        else
        {
            canContinueStrength = false;
            continueError = "The password does not match the minium required strength.";
        }

    });

    $("input[name='pass2']").keyup(function() {

        if($(this).val() == password.val())
        {
            canContinueMatch = true;
        }
        else
        {
            canContinueMatch = false;
            continueError = "The passwords do not match.";
        }

    });

    $("#setupnew form").change(function() { updateContinueButton() });

    $("#setupnew form").keyup(function() { updateContinueButton() });

    function updateContinueButton()
    {
        if(canContinueStrength == true && canContinueMatch == true)
        {
            $("[name='createdb']").removeClass("disabled");

            $("[name='createdb']").addClass("btn-primary");
            $("[name='createdb']").removeClass("btn-warning");

            $("[name='createdb']").val("Create Database");
        }
        else
        {
            $("[name='createdb']").addClass("disabled");

            $("[name='createdb']").addClass("btn-warning");
            $("[name='createdb']").removeClass("btn-primary");

            $("[name='createdb']").val(continueError);
        }
    }

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