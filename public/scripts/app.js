$(document).ready(function(){

// functions pertaining to building and viewing tweets
  function renderTweets(data) {
    for (let tweet of data){
      let $tweet = createTweetElement(tweet);
      $tweet.prependTo($('#tweets-feed'));
    }
  }

  function createTweetElement(tweet) {
    let $header = ($('<header>')
        .append($('<img>').addClass('avatar').attr('src', tweet.user.avatars.large))
        .append($('<h2>').addClass('name').text(tweet.user.name))
        .append($('<h6>').addClass('handle').text(tweet.user.handle))
        );
    let $body = ($('<p>').text(tweet.content.text));
    let $footer = ($('<footer>')
          .append($('<div>').text(tweet.created_at))
          .append($('<div>').addClass('icons').text('🇨🇦 ❤️ ↻')));
    let $article = ($('<article>').addClass('tweet')
            .append($header)
            .append($body)
            .append($footer));
    return $article;
  }
  
 $('#tweet-form').submit(function(event) {
    event.preventDefault();
    console.log("default prevented");  
    const $serializedTweet = $(this).serialize();
    const length = $(this)[0][0].value.length;
    if(length === 0){
      alert("Please be a bit more verbose!")
    } else {
      if (length <= 140){
        $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $serializedTweet,
        success: function() {
          postTweets();
        }})
      } else {
      alert("Please be less verbose!")
      }
    }
  });

  function loadTweets(){
    $.get('/tweets', function(data){
      renderTweets(data);
    })
  }
  loadTweets();
  
  function postTweets () {
    $.ajax('/tweets', {
    method: 'GET',
    success: function(data) {
      renderTweets(data);
    }
    })
  };

  // Functions relating to CSS/ JQuery Animations
  $('#compose').click(function() {
    if( $('.container').is(':hidden')){
      $('.container').slideDown("slow")
    } else {
      $('.container').hide();
    }
  });

});
