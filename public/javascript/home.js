
$(document).ready(function(){
  $.get('/home_details').done(function(data) {
    console.log(data.ALL_RECORDS);
    $('#TABLE_CONTAINER').html(Handlebars.templates['home']({ ALL_RECORDS: data.ALL_RECORDS }));
  })

  $('#add_record').on('click',function(){
   window.location.href = '\add';
  });  

})