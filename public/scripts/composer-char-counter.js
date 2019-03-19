$('#tweetbox').on('keyup', function(event) {
  let remaining = 140 - $(this).val().length;
  $('#theFinalCountdown').text(remaining + ' Characters left');
  if (remaining < 0) {$("#theFinalCountdown").css("color","red")}
});