    <!-- TMDB API -->
    $(document).ready(function() {

      var settings = {
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=c51b717bcc1529ec30d606542c6fe981",
        "method": "GET",
        "headers": {},
        "data": "{}",
        async: false,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
      };
      var url = 'http://api.themoviedb.org/3/api_key=c51b717bcc1529ec30d606542c6fe981';
      var key = "?api_key=c51b717bcc1529ec30d606542c6fe981";
      var uri = "https://api.themoviedb.org/3/movie/";
      var YT = "https://www.youtube.com/embed/";
      var image_path = "http://image.tmdb.org/t/p/w185//";
      var tile = [];

      function requestData() {
        $.ajax(settings).then(updateTiles);
      }

      function updateTiles(response) {
        var data = response.results;

        $.each(data, function(index, item) {
          tile = [
            "<div class=\"tile\">",
                "<img src=" + image_path + item.poster_path + ">",
                "<h2>" + item.title + "</h2>",
                "<h4>Release Date:" + item.release_date + "</h4>",
                "<br>",
                "<h4>" + item.overview + "</h4>",
                "<h5>Vote: " + item.vote_average + "/10, Total Reviews: " + item.vote_count + "</h5>",
            "</div>"

          ];
          // getYoutubeVideos(item)
          // .then(function(){
            $("#ribbon").append(tile.join(""));
          // });
          
        });

      }
      
      
      function getYoutubeVideos(item) {
            settings.url = uri + item.id + key + "&append_to_response=videos";
            return $.ajax(settings).then(function(items) {
              var videos = items.videos.results,
                video = videos[0] || videos[1],
                youtube_key = video.key;
              if (!youtube_key) {
                return;
              }
              var yt_url = (YT + youtube_key).toString();
              var obj = "<object style=\"width:100%;height:20%;\" data=" + yt_url + "></object>";

              tile.push(obj);
            });
      }
      
      requestData();

    });