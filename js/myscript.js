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

//function build popup2
function buildPopup2(xml, menuId) {
    var book = $(xml).find("book:nth(" + menuId + ")");
    $("#popupContent2").html(book.find("review").text());
}

function parseXML(xml, menuId) {
    var container = $("#bookContent");
    var book = $(xml).find("book:nth(" + menuId + ")");
    var nameNode = book.find("name");
    var amazonNode = book.find("amazonSearch");
    var img = nameNode.attr("img");
    var descNode = book.find("description");
    var authorNode = book.find("author");
    var price = book.find("price").text();
    var publisher = book.find("publisher").text();


    container.find(".ui-block-a").html(
        "<img class='imgDetail' src='img/" + img + "'/>" +
            "<a href='" + amazonNode.text() + "'data-role='button' data-theme='a' class='ui-link ui-btn ui-btn-a ui-icon-shop ui-btn-icon-right ui-shadow ui-corner-all' target='blank'>Amazon</a>" +
            "<a href='http://indigo.ca' data-role='button' data-theme='a' class='ui-link ui-btn ui-btn-a ui-icon-forward ui-btn-icon-right ui-shadow ui-corner-all' target='blank'>indigo.ca</a>"
    );

    container.find(".ui-block-b").html(
        "<h3>" + nameNode.text() + " - " + descNode.attr("type") + "</h3>" +
            "<h4><a href='" + authorNode.attr("url") + "' target='blank'>" + authorNode.text() + "</a></h4>" +
            "<p> CAD $" + price + " - " + publisher + "</p>" +
                "<p class='content'>" + descNode.text() + "</p>"+
        "<a href='#popup2' data-rel='dialog' data-role='button' data-theme='a' data-transition='pop' class='ui-link ui-btn ui-btn-a ui-icon-info ui-btn-icon-right ui-shadow ui-corner-all'>Reviews</a>"
    );
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
    parseXML(data, menuId);
});

//pagebeforeshow event to trigger popup page
$(document).on("pagebeforeshow", "#popup", function(){
    buildHeader($(data).find("theme>name").text(), "#popupHeader");
    buildPopup(data);
});

//pagebeforeshow event to trigger popup page
$(document).on("pagebeforeshow", "#popup2", function(){
    buildPopup2(data, menuId);
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