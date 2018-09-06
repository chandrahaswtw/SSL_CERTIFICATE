$(document).ready(function () {

  //HANDLE BARS REGISTER HELPER
  Handlebars.registerHelper('isAlertView', function (alertMech) {


    if (alertMech == 'on')
      alertMech = "checked";
    else
      alertMech = "";


    return `<label class="switch" class="form-control">
    <input type="checkbox" name="alertMech" id="alertMech" disabled ${alertMech}>
    <span class="slider round"></span>
    </label>`

  });



  $("body").on("click", "[name='modalViewBtn']", function (e) {
    e.stopPropagation();
    e.preventDefault();
    $.get('/modal_view', { BTN_ID: this.id }).done(function (data) {
      $('#modalViewTarget').html(Handlebars.templates['modalView']({ ALL_RECORDS: data.ALL_RECORDS[0] }));
      $('#MODAL_VIEW').modal('show');
    })



  })
})