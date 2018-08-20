
var form_elements
$(document).ready(function(){

  $('#loading').hide();
  $('#frmadd').on('submit',function(e){
    e.preventDefault();
    $('#loading').show();
    form_elements = $('#frmadd').serializeArray();
    $.get('/add_details',{input: form_elements})
    .done(function(data){
      $('#loading').hide();
      if(data.status == "ERROR")
      toastr.error('INTERNAL ERROR'); 
      else 
      toastr.success('RECORD ADDED');
  },'json');  
  })
  
  $('#home_btn').on('click',function(){
   window.location.href = "/"
  })

})