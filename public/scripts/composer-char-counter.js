$('document').ready(function() {

}); 

$('.tweet-form').on('keyup', function(event) {
  let remaining = 140 - $(this).val().length;
  let counter = $(this).siblings('.counter');
  counter.text(remaining + ' Characters left');
  if (remaining > 10) {
    counter.removeClass('limit-reached warning');
  } else {
    if (remaining < 0){
      counter.removeClass('warning').addClass('limit-reached');
    } else {
      counter.removeClass('limit-reached').addClass('warning');
    }
  }
});
