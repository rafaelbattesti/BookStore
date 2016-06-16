var menuID;       //Hold user selection
var xmlData;     //Hold all the xml data from .ajax call (don't want to constantly go back and forth to the server)

//Function to build header
function buildAccordeon(xml) {
    var n = 0;

    $("section#accordeon").html("");
    $(xml).find("newsSite").each(function(){
        $("section#accordeon").append(
            "<div data-role='collapsible'>" +
            "<h3 id='head" + n + "'>" +
            $(this).find("newsHeadline").text() +
            "</h3>" +
            "<p class='content' id='content" + n + "'>" +
            $(this).find("newsContent").text() +
            "<a href='" + $(this).find("newsLink").text() + "' class='ui-btn' target='blank'>More</a>" +
            "</p>" +
            "</div>"
        ).collapsibleset('refresh');
        n++;
    });
}

//Function to create header
function createHeader(xml) {
    $("#header").html("<h3>Hello, I'm " + $(xml).find("sName").text() + "</h3>");
}

//Function to create footer
function createFooter(xml) {
    $("#footer").html(
        "<p>Program: " + $(xml).find("sName").attr("sProgram") + "</p>" +
        "<p>Student Number: " + $(xml).find("sName").attr("sNumber") + "</p>"
    );
}

//Function to make xml available
function buildPage(xml) {
    xmlData = xml;
    buildAccordeon(xmlData);
    createHeader(xmlData);
    createFooter(xmlData);
}

//Function to display error
function displayErr(e) {
    alert(e.status + "-" + e.statusText);
}

//Pagecreate loads only once
$(document).on("pagecreate", "#home", function(){

    //Setup Ajax call
    $.ajax({
        type     : "GET",
        url      : "ex2.xml",
        dataType : "xml",
        success  : buildPage,
        error    : displayErr
    });

});