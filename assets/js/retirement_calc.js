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
var data3 = {
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
var data4 = {
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
const configSpendingPreTax = {
  type: 'bar',
  data: data3,
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
const configSpendingRoth = {
  type: 'bar',
  data: data4,
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
var ctxSpendingPreTax = document.getElementById("myPreTaxSpendingChart").getContext('2d');
var ctxSpendingRoth = document.getElementById("myRothSpendingChart").getContext('2d');
var ciChart = new Chart(ctx, config);
var spendingChart = new Chart(ctxSpending, configSpending);
var spendingPreTaxChart = new Chart(ctxSpendingPreTax, configSpendingPreTax);
var spendingRothChart = new Chart(ctxSpendingRoth, configSpendingRoth);
ciChart.update()
spendingChart.update()
spendingPreTaxChart.update()
spendingRothChart.update()

function plotNums(){
  var numYears= parseInt(document.getElementById("numYears").value);

  var interestRateGrowthStage= parseFloat(document.getElementById("interestRate").value);
  var interestRateWithdrawalStage= parseFloat(document.getElementById("interestRateLater").value);

  var initialBalancePreTax = parseInt(document.getElementById("initialBalancePreTax").value);
  var annualContributionPreTax = parseInt(document.getElementById("annualContributionPreTax").value);

  var initialBalanceRoth = parseInt(document.getElementById("initialBalanceRoth").value);
  var annualContributionRoth = parseInt(document.getElementById("annualContributionRoth").value);

  var numYearsToContrib= parseInt(document.getElementById("numYearsContrib").value);

  var numYearsToStartWithdraw = parseInt(document.getElementById("numYearsToStartWithdraw").value);
  
  var withdrawalAmountPreTax = parseInt(document.getElementById("withdrawalamountPreTax").value);
  var withdrawalAmountRoth = parseInt(document.getElementById("withdrawalamountRoth").value);
 
  var inflationRate = parseFloat(document.getElementById("inflationRate").value);
  var taxRate = parseFloat(document.getElementById("taxRate").value);
  console.log("taxRate:", taxRate);
 
  var labelArray=Array.from({ length: numYears+1 }, (value, index) => index);
  ciChart.data.labels=labelArray;
  ciChart.data.datasets[0].data= calculate_return(initialBalancePreTax, annualContributionPreTax, initialBalanceRoth, annualContributionRoth, interestRateGrowthStage, interestRateWithdrawalStage,  numYears, numYearsToContrib, numYearsToStartWithdraw, withdrawalAmountPreTax, withdrawalAmountRoth, inflationRate, taxRate);
  ciChart.data.datasets[1].data= calculate_return(initialBalancePreTax, annualContributionPreTax, initialBalanceRoth, annualContributionRoth, interestRateGrowthStage, interestRateWithdrawalStage,  numYears, numYearsToContrib, numYearsToStartWithdraw, 0, 0, inflationRate, 0);
  ciChart.update();
  
  spendingChart.data.labels=labelArray;
  spendingChart.data.datasets[0].data= calculate_return(initialBalancePreTax, annualContributionPreTax, initialBalanceRoth, annualContributionRoth, interestRateGrowthStage, interestRateWithdrawalStage,  numYears, numYearsToContrib, numYearsToStartWithdraw, withdrawalAmountPreTax, withdrawalAmountRoth, inflationRate, taxRate);
  spendingChart.data.datasets[1].data= calculate_spending(inflationRate, withdrawalAmountPreTax, withdrawalAmountRoth, numYearsToStartWithdraw, numYears, taxRate);
  spendingChart.update();
  
  spendingPreTaxChart.data.labels=labelArray;
  spendingPreTaxChart.data.datasets[0].data= calculate_return(initialBalancePreTax, annualContributionPreTax, 0, 0, interestRateGrowthStage, interestRateWithdrawalStage,  numYears, numYearsToContrib, numYearsToStartWithdraw, withdrawalAmountPreTax, 0, inflationRate, taxRate);
  spendingPreTaxChart.data.datasets[1].data= calculate_spending(inflationRate, withdrawalAmountPreTax, 0, numYearsToStartWithdraw, numYears, taxRate);
  spendingPreTaxChart.update()
  
  spendingRothChart.data.labels=labelArray;
  spendingRothChart.data.datasets[0].data= calculate_return(0, 0, initialBalanceRoth, annualContributionRoth, interestRateGrowthStage, interestRateWithdrawalStage,  numYears, numYearsToContrib, numYearsToStartWithdraw, 0, withdrawalAmountRoth, inflationRate, taxRate);
  spendingRothChart.data.datasets[1].data= calculate_spending(inflationRate, 0, withdrawalAmountRoth, numYearsToStartWithdraw, numYears, taxRate);
  spendingRothChart.update()
}

function calculate_return(initialBalancePreTax, annualContributionPreTax, initialBalanceRoth, annualContributionRoth, interestRateGrowthStage, interestRateWithdrawalStage,  numYears, numYearsToContrib, numYearsToStartWithdraw, withdrawalAmountPreTax, withdrawalAmountRoth, inflationRate, taxRate) {
  let result=[];
  let currentBalance=initialBalancePreTax+initialBalanceRoth;
  let currentBalancePreTax=initialBalancePreTax;
  let currentBalanceRoth=initialBalanceRoth;
  let inflatedWithdrawalAmountPreTax = withdrawalAmountPreTax;
  let inflatedWithdrawalAmountRoth = withdrawalAmountRoth;
  for (let i = 0; i < numYears; i++) {
    inflatedWithdrawalAmountPreTax = (inflatedWithdrawalAmountPreTax*(1 + (inflationRate/100)));
    inflatedWithdrawalAmountRoth = inflatedWithdrawalAmountRoth *(1 + (inflationRate/100));
    console.log("PreTax withdrawal before tax:", inflatedWithdrawalAmountPreTax);
    if (i < numYearsToContrib) {
      currentBalancePreTax = (currentBalancePreTax*(1+(interestRateGrowthStage/100)))+annualContributionPreTax;
      currentBalanceRoth = (currentBalanceRoth*(1+(interestRateGrowthStage/100)))+annualContributionRoth;
      currentBalance=currentBalancePreTax + currentBalanceRoth;
    } else {
      currentBalance = (currentBalance*(1+(interestRateWithdrawalStage/100)));
    }
    console.log("currentBalance:", currentBalance)
    if (i >= numYearsToStartWithdraw) {
      inflatedActualPreTax = inflatedWithdrawalAmountPreTax*100/(100-taxRate);
      console.log("PreTax withdrawal before tax:", inflatedWithdrawalAmountPreTax);
      console.log("PreTax withdrawal:", inflatedActualPreTax);
      currentBalance = currentBalance - (inflatedWithdrawalAmountRoth + inflatedActualPreTax);
      currentBalancePreTax = currentBalancePreTax - inflatedActualPreTax;
      currentBalanceRoth = currentBalanceRoth -inflatedWithdrawalAmountRoth;
      console.log("currentBalance after withdrawal:", currentBalance)
    }
    result.push(currentBalance);
  }
  return result;
}

function calculate_spending(inflationRate, withdrawalAmountPreTax, withdrawalAmountRoth, numYearsToStartWithdraw, numYears, taxRate) {
  let result=[];
  let inflatedWithdrawalAmountPreTax = withdrawalAmountPreTax;
  let inflatedWithdrawalAmountRoth = withdrawalAmountRoth;
  for (let i = 0; i < numYears; i++) {
    inflatedWithdrawalAmountRoth = inflatedWithdrawalAmountRoth *(1 + inflationRate/100);
    inflatedWithdrawalAmountPreTax = inflatedWithdrawalAmountPreTax *(1 + inflationRate/100);
    if (i >= numYearsToStartWithdraw) {
      inflatedActualPreTax = inflatedWithdrawalAmountPreTax*100/(100-taxRate);
      amountWithdrawn = inflatedActualPreTax + inflatedWithdrawalAmountRoth;
      result.push(amountWithdrawn);
    }
    else {
      result.push(0);
    }
  }
  return result;
}



