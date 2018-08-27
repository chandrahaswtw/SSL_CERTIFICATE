
$(document).ready(function () {

  $('#ZONE').hide();

  //FETCH ALL RECORDS
  $('#loading').show();
  $.get('/fetch_all').done(function (data) {
    //console.log(data.ALL_RECORDS);
    $('#TABLE_CONTAINER').html(Handlebars.templates['search']({ ALL_RECORDS: data.ALL_RECORDS }));
    $('#loading').hide();
  })

//DATE PICKER

  $(function () {
    $('#SSL_CALEN_ID').datepicker({
      language: 'en',
      autoClose: true,
      dateFormat: 'mm/dd/yyyy'
    })
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
      //$("#ZONE").css({'margin-left':'100px'});
      $('#SSL_CALEN_ID').val('');
      $("#SEARCH_TEXT_ID").val('');
      $('#SSL_CALEN').hide();
      $("#SEARCH_TEXT").hide();
      $("#btn_search").hide();
    }
  })

  //HANDLE BARS REGISTER HELPER

  Handlebars.registerHelper('isStatus', function (expDate, t_Days) {
    var d1 = new moment();
    var d2 = new moment();
    var d3 = new moment(expDate, 'MM-DD-YYYY');
    var color;

    if (!isNaN(Number(t_Days)))
      t_Days = Number(t_Days);
    else
      t_Days = 30;

    //console.log(t_Days);
    d1 = d1.add((t_Days + 30), 'd');
    d2 = d2.add(t_Days, 'd');

    if (moment(d1).isSameOrBefore(d3))
      color = "green";
    else if (moment(d1).isSameOrAfter(d3) && moment(d2).isSameOrBefore(d3))
      color = "yellow";
    else if (moment(d2).isSameOrAfter(d3))
      color = "red";

    if (color)
      return `<td scope="col" style="color:${color}"><i class="fas fa-square"></i></td>`;
    else
      return `<td></td>`;
  })

  //FORM SUBMIT

  $('#SEARCH_FORM').on('submit', function (e) {
    e.preventDefault();
    formElements = $('#SEARCH_FORM').serializeArray();
    if (!formElements[0].value)
        return toastr.warning('SELECT THE SEARCH PARAMETER');
    if (!formElements[1].value && $('#DROP_DOWN').val() != "expDate" && $('#DROP_DOWN').val() != "all")
        return toastr.warning('ENTER THE SEARCH VALUE')
    $('#loading').show();
    try{
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
    catch(e)
    {
      $('#loading').hide();
      toastr.error('INTERNAL ERROR');
      alert(e.message);
    }
  })


   //RADIO BUTTON 

$('input[type="radio"]').on('change',function(){
    $('#loading').show();
  try{
    $.get('/radio_search',{radio : $(this).val()})
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
    catch(e)
    {
      $('#loading').hide();
      toastr.error('INTERNAL ERROR');
      alert(e.message);
    }
})

})//END FOR DOCUMENT READY
