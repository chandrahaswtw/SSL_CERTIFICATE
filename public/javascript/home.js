$(document).ready(function () {

  toastr.options = {
    progressBar: true,
    showDuration: '700',
    positionClass: 'toast-bottom-left'
  };

  //TOASTR
  toastr.info('Please wait', 'PAGE LOADING');
  $('#TABLEZONE').hide();
  $('#main').hide();

  //TOOL TIP
  $('body').tooltip({
    selector: '[data-toggle="tooltip"]' // tooltip objects will be delegated to the specified targets
  });

  initiate_home(function cb() {
    toastr.clear();
    $.fn.dataTable.moment('MM/DD/YYYY');
    $('#HOME_TABLE').DataTable({
      "order": [[4, "asc"]]
    });

  });

});
