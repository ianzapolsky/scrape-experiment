var request = require('request');
var cheerio = require('cheerio');

// hacker news
var url = 'https://news.ycombinator.com/';

// print the titles and links to posts with >= 100 points
request(url, function(error, response, html) {

  if (!error) {
    var $ = cheerio.load(html);
    $('.subtext').filter(function() {
      var data = $(this);
      var points = parseInt(data.children().first().text().split(' ')[0]);
      if (points >= 100) {
        var $titleTd = data.parent().prev().children('.title').last();
        var title = $titleTd.children('a').text();
        var href = $titleTd.children('a').attr('href');
        console.log(title + '\n    '+ href + '\n');
      }
    });
  }
});
