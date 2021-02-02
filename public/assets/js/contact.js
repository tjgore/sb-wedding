var $form = $('form#rsvpForm'),
url = 'https://script.google.com/macros/s/AKfycbyAuT2w7wzxp5lcQFsOYTavN45pvI1PshyEbjXBZbmyIela0r0/exec'


$('#submit-form').on('click', function(e) {
  e.preventDefault();

  var errors = [];
$("#msg").html('')

  var name = $('#guestName').val();
  var email = $('#guestEmail').val();
  var message = $('#guestMessage').val();

  if(name.trim() == ''){
    errors.push("Please enter your name")
  }
  if(name.length > 50){
    errors.push("Your name must be under 50 characters")
  }
  if(email.trim() == ''){
    errors.push("Please enter your email")
  }
  if(email.length > 50){
    errors.push("Your email is too long")
  }
  if(email.indexOf('@') == -1){
    errors.push("Your email is not valid ")
  }
  if(message.length > 150){
    errors.push("Your message is too long")
  }

  if(errors.length) {
    for(var i=0; i<errors.length; i++) {
      $("#msg").append('<p>' + errors[i] + '</p>')
    }
    return;
  }

  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serialize()
  }).done( 
  function(response) {
    if(response.result == 'success'){
      console.log('Success')
      $('#guestName').val('');
      $('#guestEmail').val('');
      $('#guestMessage').val('');

      $("#msg").html('<p> Thank you! Your message was sent!</p>')
      }
  }
  
  );
})