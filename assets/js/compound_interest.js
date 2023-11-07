var yearlyContribution=Math.floor(Math.random() * 10) + 1;
var xyValues = [
];
var ctx = document.getElementById("myCIChart").getContext('2d');
var ciChart = new Chart(ctx, {
  type: "scatter",
  data: {
    datasets: [{
      pointBackgroundColor: "rgb(0,0,255)",
      data: xyValues
   }]
  },
  options: {
    legend: {display: false},
    scales: {
      xAxes: [{ticks: {min: 40, max:160}}],
      yAxes: [{ticks: {min: 1, max:50}}],
    }
  }
});
ciChart.update()
function plotNums(){
  var n1= parseInt(document.getElementById("firstNum").value);
  var n2= parseInt(document.getElementById("secondNum").value);
  var xyValues = [
  {x:50, y:n1},
  {x:60, y:n2}];
  ciChart.data.datasets[0].data=xyValues;
  ciChart.update();
}
