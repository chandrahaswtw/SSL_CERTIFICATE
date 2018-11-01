$(document).ready(function () {

  toastr.options = {
    "positionClass": "toast-top-left",
  }

  // BUTTON DISABLE AND ENABLE
  $('#NEW').keyup(function () {

    if ($('#NEW').val() == $('#RE-NEW').val() && $('#NEW').val().length > 0) {
      $("#CHANGEPWD").prop('disabled', false)//use prop()
    } else {
      $("#CHANGEPWD").prop('disabled', true)//use prop()
    }
  });

  $("#RE-NEW").keyup(function () {

    if ($('#NEW').val() == $('#RE-NEW').val() && $('#NEW').val().length > 0) {
      $("#CHANGEPWD").prop('disabled', false)//use prop()
    } else {
      $("#CHANGEPWD").prop('disabled', true)//use prop()
    }
  });



  $('#CHANGEPWD').on('click', function (e) {

    e.preventDefault();
    $('#CHANGEPWD').attr('disabled', true).text('UPDATING...');
    $.post('/changePWD', $('#FRM').serializeArray()).done(function (data) {

      if (data.STATUS == "MISMATCH") {
        toastr.clear();
        $('#CHANGEPWD').removeAttr('disabled').text('CHANGE PASSWORD');
        return toastr.error('Your password was incorrect', 'ERROR');
      }
      else {
        toastr.clear();
        $("#FRM")[0].reset();
        $('#CHANGEPWD').text('CHANGE PASSWORD');
        return toastr.success('Password updated successfully', 'DONE');
      }
    })

  })

})