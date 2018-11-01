
var form_elements;
var unsaved = false;
$(document).ready(function () {

  toastr.options = {
    "positionClass": "toast-top-left",
  }

  $(function () {
    $('#expDate').datepicker({
      language: 'en',
      autoClose: true,
      dateFormat: 'mm/dd/yyyy'
    })
  });

  $('#textArea').val('');



  $('#frmadd').on('submit', function (e) {
    e.preventDefault();

    $('#loading').removeClass('hidden');
    form_elements = $('#frmadd').serializeArray();
    if (!$("#alertMech").is(':checked')) {
      form_elements.push({ name: "alertMech", value: `off` });
    }
    console.log(form_elements);
    $.get('/add_details', { input: form_elements })
      .done(function (data) {
        $('#loading').addClass('hidden');
        if (data.status == "ERROR") {
          return toastr.error('INTERNAL ERROR');
        }
        else if
        (data.status == "DUPLICATE") {
          return toastr.error('Data insertion falied', 'DUPLICATE RECORD FOUND');
        }
        else {
          $("#frmadd")[0].reset();
          toastr.success('Record Added', 'DONE');
          unsaved = false;
        }
      }, 'json');
  })

  $('#btn_cancel').on('click', function () {
    $("#frmadd")[0].reset();
    $('#CLEAR_MODAL_VIEW').modal('show');
    unsaved = false;
  })


  // FORM BROWSER MESSAGE 

  $(":input").change(function () { //trigers change in all input fields including text type
    unsaved = true;
  });

  function unloadPage() {
    if (unsaved) {
      return "You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
    }
  }
  window.onbeforeunload = unloadPage;
})