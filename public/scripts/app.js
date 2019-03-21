$(document).ready(function(){

// functions pertaining to building and viewing tweets
  //This function we need to invoke immediately once our page gets loaded.
  loadTweets();

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
      $('.validationError').text('Get loqacious!').delay(3000).slideUp(500);
      flag = false;
    } else if (length > 140){
      $('.validationError').text('Try being less verbose!').delay(3000).slideUp(500);
       flag = false;
    }

    if(flag){
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $serializedTweet,
        success: function(result) {
          loadTweets();
        },
        error: function(err){
          console.log('there was an error posting the tweet');
        }
      })
    }
  });
  

  // Functions relating to CSS/ JQuery Animations
  $('#compose').click(function() {
    if( $('.container').is(':hidden')){
      $('.container').slideDown('slow');
      $('textarea').focus();
    } else {
      $('.container').hide();
    }
  });

});
