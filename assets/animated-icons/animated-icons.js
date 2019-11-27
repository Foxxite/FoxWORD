var scripts = document.getElementsByTagName('script');
var path = scripts[scripts.length-1].src.split('?')[0];
var mydir = path.split('/').slice(0, -1).join('/')+'/';

window.onload = function() {
    if (!window.jQuery) {  
        throw new Error('jQuery is required for animated icons to work!');
    }
}

$(document).ready(function() {

    var scriptPath = mydir;
    console.log(scriptPath);

    $("i.anic").each(function() {

        var iconName = $(this).data("icon");

        var img = "<img src='"+scriptPath+"/"+iconName+"/"+iconName+".gif'></img>";

        $(this).html(img);

    });

});