$(document).ready(function() {
  $.ajaxSetup({
    cache: false
  });
  //load twitter javascript factory
  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };
    return t;
  }(document, "script", "twitter-wjs"));
  //load initial quote and build tweet button
  $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(json) {
    var quote = json.shift();
    var html = "";
    html += "<p>" + quote.content + "</p><br>";
    html += "<p>- " + quote.title + "</p>";
    $("#quoteBox").html(html);
      var twtterContainer = $('<a></a>')
    .addClass('twitter-share-button')
    .attr('href', 'http://twitter.com/share')
    .attr('data-size', 'large')
    .attr('data-url', ' ')
    .attr('data-text', $('#quoteBox').text());
  $('#twtterContainer').append(twtterContainer);
  twttr.widgets.load();
  });
  //reload quote and tweet button when new quote is clicked
  $("#randomQuote").on("click", function() {
    $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(json) {
      var quote = json.shift();
      var html = "";
      html += "<p>" + quote.content + "</p><br>";
      html += "<p>- " + quote.title + "</p>";
      $("#quoteBox").html(html);
      customText = $("#quoteBox").text();
      $('#twtterContainer iframe').remove();
      var twtterContainer = $('<a></a>')
        .addClass('twitter-share-button')
        .attr('href', 'http://twitter.com/share')
        .attr('data-size', 'large')
        .attr('data-url', ' ')
        .attr('data-text', $('#quoteBox').text());
      $('#twtterContainer').append(twtterContainer);
      twttr.widgets.load();
    });
  });
});
