/* This exists so when the page is opened, the table shows up */

function draw_table(){
    $("#results").empty(); //clear the results div
    $.getHTMLuncached = function(url) {
        return $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            success: function(html){
                $("#results").append(html);
            }
        });
    };
    $.getHTMLuncached("/get/html");
};

$(document).ready(function(){
    draw_table();
})