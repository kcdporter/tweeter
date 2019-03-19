$('document').ready(function() {
  console.log('Document is ready')
}); 

$('.tweet-form').on('keyup', function(event) {
  let remaining = 140 - $(this).val().length;
  let counter = $(this).siblings('.counter');
  counter.text(remaining + ' Characters left');
  if (remaining < 0) {
    $('.counter').css('color', 'red');
  }
});
