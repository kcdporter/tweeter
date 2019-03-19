$('document').ready(function() {
  $('.tweet-form').on('keyup', function(event) {
      let remaining = 140 - $(this).val().length;
      $('.counter').text(remaining + ' Characters left');
  });
  console.log('.counter')
}); 