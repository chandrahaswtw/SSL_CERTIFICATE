$(document).ready(function () {
  $('#loading').hide();

  $('#customFile').on('change', function () {
    toastr.clear();
    history.replaceState({}, document.title, window.location.href.split('#')[0]);
    var fileName = $('#customFile').val();
    $('#UPLOAD_LABEL').text(fileName.replace(/C:\\fakepath\\/i, ''));
    if (['xlsx'].indexOf(fileName.replace(/^.*\./, '')) == -1) {
      $('#FORMAT_MODAL_VIEW').modal('show');
      $('#customFile').val('');
      $('#UPLOAD_LABEL').text('');
    }
  })

  $('#BTN_UPLOAD').on('click', function (e) {
    if (!$('#customFile').val()) {
      e.preventDefault();
      toastr.clear();
      toastr.warning('BROWSE A FILE TO UPLOAD', 'NO FILE SELECTED');
    }
  })

  if (window.location.hash) {
    var x = (window.location.hash).split('');
    x.shift();
    $.get('/json_text', { file: x.join('') }).done(function (ALLRECORDS) {
      console.log(ALLRECORDS.data);
      $('#TEXT_AREA').val(JSON.stringify(ALLRECORDS.data, null, 4));
    })
  }

  $('#BTN_SYNC').on('click', function (e) {
    $('#loading').show();
    e.preventDefault();
    if (!window.location.hash) {
      toastr.clear();
      $('#loading').hide();
      return toastr.error('No file was uploaded', 'DATA SYNC FAILED')
    }

    $.get('/syncData', { ALLRECORDS: JSON.parse($('#TEXT_AREA').val()) }).done(function (data) {
      toastr.clear();
      history.replaceState({}, document.title, window.location.href.split('#')[0]);
      $('#TEXT_AREA').val('');
      $('#loading').hide();
      if (data.STATUS == 'ERROR') {
        return toastr.error('Try uploading the document again', 'INTERNAL ERROR');
      }
      else {
        return toastr.success(`${data.NUM} Records Inserted`, 'DONE');
      }
    })
  })



})

