
$(document).ready(function () {

  $('#loading').hide();
  
  $( function() {
    $('#SSL_CALEN_ID').datepicker({
      language: 'en',
      autoClose: true
  })
  } );

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
    $('#loading').show();
    $.get('/search_details', { input: formElements })
      .done(function (data) {
        if(data.ALL_RECORDS.length == 0)
          {
            $('#loading').hide();
            return toastr.error('NO RECORDS FOUND FOR THE SEARCH');
            $('#TABLE_CONTAINER').hide();
          }
        else
        {
          $('#loading').hide();
          $('#TABLE_CONTAINER').show();
          $('#TABLE_CONTAINER').html(Handlebars.templates['search']({ ALL_RECORDS: data.ALL_RECORDS }));
          return toastr.success(`${data.ALL_RECORDS.length} RECORDS FOUND`);
        }
      });
  })


})//END FOR DOCUMENT READY
