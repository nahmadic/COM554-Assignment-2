$(document).ready(function() {

  $(".nav a").click(function(event) { //event handler for the different tab sections
    event.preventDefault();

    var thisID = $(this).attr('id');

      $(this).parent().addClass("active"); //straight forward class addition
      $(this).parent().siblings().removeClass("active"); //and subtraction to highlight the currently selected tab

      if ($(this).attr('class') != "navbar-brand") { //Removes landing page Div when the site is actually used
        $("#landing-page").hide();
      }

      if ($(this).attr('class') != "dropdown-toggle") { //Empties the div that contains the news items everytime a new tab/section is loaded
        $("#content-container").empty();
      }

      $.ajax({ //GET request that pulls in the requested xml file
        type: "GET",
        url: thisID + ".php", //dynamically changes the necesary php file based on which link is clicked. Saves space as code doesnt have to be repeated for each one
        dataType: "xml",
        cache: false,
        success: parseXml //calls parseXml function once the file has been succesfully imported
      });
  });

  $("#search-btn").click(function(event) { //event handler for the search button/form

    $("#help-page").hide(); //The help section appears when the search field is selected, this then hides it again once the user has made their search

    $.ajax({
      type: "GET",
      url: "Full_RSS_Feed.php",
      dataType: "xml",
      cache: false,
      success: searchXML
    });
  });

  $("#search-field").click(function(event) { //Event handler for search help Div
    $("#help-page").show();
  });
});

function parseXml(myXml) { //parsing function

  var count = 1; //This variable is used for the creation and naming of the divs holding the imported news items on the fly
                  //Without it all of the news items would simply try to append to the first div
    $(myXml).find("item").each(function() {

      $("#content-container").append("<div class='col-md-4' id='box" + count + "'>");
      $("#box" + count).append("<div class='thumbnail' id='thumbnail" + count + "'>");
      $("#thumbnail" + count).append("<div class='caption-title' id='caption-title-" + count + "'>").append("</div></div></div>");
      $("#caption-title-" + count).append("<h3 class='myBold'>" + $(this).find("title").text() + "</h3>");
      $("#caption-title-" + count).append("<p>" + $(this).find("description").text() + "</p>");
      $("#caption-title-" + count).append("<p>" + $(this).find("pubDate").text() + "</p>");
      $("#thumbnail" + count).append("<a href='" + $(this).find("link").text() + "' class='btn btn-default read-more-btn' role='button' target='_blank'>Read More</a>"); //created the button in each div and points it at the full news article

      count++; //increments the count variable so that the next imported item is populated in a different div
    });
}

function searchXML(myXml){ //Searching function

  var tempsearchstring = $("#search-field").val();
  var regex_query = new RegExp(tempsearchstring, "gi"); //the i allows this search to be non-case sensitive and the g is so it searches globally and doesnt stop after it finds something
  var resultcount = 1;

    if ($(this).attr('class') != "dropdown-toggle") {
      $("#content-container").empty();
      $("#landing-page").hide();
    }

    $(myXml).find("item").each(function() {

      var tempXml = $(this).find("title").text();

        if(tempXml.search(regex_query) > 0) { //checks the users strings against the current loaded item from the xml file. number is set to -1 if it doesnt fail so it doesnt populate a div with that story

            $("#content-container").append("<div class='col-md-4' id='box" + resultcount + "'>");
            $("#box" + resultcount).append("<div class='thumbnail' id='thumbnail" + resultcount + "'>");
            $("#thumbnail" + resultcount).append("<div class='caption-title' id='caption-title-" + resultcount + "'>").append("</div></div></div>");
            $("#caption-title-" + resultcount).append("<h3 class='myBold'>" + $(this).find("title").text() + "</h3>");
            $("#caption-title-" + resultcount).append("<p>" + $(this).find("description").text() + "</p>");
            $("#caption-title-" + resultcount).append("<p>" + $(this).find("pubDate").text() + "</p>");
            $("#thumbnail" + resultcount).append("<a href='" + $(this).find("link").text() + "' class='btn btn-default read-more-btn' role='button' target='_blank'>Read More</a>");
            resultcount++;
        }
    });
}
