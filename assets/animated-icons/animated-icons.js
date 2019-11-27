window.onload = function() {
    if (!window.jQuery) {  
        throw new Error('jQuery is required for animated icons to work!');
    }
}

$(doucment).ready(function() {

    var scriptPath = document.currentScript;
    alert(scriptPath);

    $("i.anic").each(function() {

        var iconName = $(this).data("icon");

        var img = "<svg src='' ";

        $(this).html();

    });

});