
$(document).ready(function () {

  $('#ZONE').hide();
  $('#loading').hide();

  //DATE PICKER

  $('#SSL_CALEN_ID').datepicker({
    language: 'en',
    autoClose: true,
    dateFormat: 'mm/dd/yyyy'
  })

  //$('#TABLE_CONTAINER').DataTable();


  //TOOL TIP
  $('body').tooltip({
    selector: '[data-toggle="tooltip"]' // tooltip objects will be delegated to the specified targets
  });


  //OTHER VALIDATIONS

  $('#SSL_CALEN').hide();
  $('#DROP_DOWN').on('change', function () {

    if ($('#DROP_DOWN').val() == "expDate") {
      $('#ZONE').hide();
      $('input[name="options"]').prop('checked', false);
      $("#btn_search").show();
      $("#SEARCH_TEXT_ID").val('');
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT").hide();
      $('#SSL_CALEN').show();
      toastr.info('POPULATE DATA LESS THAN THE SELECTED DATE');
    }
    else if ($('#DROP_DOWN').val() == "serverName") {
      $('#ZONE').hide();
      $('input[name="options"]').prop('checked', false);
      $("#btn_search").show();
      $("#SEARCH_TEXT_ID").removeAttr('disabled');
      $("#SEARCH_TEXT_ID").val('');
      $("#SEARCH_TEXT_ID").attr('placeholder', 'Enter Sever Name');
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT").show();
      $('#SSL_CALEN').hide();
    }
    else if ($('#DROP_DOWN').val() == "appId") {
      $('#ZONE').hide();
      $('input[name="options"]').prop('checked', false);
      $("#btn_search").show();
      $("#SEARCH_TEXT_ID").removeAttr('disabled');
      $("#SEARCH_TEXT_ID").val('');
      $("#SEARCH_TEXT_ID").attr('placeholder', 'Enter App ID');
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT").show();
      $('#SSL_CALEN').hide();
    }
    else if ($('#DROP_DOWN').val() == "all") {
      $('#ZONE').hide();
      $('input[name="options"]').prop('checked', false);
      $("#btn_search").show();
      $("#SEARCH_TEXT_ID").val('');
      $("#SEARCH_TEXT_ID").attr('placeholder', 'Fetch all records');
      $("#SEARCH_TEXT_ID").attr('disabled', 'disabled');
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT").show();
      $('#SSL_CALEN').hide();
    }
    else if ($('#DROP_DOWN').val() == "expStatus") {
      $('#ZONE').show();
      $('input[name="options"]').prop('checked', false);
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT_ID").val('');
      $('#SSL_CALEN').hide();
      $("#SEARCH_TEXT").hide();
      $("#btn_search").hide();
    }
  })

  //BASIC SEARCH FORM SUBMIT
  $('#SEARCH_FORM').on('submit', function (e) {
    e.preventDefault();
    formElements = $('#SEARCH_FORM').serializeArray();
    if (!formElements[0].value)
      return toastr.warning('SELECT THE SEARCH PARAMETER');
    if (!formElements[1].value && $('#DROP_DOWN').val() != "expDate" && $('#DROP_DOWN').val() != "all")
      return toastr.warning('ENTER THE SEARCH VALUE')
    $('#loading').show();
    form_search(function (count) {
      toastr.clear();
      if (count == 0)
        toastr.error('NO RECORDS FOUND FOR THE SEARCH');
      else {
        dataTab('SEARCH_TABLE');
        toastr.success(`${count} RECORD(S) FOUND`);
      }
    });
  })


  //RADIO BUTTON SEARCH
  $('input[type="radio"]').on('change', function () {
    $('#loading').show();
    radio_search(function (count) {
      toastr.clear();
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
