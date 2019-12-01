let username = process.env.username || process.env.user;

$(document).ready(function () {

    console.log(username);
    $("#username").text(username);


    

    //Implement this later
    $("#import").click(function() {
        $("#databaseFile").trigger('click');
    });

});