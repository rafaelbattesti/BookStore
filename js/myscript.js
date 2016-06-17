/**
 * Application : BookStore
 * Name        : myscript.js
 * Author      : rafaelbattesti
 * Since       : 2016-06-15
 * Version     : 0.1
 */

//Determines which information to display
var menuId;

//Keeps the data for easy access across pages (avoids multiple AJAX calls)
var data = "Gets this value first";

/*************************************************************************************************************
 * FUNCTION DECLARATIONS                                                                                     *
 ************************************************************************************************************/

//Display an alert with error
function showErr(e) {
    var str = "Status: " + e.status + "\n" + "Status Text: " + e.statusText + "\n" + "Message: " + e.message;
    alert(str);
}

//Sets home title
function setTitle(xml) {
    var title = $(xml).find("title").text();
    $("title").html(title);
    return title;
}

//Builds the home page header
function buildHeader(title, id) {
    $(id + ">h1").html(title);
}

//Builds the home page menu
function buildMenu(xml) {
    var n = 0;
    $(xml).find("book").each(function(){
        $("#menu-" + n).html($(this).find("book>name").text());
        n++;
    });
}

function buildList(xml) {
    var n = 0;
    var imgElem;
    $(xml).find("book").each(function(){
        var image = $(this).find("book>name").attr("img");
        imgElem = $("#img-" + n)
        imgElem.append(
             "<img src='img/" + image + "' class='ui-li-thumb'/>" +
                 "<h2 class='ui-li-heading'>" + $(this).find("book>name").text() + "</h2>"  +
                    "<p class='ui-li-desc'>" + $(this).find("book>author").text() + "</p>"
        )
        n++;
    });
    $("#mainList").listview("refresh");

}

//Builds the home page footer
function buildFooter(xml) {
    var stdNum = $(xml).find("student").attr("studentNumber");
    var stdProg = $(xml).find("student").attr("studentProgram");
    var stdName = "&copy; " + $(xml).find("student").text();
    $(".ui-block-a>p").html(stdProg);
    $(".ui-block-b>p").html(stdName);
    $(".ui-block-c>p").html(stdNum);
}

//Build the home page
function buildHome(xml) {
    data = xml;
    var title = setTitle(xml);
    buildHeader(title, "#homeHeader");
    buildFooter(xml);
    buildMenu(xml);
    buildList(xml);
}

//Build the popup
function buildPopup(xml) {
    var pop = $("#popupGo");
    $("#popupContent").html($(xml).find("theme>description").text());
    pop.html($(xml).find("theme>goButton").text());
    pop.attr("href", $(xml).find("theme>link").text());
    pop.attr("target", "blank");
}

function parseXML(xml, menuId) {
    //TODO: Parse the XML to produce the book individual page. Call on pagebeforeshow for #book
}

/*************************************************************************************************************
 * EVENTS                                                                                                    *
 ************************************************************************************************************/

//pagecreate event to trigger AJAX update on home page load
$(document).on("pagecreate", "#home", function(){
    $.ajax({
        type     : "GET",
        url      : "book_site.xml",
        dataType : "xml",
        success  : buildHome,
        error    : showErr
    });
});

//pagebeforeshow event to trigger book page behavior
$(document).on("pagebeforeshow", "#book", function(){
    buildHeader($(data).find("book:nth(" + menuId + ")>name").text(), "#bookHeader");
    window.scrollTo(0,1);
});

//pagebeforeshow event to trigger popup page
$(document).on("pagebeforeshow", "#popup", function(){
    buildHeader($(data).find("theme>name").text(), "#popupHeader");
    buildPopup(data);
});

$(document).on("click", "#menu-0", function(){
    menuId = 0;
});

$(document).on("click", "#menu-1", function(){
    menuId = 1;
});

$(document).on("click", "#menu-2", function(){
    menuId = 2;
});

$(document).on("click", "#menu-3", function(){
    menuId = 3;
});

$(document).on("click", "#img-0", function(){
    menuId = 0;
});

$(document).on("click", "#img-1", function(){
    menuId = 1;
});

$(document).on("click", "#img-2", function(){
    menuId = 2;
});

$(document).on("click", "#img-3", function(){
    menuId = 3;
});