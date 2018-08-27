
$(document).ready(function(){
 
    toastr.options = {
        "progressBar": true,
        "showDuration": "700",
        "positionClass": "toast-bottom-left"
      }
    toastr.info('Please wait','PAGE LOADING');
    $("#TABLEZONE").hide();

   $.get('/home').done(function(data) {

    //*******TABLE SECTION BEGIN *******//
    $('#SAFE_COUNT').text(`${data.SAFE_COUNT}`);
    $('#UNSAFE_COUNT').text(`${data.UNSAFE_COUNT}`);
    $('#DANGER_COUNT').text(`${data.DANGER_COUNT}`); 
    $('#TOTAL_COUNT').text(`${data.TOTAL_COUNT}`);   
    //*******TABLE SECTION END *******//


    //*******CHART SECTION BEGIN *******//

    var myChart = echarts.init($('#main')[0]);

    // specify chart configuration item and data
    var option = {
        title : {
            text: 'SSL CERTIFICATE STATUS',
            subtext: 'CHART DISPLAYING THE CERTIFICATE STATUS',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['SAFE','UNSAFE','DANGER']
        },
        series : [
            {
                name: 'STATUS',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                selectedMode: 'single',
                
                data:[
                    {value:data.SAFE_COUNT, name:'SAFE'},
                    {value:data.UNSAFE_COUNT, name:'UNSAFE'},
                    {value:data.DANGER_COUNT, name:'DANGER'}
                    ],
                color:['green','yellow','red'],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    

    // use configuration item and data specified to show chart
    myChart.setOption(option);
    $("#TABLEZONE").show();
    //*******CHART SECTION END *******//
   })

  //HBD REGISTER HELPER
  Handlebars.registerHelper('isStatus', function (expDate, t_Days) {
    var d1 = new moment();
    var d2 = new moment();
    var d3 = new moment(expDate, 'MM-DD-YYYY');
    var color;

    if (!isNaN(Number(t_Days)))
      t_Days = Number(t_Days);
    else
      t_Days = 30;

    //console.log(t_Days);
    d1 = d1.add((t_Days + 30), 'd');
    d2 = d2.add(t_Days, 'd');

    if (moment(d1).isSameOrBefore(d3))
      color = "green";
    else if (moment(d1).isSameOrAfter(d3) && moment(d2).isSameOrBefore(d3))
      color = "yellow";
    else if (moment(d2).isSameOrAfter(d3))
      color = "red";

    if (color)
      return `<td scope="col" style="color:${color}"><i class="fas fa-square"></i></td>`;
    else
      return `<td></td>`;
  })


  //FETCH ALL RECORDS
  $.get('/fetch_all').done(function (data) {
    console.log(data.ALL_RECORDS);
    $('#TABLE_CONTAINER').html(Handlebars.templates['search']({ ALL_RECORDS: data.ALL_RECORDS }));
    toastr.clear();
  })
})