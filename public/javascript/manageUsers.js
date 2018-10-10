$(document).ready(function () {

  toastr.options = {
    "positionClass": "toast-top-left",
  }

  // HANDLEBARS
  user_handlebars();
  function user_handlebars() {
    $.post('/getUserData').done(function (data) {
      $('#TABLE_CONTAINER').html(Handlebars.templates['userData'](data));
      $('#userTable').DataTable({
        columnDefs: [{
          targets: [0, 2],
          orderable: false
        }],
        "order": [[1, "asc"]]
      });
    })
  }


  // ADD USERS STUFF BUTTON CLICK EVENT
  $('#btnSendMail').on('click', function (e) {

    e.preventDefault();

    if (($('#primaryEmail').val()).split('.').indexOf('ibm') == -1) {
      return toastr.warning('Only IBM id\'s are allowed', 'INVALID EMAIL');
      $('#primaryEmail').focus();
    }

    $('#btnSendMail').attr('disabled', true).text('Sending...');

    $.post('/addUser', { username: $('#primaryEmail').val() }).done(function (data) {

      $('#btnSendMail').removeAttr('disabled').text('Send invite');

      if (data.STATUS == "EXISTS")
        return toastr.error('Username already exists !!', 'ERROR');

      else if (data.STATUS == "ERROR")
        return toastr.error('Please try again', 'INTERNAL ERROR');

      else if (data.STATUS == "SUCCESS") {
        $('#primaryEmail').val("");
        user_handlebars();
        $('#modalAdd').modal('hide');
        return toastr.success("Credentails are sent to the user's Email ID", 'NEW USER ADDED');
      }
    })
  })

})