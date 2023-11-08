var labels = [];
var data = {
  labels: labels,
  datasets: [{
    label: 'Compound Interest Bar Chart',
    data: [],
    borderWidth: 1,
    borderColor: '#FF6384',
    backgroundColor: '#FFB1C1',
    ticks: {
      beginAtZero: true
    }
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        display: true,
        color: '#FF6384',
        grid: {
          color: '#36a2eb',
          borderColor: '#36a2eb',
          tickColor: '#36a2eb'
        },
        ticks: {
          beginAtZero: true
        }
      }
    }
  },
};

var ctx = document.getElementById("myCIChart").getContext('2d');
var ciChart = new Chart(ctx, config);
ciChart.update()
function plotNums(){
  var numYears= parseInt(document.getElementById("numYears").value);
  var interestRate= parseInt(document.getElementById("interestRate").value);
  var initialBalance = parseInt(document.getElementById("initialBalance").value);
  var annualContribution = parseInt(document.getElementById("annualContribution").value);
  var labelArray=Array.from({ length: numYears+1 }, (value, index) => index);
  ciChart.data.labels=labelArray;
  //ciChart.data.datasets[0].data=labelArray;
  ciChart.data.datasets[0].data= calculate_return(initialBalance, annualContribution, interestRate, numYears);
  ciChart.update();
}

function calculate_return(initialBalance, annualContribution, interestRate, numYears) {
  let result=[initialBalance];
  let currentBalance=initialBalance;
  for (let i = 0; i < numYears; i++) {
    currentBalance = (currentBalance*(1+(interestRate/100)))+annualContribution;
    result.push(currentBalance);
  }
  return result;
}




