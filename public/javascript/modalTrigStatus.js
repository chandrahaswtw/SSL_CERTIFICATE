$(document).ready(function () {
  // MODAL TRIG STATUS
  $("body").on("click", "[name='mailTrig']", function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('#sendMail').attr('idtemp', $(this).attr('id'))
    $('#modalTrigStatus').modal('show');
  })

  // SEND MAIL BUTTON CLICK EVENT

  $('#sendMail').on('click', function (e) {
    e.preventDefault();
    $(this).attr('disabled', true).text('Sending....')
    $.post('/indMailTrig', { idtemp: $('#sendMail').attr('idtemp') }).done(function (data) {
      $('#sendMail').removeAttr('disabled').text('Send mail');

      $('#modalTrigStatus').modal('hide');
      if (data.STATUS == "ERROR")
        toastr.error('Please try again', 'INTERNAL ERROR');
      else if (data.STATUS == "SUCCESS")
        toastr.success('Mail triggered', 'DONE');
      else if (data.STATUS == "MISSING")
        toastr.error('Primary emailID is missing', 'MAIL TRIGGER FAILED');

    })

  })

})