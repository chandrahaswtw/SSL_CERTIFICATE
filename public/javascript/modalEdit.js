$(document).ready(function () {

  $('#loading1').hide();

  toastr.options = {
    progressBar: false,
    showDuration: "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    positionClass: 'toast-top-right'
  };

  //HANDLE BARS REGISTER HELPER
  Handlebars.registerHelper('isAlertEdit', function (alertMech) {

    if (alertMech == 'on')
      alertMech = "checked";
    else
      alertMech = "";


    return `<label class="switch" class="form-control">
      <input type="checkbox" name="alertMech" id="alertMech" ${alertMech}>
      <span class="slider round"></span>
    </label>`
  });

  //EDIT PAGE APPEARANCE
  $("body").on("click", "[name='modalEditBtn']", function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('#modalSave').attr('_id', this.id);
    $.get('/modal_view', { BTN_ID: this.id }).done(function (data) {
      $('#modalSave').attr('_rev', data.ALL_RECORDS[0]._rev);
      var $html = $(Handlebars.templates['modalEdit']({ ALL_RECORDS: data.ALL_RECORDS[0] }));
      if (data.ALL_RECORDS[0].certName)
        $html.find('#certName').val(`${data.ALL_RECORDS[0].certName}`);
      if (data.ALL_RECORDS[0].envName)
        $html.find('#envName').val(`${data.ALL_RECORDS[0].envName}`);
      $html.find('#textArea').val('');
      $html.find('.datepicker-here').datepicker({
        language: 'en',
        autoClose: true,
        dateFormat: 'mm/dd/yyyy'
      });
      $('#modalEditTarget').html($html);
      $('#MODAL_EDIT').modal('show');
      toastr.clear();
    })
  })

  //SAVING THE EDITED VALUES
  $('#modalSave').on('click', function (e) {
    e.preventDefault();
    $('#modalSave').attr('disabled', true).text('Saving changes...');
    form_elements = $('#modalEdit').serializeArray();
    if (!$("#alertMech").is(':checked')) {
      form_elements.push({ name: "alertMech", value: `off` });
    }
    form_elements.unshift({ name: "_id", value: $('#modalSave').attr('_id') }, { name: "_rev", value: $('#modalSave').attr('_rev') });
    $.get('/modal_update', { input: form_elements }).done(function (data) {
      if (data.status == "ERROR") {
        toastr.error('INTERNAL ERROR');
        $('#modalSave').removeAttr('disabled').text('Save changes');
      }
      else {
        toastr.success('REFERSH THE SEARCH TO VIEW THE UPDATED RESULTS', 'RECORD UPDATED');
        $('#modalSave').attr('_rev', data._rev);
        $('#modalSave').removeAttr('disabled').text('Save changes');
      }
    });
  })





})