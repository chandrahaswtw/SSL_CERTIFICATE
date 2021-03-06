$(document).ready(function () {

  toastr.options = {
    progressBar: false,
    showDuration: "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    positionClass: 'toast-top-left'
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

  //EDIT MODAL APPEARANCE
  $("body").on("click", "[name='modalEditBtn']", function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('#modalSave').attr('_id', this.id);
    $('#modalSave').attr('_rev', $(this).attr('_rev'));
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

  //SAVING THE EDITED VALUES ON MODAL
  $('#modalSave').on('click', function (e) {
    e.preventDefault();
    $('#modalSave').attr('disabled', true).text('Saving changes...');
    form_elements = $('#modalEdit').serializeArray();

    console.log(form_elements);
    if (!$("#modalEdit input[name='alertMech']").is(':checked')) {
      form_elements.push({ name: "alertMech", value: `off` });
    }

    form_elements.unshift({ name: "_id", value: $('#modalSave').attr('_id') }, { name: "_rev", value: $('#modalSave').attr('_rev') });
    $.get('/modal_update', { input: form_elements }).done(function (data) {
      if (data.status == "ERROR") {
        toastr.error('INTERNAL ERROR');
        $('#modalSave').removeAttr('disabled').text('Save changes');
      }
      else {
        $('#modalSave').attr('_rev', data._rev);
        //$('#modalSave').removeAttr('disabled').text('Save changes');
        try {
          initiate_home(function cb() {
            dataTab('HOME_TABLE'); toastr.clear();
            $('#modalSave').removeAttr('disabled').text('Save changes');
            $('#MODAL_EDIT').modal('hide');
            toastr.success('RECORD UPDATED');
          });
        }
        catch (e) { dummy(e); }
        try {
          if ($('#DROP_DOWN').val() != 'expStatus')
            form_search(function cb(count) {
              dataTab('SEARCH_TABLE');
              toastr.clear();
              $('#modalSave').removeAttr('disabled').text('Save changes');
              $('#MODAL_EDIT').modal('hide');
              toastr.success('RECORD UPDATED');
            });
          else
            radio_search(function cb(count) {
              dataTab('SEARCH_TABLE');
              toastr.clear();
              $('#modalSave').removeAttr('disabled').text('Save changes');
              $('#MODAL_EDIT').modal('hide');
              toastr.success('RECORD UPDATED');

            });
        }
        catch (e) { dummy(e); }
      }
    });

    function dummy(e) { }
  })

}) // END OF DOCUMENT READY