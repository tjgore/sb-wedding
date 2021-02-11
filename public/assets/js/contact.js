var $form = $('form#rsvpForm'),
url = 'https://api.apispreadsheets.com/data/8036/'


$('#submit-form').on('click', function(e) {
  e.preventDefault();

  $('#submit-form').text('...Sending');
  $('#submit-form').attr("disabled", true);
  
  var errors = [];
  $("#msg").html('')

  var name = $('#guestName').val();
  var phone = $('#guestPhone').val();
  var rsvp = parseInt($('#guestRsvp').val());

  if(name.trim() == ''){
    errors.push("Please enter your name")
  }
  if(name.length > 50){
    errors.push("Your name must be under 50 characters")
  }
  if(phone.trim() == ''){
    errors.push("Please enter your phone number")
  }
  if(phone.length > 15){
    errors.push("Your phone number is too long")
  }
  console.log('rsp',rsvp)
  if (typeof(rsvp) !== 'number' || !rsvp) {
    rsvp = 0
  }
  if(rsvp > 10){
    errors.push("Your rsvp amount is too high")
  }

  if(errors.length) {
    for(var i=0; i<errors.length; i++) {
      $("#msg").append('<p>' + errors[i] + '</p>')
    }

    $('#submit-form').text('I am attending');
    $('#submit-form').attr("disabled", false);
    return;
  }

  const data = JSON.stringify({
    data: {
      Name: name,
      Phone: phone,
      'Rsvp Amount': rsvp 
    }
  })

  var handleSuccess = function(response){
    console.log('Success')
    $('#guestName').val('');
    $('#guestPhone').val('');
    $('#guestRsvp').val('');

    $("#msg").html('<p> Thank you! Your RSVP was sent!</p>')
    $('#submit-form').text('I am attending');
    $('#submit-form').attr("disabled", false);
  }

    var jqxhr = $.ajax({
    url: url,
    type: "post",
    data: data,
    success: handleSuccess,
    error: function(response){
      console.log('Response', response);
      $("#msg").html('<p>There was an error! Refresh the page and please Try again.</p>')
      $('#submit-form').text('I am attending');
      $('#submit-form').attr("disabled", false);
    }
  })
})

const currentDate = new Date().toISOString().slice(0,10)
const expiresAt = new Date('2021-03-30').toISOString().slice(0,10)

if (currentDate === expiresAt) {
  $('#rsvpForm').hide();
  $('#pleaseRsvp').text("RSVP has ended!");
  $('#pleaseRsvp2').show();
}