$(document).ready(function () {

  $('#loading').removeClass('hidden');

  toastr.options = {
    "positionClass": "toast-top-left",
  }

  $('body').tooltip({
    selector: '[data-toggle="tooltip"]' // tooltip objects will be delegated to the specified targets
  });

  // HANDLEBARS TEMPLATE
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
      $('#loading').addClass('hidden');
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

  // REMOVE USERS FONT AWESOME CLICK
  $("body").on("click", "[name='modalRemove']", function (e) {

    e.stopPropagation();
    e.preventDefault();
    if ($('#titleUser').attr('username') == $(this).attr('username'))
      return $('#modalSelfDestruct').modal('show');
    $('#btnDelete').attr('idtemp', $(this).attr('id'));
    $('#btnDelete').attr('revtemp', $(this).attr('_rev'));
    $('#modalDelete').modal('show');
  })

  // REMOVE USERS BUTTON CLICK
  $('#btnDelete').on('click', function (e) {
    e.preventDefault();
    $('#btnDelete').attr('disabled', true).text('Removing....');
    $.post('/removeUser', { id: $(this).attr('idtemp'), _rev: $(this).attr('revtemp') }, function (data) {

      $('#btnDelete').removeAttr('disabled').text('Remove user');
      if ((data.STATUS) == "ERROR") {
        toastr.error('Try again !!', 'INTERNAL ERROR');
      }
      else {
        $('#modalDelete').modal('hide');
        user_handlebars();
        toastr.success('User removed', 'DONE');
      }

    })

  })




})