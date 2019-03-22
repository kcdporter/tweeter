$(document).ready(function(){

// functions pertaining to building and viewing tweets
  loadTweets();

  function createTweetElement(tweet) {
    let $header = ($('<header>')
    .append($('<img>').addClass('avatar').attr('src', tweet.user.avatars.large))
    .append($('<h2>').addClass('name').text(tweet.user.name))
    .append($('<h6>').addClass('handle').text(tweet.user.handle))
    );
    let $body = ($('<p>').text(tweet.content.text));
    let $footer = ($('<footer>')
    .append($('<div>').addClass('postDate').text(sincePosted(tweet.created_at))
    .append($('<div>').addClass('icons').text('🇨🇦 ❤️ ↻'))));
    let $article = ($('<article>').addClass('tweet')
    .append($header)
    .append($body)
    .append($footer));
    return $article;
  }

  function renderTweets(data) {
    for (let tweet of data){
      let $tweet = createTweetElement(tweet);
      $tweet.prependTo($('#tweets-feed'));
    }
  }

  function loadTweets(){
    $.get('/tweets', function(data){
      renderTweets(data);
    })
  }
  

  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    const $serializedTweet = $(this).serialize();
    const length = $(this)[0][0].value.length;

    let flag = true;
  //validations start here
    if(length === 0){
      $('.validationError').text('Get loqacious!').show().delay(3000).slideUp(500);
      flag = false;
    } else if (length > 140){
      $('.validationError').text('Try being less verbose!').show().delay(3000).slideUp(500);
       flag = false;
    }

    if(flag){
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $serializedTweet,
        success: function(result) {
          loadTweets();
          $('#tweets-feed').empty();
        },
        error: function(err){
          console.log('there was an error posting the tweet');
        }
      })
    }
  });
  
  // Functions relating to CSS/ JQuery Animations
  //hides new tweets form
  $('#compose').click(function() {
    if( $('.container').is(':hidden')){
      $('.container').slideDown('slow');
      $('textarea').focus();
    } else {
      $('.container').hide();
    }
  });
  //converts number to readable time stamp
  let sincePosted = function(date) {
    let msDiff = Date.now() - date;
    let days = Math.floor(msDiff / 86400000);
    if (days === 0) {
      let hours = Math.floor(msDiff / 3600000);
      if (hours === 0) {
        let minutes = Math.floor(msDiff / 60000);
        if (minutes <= 1) {
          return `Just Posted`;
        } else {
          return `${minutes} minutes ago`;
        }
      } else {
        return `${hours} hours ago`;
      }
    } else {
      return `${days} days ago`;
    }
  };


});
