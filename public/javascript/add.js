
var form_elements
$(document).ready(function () {


  $( function() {
    $('#expDate').datepicker({
      language: 'en',
      autoClose: true,
      dateFormat: 'mm/dd/yyyy'
  })
  } );

  var alert_check = 'no';
  $("#alertMech").on('change', function () {
    if ($("#alertMech").is(':checked')) {
      $('#thresholdDays').removeAttr('disabled')
      $('#thresholdDays').val('');
      alert_check = 'yes';
    }
    else if (!$("#alertMech").is(':checked')) {
      $('#thresholdDays').attr('disabled', 'disabled');
      $('#thresholdDays').val('');
      alert_check = 'no';
    }
  })

  $('#loading').hide();
  $('#frmadd').on('submit', function (e) {
    e.preventDefault();
    $('#loading').show();
    form_elements = $('#frmadd').serializeArray();
    form_elements.push({name: "alertMech", value: `${alert_check}`});
    console.log(form_elements);
    $.get('/add_details', { input: form_elements })
      .done(function (data) {
        $('#loading').hide();
        if (data.status == "ERROR")
          toastr.error('INTERNAL ERROR');
        else
          toastr.success('RECORD ADDED');
      }, 'json');
  })

  $('#btn_cancel').on('click', function () {
    window.location.href = "/";
  })

})