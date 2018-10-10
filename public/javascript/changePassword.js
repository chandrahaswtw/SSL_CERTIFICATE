$(document).ready(function () {

  toastr.options = {
    "positionClass": "toast-top-left",
  }

  $('#CHANGEPWD').on('click', function (e) {
    e.preventDefault();

    if ($('#CURRENT').val() == "" || $('#NEW').val() == "" || $('#RE-NEW').val() == "") {
      toastr.clear();
      return toastr.error('Password field(s) cannot be left empty', 'ERROR');
    }

    if ($('#NEW').val() != $('#RE-NEW').val()) {
      toastr.clear();
      return toastr.error('Your new password does not match confirmation.', 'ERROR');
    }

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
        $('#CHANGEPWD').removeAttr('disabled').text('CHANGE PASSWORD');
        return toastr.success('Password updated successfully', 'DONE');
      }
    })

  })

})