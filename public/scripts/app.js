const data = [
  {
    'user': {
      'name': 'Newton',
      'avatars': {
        'small':   'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png',
        'regular': 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png',
        'large':   'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png'
      },
      'handle': '@SirIsaac'
    },
    'content': {
      'text': 'If I have seen further it is by standing on the shoulders of giants'
    },
    'created_at': 1461116232227
  },
  {
    'user': {
      'name': 'Descartes',
      'avatars': {
        'small':   'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png',
        'regular': 'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png',
        'large':   'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png'
      },
      'handle': '@rd' },
    'content': {
      'text': 'Je pense , donc je suis'
    },
    'created_at': 1461113959088
  },
  {
    'user': {
      'name': 'Johann von Goethe',
      'avatars': {
        'small':   'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png',
        'regular': 'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png',
        'large':   'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png'
      },
      'handle': '@johann49'
    },
    'content': {
      'text': 'Es ist nichts schrecklicher als eine tätige Unwissenheit.'
    },
    'created_at': 1461113796368
  }
];

$(document).ready(function(){
  function renderTweets(data) {
    for (let tweet of data){
      console.log(tweet)
      let $tweet = createTweetElement(tweet);
      console.log("Tweets feed before new tweet", $('#tweets-feed'))
      console.log("tweet object", $tweet);
      console.log($('Tweets feed after new tweet', '#tweets-feed'))
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

  renderTweets(data);
});