$(document).ready(function () {

  toastr.options = {
    "positionClass": "toast-top-left",
  }

  //******* (1) MAIN LOGIN BUTTON CLICK EVENT********//
  $('#SIGNIN_BTN').on('click', function (e) {
    e.preventDefault();

    // BASIC VALIDATION
    if ($('#UID').val().length == 0) {
      $("#UID").focus();
      return toastr.warning('Username cannot be left empty');
    }
    if ($('#PWD').val().length == 0) {
      $("#PWD").focus();
      return toastr.warning('Password cannot be left empty');
    }

    // SIGN IN BUTTON TEXT CHANGE - RESTRICTING REPEATED CLICKS
    $('#SIGNIN_BTN').attr('disabled', true).text('Authenticating...');


    $.post('/loginPost', $('#loginFrm').serializeArray()).done(function (data) {

      $('#SIGNIN_BTN').removeAttr('disabled').text('Sign in');


      if (data.STATUS == 'NEW') {
        $('#modalReset').modal('show');
      }
      else if (data.STATUS == 'FAIL') {
        toastr.error('Re-check the username and password', 'LOGIN FAILED');
        $('#PWD').val('');
        $("#UID").focus();
      }
      else if (data.STATUS == 'SUCCESS') {
        toastr.success(`Welcome ${((data.USER.username).split('@'))[0]}`, 'LOGIN SUCCESS');
        setTimeout(function () { window.location.href = '/'; }, 1000);
      }
    })
  })

  $('#UID').on('change', function () {
    if (($(this).val()).length > 0) {
      if (($(this).val()).split('.').indexOf('ibm') == -1)
        toastr.warning('Only IBM id\'s are allowed', 'INVALID USERNAME');
      $(this).focus();
    }
  })


  //******* (2) MODAL RESET PASSWORD ********//

  // PASSWORD BUTTON ENABLE ONLY IF THE PASSWORDS MATCH
  $("#RENEW").keyup(function () {
    var user_pass = $("#NEW").val();
    var user_pass2 = $("#RENEW").val();

    if (user_pass == user_pass2) {
      $("#BTNRESET").prop('disabled', false)//use prop()
    } else {
      $("#BTNRESET").prop('disabled', true)//use prop()
    }
  });

  $("#NEW").keyup(function () {
    var user_pass = $("#NEW").val();
    var user_pass2 = $("#RENEW").val();

    if (user_pass == user_pass2) {
      $("#BTNRESET").prop('disabled', false)//use prop()
    } else {
      $("#BTNRESET").prop('disabled', true)//use prop()
    }
  });

  //ACTUAL BUTTON EVENT//
  $('#BTNRESET').on('click', function (e) {
    e.preventDefault();
    var element = { username: $('#UID').val(), password: $('#RENEW').val() };
    $.post('/changePasswordLogin', element).done(function (data) {
      if (data.STATUS == "SUCCESS") {
        $('#modalReset').modal('hide');
        $('#PWD').val('');
        $('#PWD').focus();
        toastr.success('Password was reset successfully. Login with new credentials', 'DONE');
      }

    })
  })

  //******** (3) PASSWORD MAIL RESET ********//
  $('#btnSendMail').on('click', function (e) {

    e.preventDefault();
    if ($('#primaryEmail').val().length == 0)
      return toastr.warning('EMAIL CANNOT BE LEFT EMPTY');

    if (($('#primaryEmail').val()).split('.').indexOf('ibm') == -1) {
      $('#primaryEmail').focus();
      return toastr.warning('Only IBM id\'s are allowed', 'INVALID USERNAME');
    }

    $('#btnSendMail').attr('disabled', true).text('Resetting...');

    $.post('/forgotPassword', { username: $('#primaryEmail').val() }).done(function (data) {
      if (data.STATUS == "NO_USERNAME") {
        $('#btnSendMail').removeAttr('disabled').text('Reset password');
        return toastr.error('Recheck your email ID', 'NO USER FOUND');
      }

      if (data.STATUS == "SUCCESS") {
        $('#btnSendMail').removeAttr('disabled').text('Reset password');
        $('#primaryEmail').val("");
        $('#modalRegister').modal('hide');
        return toastr.success('New password was sent to the registered email ID', 'PASSWORD RESET SUCCESS');
      }
    })

  })
})