
$(document).ready(function () {

  $('#ZONE').hide();
  $('#loading').hide();

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

  //HANDLE BARS REGISTER HELPER
  Handlebars.registerHelper('isStatus', function (expDate) {

    var d1 = new moment();
    var d2 = new moment();
    var d3 = new moment();
    var d4 = new moment(expDate, 'MM-DD-YYYY');
    var d5 = new moment();
    var color;

    //console.log(t_Days);
    d1 = d1.add(40, 'd');
    d2 = d2.add(20, 'd');
    d3 = d3.add(10, 'd');

    if (moment(d1).isSameOrBefore(d4))
      color = 'green';
    else if (moment(d1).isAfter(d4) && moment(d2).isSameOrBefore(d4))
      color = 'yellow';
    else if (moment(d2).isAfter(d4) && moment(d3).isSameOrBefore(d4))
      color = 'orange';
    else if (moment(d3).isSameOrAfter(d4)) color = 'red';


    if (d4.diff(d5, 'd') >= 0)
      var exp = `CERTIFICATE WILL EXPIRE IN ${d4.diff(d5, 'd')} DAYS`;
    else
      var exp = `CERTIFICATE ALREADY EXPIRED ${d5.diff(d4, 'd')} DAYS AGO. TAKE IMMEDIATE ACTION`;

    if (color)
      return `<td scope="col" style="color:${color}">
    <i class="fas fa-square" data-toggle="tooltip" data-placement="top" title= "${exp}"></i></td>`;

    else return `<td></td>`;
  });


  //BASIC SEARCH FORM SUBMIT

  $('#SEARCH_FORM').on('submit', function (e) {
    e.preventDefault();
    formElements = $('#SEARCH_FORM').serializeArray();
    if (!formElements[0].value)
      return toastr.warning('SELECT THE SEARCH PARAMETER');
    if (!formElements[1].value && $('#DROP_DOWN').val() != "expDate" && $('#DROP_DOWN').val() != "all")
      return toastr.warning('ENTER THE SEARCH VALUE')
    $('#loading').show();
    try {
      $.get('/search_details', { input: formElements })
        .done(function (data) {
          if (data.ALL_RECORDS.length == 0) {
            $('#loading').hide();
            $('#TABLE_CONTAINER').hide();
            return toastr.error('NO RECORDS FOUND FOR THE SEARCH');
          }
          else {
            $('#loading').hide();
            $('#TABLE_CONTAINER').show();
            $('#TABLE_CONTAINER').html(Handlebars.templates['search']({ ALL_RECORDS: data.ALL_RECORDS }));
            toastr.clear();
            return toastr.success(`${data.ALL_RECORDS.length} RECORD(S) FOUND`);
          }
        });
    }
    catch (e) {
      $('#loading').hide();
      toastr.error('INTERNAL ERROR');
      alert(e.message);
    }
  })


  //RADIO BUTTON SEARCH

  $('input[type="radio"]').on('change', function () {
    $('#loading').show();
    try {
      $.get('/radio_search', { radio: $(this).val() })
        .done(function (data) {
          if (data.ALL_RECORDS.length == 0) {
            $('#loading').hide();
            $('#TABLE_CONTAINER').hide();
            return toastr.error('NO RECORDS FOUND FOR THE SEARCH');
            radioColor = "";
          }
          else {
            $('#loading').hide();
            $('#TABLE_CONTAINER').show();
            $('#TABLE_CONTAINER').html(Handlebars.templates['search']({ ALL_RECORDS: data.ALL_RECORDS }));
            toastr.clear();
            return toastr.success(`${data.ALL_RECORDS.length} RECORD(S) FOUND`);
            radioColor = "";
          }
        });
    }
    catch (e) {
      $('#loading').hide();
      toastr.error('INTERNAL ERROR');
      alert(e.message);
    }
  })

})//END FOR DOCUMENT READY
