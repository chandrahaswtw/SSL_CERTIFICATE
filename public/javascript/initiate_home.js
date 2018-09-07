function initiate_home(callback) {
  $.get('/home').done(function (data) {
    //*******TABLE SECTION BEGIN *******//
    $('#SUCCESS_COUNT').text(`${data.SUCCESS_COUNT}`);
    $('#WARNING_COUNT').text(`${data.WARNING_COUNT}`);
    $('#PRE_DANGER_COUNT').text(`${data.PRE_DANGER_COUNT}`);
    $('#DANGER_COUNT').text(`${data.DANGER_COUNT}`);
    $('#TOTAL_COUNT').text(`${data.TOTAL_COUNT}`);
    //*******TABLE SECTION END *******//

    //*******CHART SECTION BEGIN *******//

    var myChart = echarts.init($('#main')[0]);

    // specify chart configuration item and data
    var option = {
      title: {
        text: 'CERTIFICATE VALIDATION STATUS',
        subtext: 'CHART DISPLAYING THE CERTIFICATE STATUS',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['IMPLEMENTED', 'DUE (IN 20 DAYS)', 'NEARING DUE DATE', 'OVERDUE']
      },
      series: [
        {
          name: 'STATUS',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          selectedMode: 'single',

          data: [
            { value: data.SUCCESS_COUNT, name: 'IMPLEMENTED' },
            { value: data.WARNING_COUNT, name: 'DUE (IN 20 DAYS)' },
            { value: data.PRE_DANGER_COUNT, name: 'NEARING DUE DATE' },
            { value: data.DANGER_COUNT, name: 'OVERDUE' }
          ],
          color: ['green', 'yellow', 'orange', 'red'],
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
    $('#TABLEZONE').show();
    $('#main').show();
    $('#CHART_TEMP').hide();

    //*******CHART SECTION END *******//
  });

  //HBS REGISTER HELPER
  Handlebars.registerHelper('isStatus', function (expDate) {
    var d1 = new moment();
    var d2 = new moment();
    var d3 = new moment();
    var d4 = new moment(expDate, 'MM-DD-YYYY');
    var d5 = new moment();
    var color;

    //console.log(t_Days);
    d1 = d1.add(40, 'd');
    d2 = d2.add(20, 'd');
    d3 = d3.add(10, 'd');

    if (moment(d1).isSameOrBefore(d4))
      color = 'green';
    else if (moment(d1).isAfter(d4) && moment(d2).isSameOrBefore(d4))
      color = 'yellow';
    else if (moment(d2).isAfter(d4) && moment(d3).isSameOrBefore(d4))
      color = 'orange';
    else if (moment(d3).isSameOrAfter(d4)) color = 'red';


    if (d4.diff(d5, 'd') >= 0)
      var exp = `CERTIFICATE WILL EXPIRE IN ${d4.diff(d5, 'd')} DAYS`;
    else
      var exp = `CERTIFICATE ALREADY EXPIRED ${d5.diff(d4, 'd')} DAYS AGO. TAKE IMMEDIATE ACTION`;

    if (color)
      return `<td scope="col" style="color:${color}">
  <i class="fas fa-square" data-toggle="tooltip" data-placement="top" title= "${exp}"></i></td>`;

    else return `<td></td>`;
  });

  //FETCH ALL RECORDS
  $.get('/fetch_all').done(function (data) {
    console.log(data.ALL_RECORDS);
    $('#TABLE_CONTAINER').html(
      Handlebars.templates['home']({ ALL_RECORDS: data.ALL_RECORDS })
    );
    callback();
  });
}


