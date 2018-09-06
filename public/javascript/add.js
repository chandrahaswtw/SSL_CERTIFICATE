
var form_elements
$(document).ready(function () {


  $(function () {
    $('#expDate').datepicker({
      language: 'en',
      autoClose: true,
      dateFormat: 'mm/dd/yyyy'
    })
  });


  $('#loading').hide();
  $('#frmadd').on('submit', function (e) {
    e.preventDefault();
    $('#loading').show();
    form_elements = $('#frmadd').serializeArray();
    if (!$("#alertMech").is(':checked')) {
      form_elements.push({ name: "alertMech", value: `off` });
    }
    console.log(form_elements);
    $.get('/add_details', { input: form_elements })
      .done(function (data) {
        $('#loading').hide();
        $("#frmadd")[0].reset();
        if (data.status == "ERROR")
          toastr.error('INTERNAL ERROR');
        else {
          toastr.success('RECORD ADDED');
        }
      }, 'json');
  })

  $('#btn_cancel').on('click', function () {
    window.location.href = "/";
  })

})