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
function buildHeader(title) {
    $("header>h1").html(title);
}

//Builds the home page footer
function buildFooter(xml) {
    var stdNum = $(xml).find("student").attr("studentNumber");
    var stdProg = $(xml).find("student").attr("studentProgram");
    $("footer>h2").html(stdNum);
    $("footer>h4").html(stdProg);
}

//Build the home page
function buildHome(xml) {
    data = xml;
    var title = setTitle(xml);
    buildHeader(title);
    buildFooter(xml);
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