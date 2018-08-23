
$(document).ready(function () {

  $('#loading').hide();
  $('#ZONE').hide();
  
  $( function() {
    $('#SSL_CALEN_ID').datepicker({
      language: 'en',
      autoClose: true,
      dateFormat: 'mm/dd/yyyy'
  })
  } );

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
      $("#SEARCH_TEXT_ID").attr('placeholder', 'ENTER SERVER NAME');
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
      $("#SEARCH_TEXT_ID").attr('placeholder', 'ENTER APP ID');
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT").show();
      $('#SSL_CALEN').hide();
    }
    else if ($('#DROP_DOWN').val() == "all") {
      $('#ZONE').hide();
      $('input[name="options"]').prop('checked', false);
      $("#btn_search").show();
      $("#SEARCH_TEXT_ID").val('');
      $("#SEARCH_TEXT_ID").attr('placeholder', 'FETCHES ALL RECORDS');
      $("#SEARCH_TEXT_ID").attr('disabled','disabled');
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT").show();
      $('#SSL_CALEN').hide();
    }
    else if ($('#DROP_DOWN').val() == "expStatus") {
      $('#ZONE').show();
      $('input[name="options"]').prop('checked', false);
      //$("#ZONE").css({'margin-left':'100px'});
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT_ID").val('');
      $('#SSL_CALEN').hide();
      $("#SEARCH_TEXT").hide();
      $("#btn_search").hide();
    }
  })


  Handlebars.registerHelper('isGreen', function(expDate,thresholdDays){
   var d1 = new Date();
   var d2 = new Date(expDate);
   d1.setDate(d1.getDate() + (thresholdDays + 30));
   if(d1>d2)
      return true;
  })

  Handlebars.registerHelper('isYellow', function(expDate,thresholdDays){
    var d1 = new Date();
    var d2 = new Date(expDate);
    if(d1>d2)
       return true;
   })

   Handlebars.registerHelper('isRed', function(expDate,thresholdDays){
    var d1 = new Date();
    var d2 = new Date(expDate);
    if(d1>d2)
       return true;
   })


  $('#SEARCH_FORM').on('submit', function (e) {
    e.preventDefault();
    formElements = $('#SEARCH_FORM').serializeArray();
    if (!formElements[0].value)
      return toastr.warning('SELECT THE SEARCH PARAMETER')
    if (!formElements[1].value && $('#DROP_DOWN').val() != "expDate" && $('#DROP_DOWN').val() != "all")
      return toastr.warning('ENTER THE SEARCH VALUE')
    $('#loading').show();
    $.get('/search_details', { input: formElements })
      .done(function (data) {
        if(data.ALL_RECORDS.length == 0)
          {
            $('#loading').hide();
            $('#TABLE_CONTAINER').hide();
            return toastr.error('NO RECORDS FOUND FOR THE SEARCH');
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
