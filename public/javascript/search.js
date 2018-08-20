
$(document).ready(function () {

  $('#SSL_CALEN').hide();
  $('#DROP_DOWN').on('change', function () {
    if ($('#DROP_DOWN').val() == "expDate") {
      $("#SEARCH_TEXT_ID").val('');
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT").hide();
      $('#SSL_CALEN').show();
      toastr.info('POPULATE DATA LESS THAN THE SELECTED DATE');
    }
    else if ($('#DROP_DOWN').val() == "serverName") {
      $("#SEARCH_TEXT_ID").val('');
      $("#SEARCH_TEXT_ID").attr('placeholder', 'ENTER SERVER NAME');
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT").show();
      $('#SSL_CALEN').hide();
    }
    else if ($('#DROP_DOWN').val() == "appId") {
      $("#SEARCH_TEXT_ID").val('');
      $("#SEARCH_TEXT_ID").attr('placeholder', 'ENTER APP ID');
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT").show();
      $('#SSL_CALEN').hide();
    }
  })


  $('#SEARCH_FORM').on('submit', function (e) {
    e.preventDefault();
    formElements = $('#SEARCH_FORM').serializeArray();
    if (!formElements[0].value)
      return toastr.warning('SELECT THE SEARCH PARAMETER')
    if (!formElements[1].value && $('#DROP_DOWN').val() != "expDate")
      return toastr.warning('ENTER THE SEARCH VALUE')
    $.get('/search_details', { input: formElements })
      .done(function (data) {
        console.log(data);
        $('#TABLE_CONTAINER').html(Handlebars.templates['search']({ ALL_RECORDS: data.ALL_RECORDS }));
      });
  })


})//END FOR DOCUMENT READY