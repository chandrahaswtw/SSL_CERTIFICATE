function form_search(callback) {
  try {
    $.get('/search_details', { input: formElements })
      .done(function (data) {
        if (data.ALL_RECORDS.length == 0) {
          $('#loading').hide();
          $('#TABLE_CONTAINER').hide();
          return callback(0);
        }
        else {
          $('#loading').hide();
          $('#TABLE_CONTAINER').show();
          $('#TABLE_CONTAINER').html(Handlebars.templates['search']({ ALL_RECORDS: data.ALL_RECORDS }));
          return callback(data.ALL_RECORDS.length);
        }
      });
  }
  catch (e) {
    $('#loading').hide();
    toastr.clear();
    toastr.error('INTERNAL ERROR');
    alert(e.message);
  }

}

function radio_search(callback) {
  try {
    $.get('/radio_search', { radio: $('input[type="radio"]:checked').val() })
      .done(function (data) {
        if (data.ALL_RECORDS.length == 0) {
          $('#loading').hide();
          $('#TABLE_CONTAINER').hide();
          return callback(0);
        }
        else {
          $('#loading').hide();
          $('#TABLE_CONTAINER').show();
          $('#TABLE_CONTAINER').html(Handlebars.templates['search']({ ALL_RECORDS: data.ALL_RECORDS }));
          return callback(data.ALL_RECORDS.length);
          //return toastr.success(`${data.ALL_RECORDS.length} RECORD(S) FOUND`);
        }
      });
  }
  catch (e) {
    $('#loading').hide();
    toastr.clear();
    toastr.error('INTERNAL ERROR');
    alert(e.message);
  }

}

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