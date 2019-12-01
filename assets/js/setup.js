const { remote, BrowserWindow } = require('electron')
const app = remote.app;

var fs = require('fs');
const basePath = app.getPath('userData') + "/databases";
const databaseName = "/database.foxword";

let username = process.env.username || process.env.user;

$(document).ready(function () {

    console.log(username);
    $("#username").text(username);
    $("#setupnew").hide();
    $("#setupdb").hide();


    $("#new").click(function() {

        /*
        if (!fs.existsSync(basePath)){
            fs.mkdirSync(basePath);
        }
        fs.writeFileSync(basePath+databaseName, "");
        */

        $("#firstaction").hide("drop", { direction: 'left', mode: 'hide' }, 500, function() {
            $("#setupnew").show("drop", { direction: 'right', mode: 'show' }, 500, function() {

                app.relaunch()
                app.quit()

            });
        });
        

    });


    //Implement this later
    $("#import").click(function() {
        $("#databaseFile").trigger('click');
    });

});

