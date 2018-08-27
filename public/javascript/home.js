
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
    toastr.clear();
    //*******CHART SECTION END *******//
   })
})