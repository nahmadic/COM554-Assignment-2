$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "bbc_tech.php",
    dataType: "xml",
    cache: false,
    success: parseXml
  });
});

function parseXml(myXml) {
    var count = 1;
  $(myXml).find("item").each(function() {

    $("#content-container").append("<div class='col-md-4' id='box" + count + "'>");
      $("#box" + count).append("<div class='thumbnail' id='thumbnail" + count + "'>");
      $("#thumbnail" + count).append("<div class='caption-title' id='caption-title-" + count + "'>")
      .append("</div></div></div>");
    $("#caption-title-" + count).append("<h3 class='myBold'>" + $(this).find("title").text() + "</h3>");
    $("#caption-title-" + count).append("<p>" + $(this).find("description").text() + "</p>");
    $("#caption-title-" + count).append("<p>" + $(this).find("pubDate").text() + "</p>");
    count++;
  });
}
