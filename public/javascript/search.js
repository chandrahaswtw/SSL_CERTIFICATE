
$(document).ready(function () {

  //DATE PICKER
  $('#SSL_CALEN_ID').datepicker({
    language: 'en',
    autoClose: true,
    dateFormat: 'mm/dd/yyyy'
  })



  //TOOL TIP
  $('body').tooltip({
    selector: '[data-toggle="tooltip"]' // tooltip objects will be delegated to the specified targets
  });


  //OTHER VALIDATIONS

  $('#DROP_DOWN').on('change', function () {

    if ($('#DROP_DOWN').val() == "expDate") {
      $('#ZONE').addClass('hidden');
      $('input[name="options"]').prop('checked', false);
      $("#btn_div").removeClass('hidden');
      $("#SEARCH_TEXT_ID").val('');
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT").addClass('hidden');
      $('#SSL_CALEN').removeClass('hidden');
      toastr.info('POPULATE DATA LESS THAN THE SELECTED DATE');
    }
    else if ($('#DROP_DOWN').val() == "serverName") {
      $('#ZONE').addClass('hidden');
      $('input[name="options"]').prop('checked', false);
      $("#btn_div").removeClass('hidden');
      $("#SEARCH_TEXT_ID").removeAttr('disabled');
      $("#SEARCH_TEXT_ID").val('');
      $("#SEARCH_TEXT_ID").attr('placeholder', 'Enter Sever Name');
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT").removeClass('hidden');
      $('#SSL_CALEN').addClass('hidden');
    }
    else if ($('#DROP_DOWN').val() == "appId") {
      $('#ZONE').addClass('hidden');
      $('input[name="options"]').prop('checked', false);
      $("#btn_div").removeClass('hidden');
      $("#SEARCH_TEXT_ID").removeAttr('disabled');
      $("#SEARCH_TEXT_ID").val('');
      $("#SEARCH_TEXT_ID").attr('placeholder', 'Enter App ID');
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT").removeClass('hidden');
      $('#SSL_CALEN').addClass('hidden');
    }
    else if ($('#DROP_DOWN').val() == "all") {
      $('#ZONE').addClass('hidden');
      $('input[name="options"]').prop('checked', false);
      $("#btn_div").removeClass('hidden');
      $("#SEARCH_TEXT_ID").val('');
      $("#SEARCH_TEXT_ID").attr('placeholder', 'Fetch all records');
      $("#SEARCH_TEXT_ID").attr('disabled', 'disabled');
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT").removeClass('hidden');
      $('#SSL_CALEN').addClass('hidden');
    }
    else if ($('#DROP_DOWN').val() == "expStatus") {
      $('#ZONE').removeClass('hidden');
      $('input[name="options"]').prop('checked', false);
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT_ID").val('');
      $('#SSL_CALEN').addClass('hidden');
      $("#SEARCH_TEXT").addClass('hidden');
      $("#btn_div").addClass('hidden');
    }
  })

  //BASIC SEARCH FORM SUBMIT
  $('#SEARCH_FORM').on('submit', function (e) {
    e.preventDefault();
    formElements = $('#SEARCH_FORM').serializeArray();
    if (!formElements[0].value) {
      toastr.clear();
      return toastr.warning('SELECT THE SEARCH PARAMETER');
    }
    if (!formElements[1].value && $('#DROP_DOWN').val() != "expDate" && $('#DROP_DOWN').val() != "all") {
      toastr.clear();
      $('#SEARCH_TEXT_ID').focus();
      return toastr.warning('ENTER THE SEARCH VALUE');

    }
    $('#loading').removeClass('hidden');
    form_search(function (count) {
      toastr.clear();
      $('#loading').addClass('hidden');
      if (count == 0) {
        toastr.error('NO RECORDS FOUND FOR THE SEARCH');
      }
      else {
        dataTab('SEARCH_TABLE');
        toastr.success(`${count} RECORD(S) FOUND`);
      }
    });
  })


  //RADIO BUTTON SEARCH
  $('input[type="radio"]').on('change', function () {
    $('#loading').removeClass('hidden');
    radio_search(function (count) {
      toastr.clear();
      $('#loading').addClass('hidden');
      if (count == 0)
        toastr.error('NO RECORDS FOUND FOR THE SEARCH');
      else {
        dataTab('SEARCH_TABLE');
        toastr.success(`${count} RECORD(S) FOUND`);
      }
    });
  })

  function dataTab_search() {
    $.fn.dataTable.moment('MM/DD/YYYY');
    $('#SEARCH_TABLE').DataTable({
      columnDefs: [{
        targets: [0, 1, 2, 5, 6, 7],
        orderable: false
      }],
      "order": [[4, "asc"]]
    });
  }

})//END FOR DOCUMENT READY
