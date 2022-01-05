/* This code was taken from the class. Additional
methods were deleted, because they were not used. */


/* This exists so when the page is opened, the table 
with all the data shows up */
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

/* Draws a table */
$(document).ready(function (){
	draw_table();
});