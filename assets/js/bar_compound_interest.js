var labels = [];
var data = {
  labels: labels,
  datasets: [{
    label: 'Balance with withdrawals',
    data: [],
    borderWidth: 1,
    borderColor: '#82A3A1',
    backgroundColor: '#82A3A1',
    ticks: {
      beginAtZero: true
    }
  },
  {
    label: 'Balance without withdrawals',
    data: [],
    borderWidth: 1,
    borderColor: '#2EC4B6',
    backgroundColor: '#2EC4B6',
    ticks: {
      beginAtZero: true
    }
  }]
};
var data2 = {
  labels: labels,
  datasets: [{
    label: 'Balance with withdrawals',
    data: [],
    borderWidth: 1,
    borderColor: '#82A3A1',
    backgroundColor: '#82A3A1',
    ticks: {
      beginAtZero: true
    }
  },
  {
    label: 'Withdrawals',
    data: [],
    borderWidth: 1,
    borderColor: '#2EC4B6',
    backgroundColor: '#2EC4B6',
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
        color: 'red',
        grid: {
          color: '#9FC490',
          borderColor: '#9FC490',
          tickColor: '#9FC490'
        },
        ticks: {
          beginAtZero: true
        }
      }
    }
  },
};
const configSpending = {
  type: 'bar',
  data: data2,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        display: true,
        color: 'red',
        grid: {
          color: '#9FC490',
          borderColor: '#9FC490',
          tickColor: '#9FC490'
        },
        ticks: {
          beginAtZero: true
        }
      }
    }
  },
};

var ctx = document.getElementById("myCIChart").getContext('2d');
var ctxSpending = document.getElementById("mySpendingChart").getContext('2d');
var ciChart = new Chart(ctx, config);
var spendingChart = new Chart(ctxSpending, configSpending);
ciChart.update()
spendingChart.update()
function plotNums(){
  var numYears= parseInt(document.getElementById("numYears").value);
  var interestRate= parseInt(document.getElementById("interestRate").value);
  var initialBalance = parseInt(document.getElementById("initialBalance").value);
  var annualContribution = parseInt(document.getElementById("annualContribution").value);
  var numYearsToContrib= parseInt(document.getElementById("numYearsContrib").value);
  var numYearsToStartWithdraw = parseInt(document.getElementById("numYearsToStartWithdraw").value);
  var withdrawalAmount = parseInt(document.getElementById("withdrawalAmount").value);
  var inflationRate = parseInt(document.getElementById("inflationRate").value);
  var labelArray=Array.from({ length: numYears+1 }, (value, index) => index);
  ciChart.data.labels=labelArray;
  ciChart.data.datasets[0].data= calculate_return(initialBalance, annualContribution, interestRate, numYears, numYearsToContrib, numYearsToStartWithdraw, withdrawalAmount, inflationRate);
  ciChart.data.datasets[1].data= calculate_return(initialBalance, annualContribution, interestRate, numYears, numYearsToContrib,numYears, 0, 0);
  ciChart.update();
  spendingChart.data.labels=labelArray;
  spendingChart.data.datasets[0].data= calculate_return(initialBalance, annualContribution, interestRate, numYears, numYearsToContrib, numYearsToStartWithdraw, withdrawalAmount, inflationRate);
  spendingChart.data.datasets[1].data= calculate_spending(inflationRate, withdrawalAmount, numYearsToStartWithdraw, numYears);
  spendingChart.update();
}

function calculate_return(initialBalance, annualContribution, interestRate, numYears, numYearsToContrib, numYearsToStartWithdraw, withdrawalAmount, inflationRate) {
  let result=[initialBalance];
  let currentBalance=initialBalance;
  let inflatedWithdrawalAmount = withdrawalAmount
  for (let i = 0; i < numYears; i++) {
    inflatedWithdrawalAmount = inflatedWithdrawalAmount *(1 + inflationRate/100);
    if (i <= numYearsToContrib) {
      currentBalance = (currentBalance*(1+(interestRate/100)))+annualContribution;
    } else {
      currentBalance = (currentBalance*(1+(interestRate/100)));
    }
    if (i >= numYearsToStartWithdraw) {
      currentBalance = currentBalance - inflatedWithdrawalAmount;
    }
    result.push(currentBalance);
  }
  return result;
}

function calculate_spending(inflationRate, withdrawalAmount, numYearsToStartWithdraw, numYears) {
  let result=[];
  let inflatedWithdrawalAmount = withdrawalAmount
  for (let i = 0; i < numYears; i++) {
    inflatedWithdrawalAmount = inflatedWithdrawalAmount *(1 + inflationRate/100);
    if (i >= numYearsToStartWithdraw) {
      result.push(inflatedWithdrawalAmount);
    }
    else {
      result.push(0);
    }
  }
  return result;
}



