function addNums() {
  var n1= parseInt(document.getElementById("firstNum").value);
  var n2= parseInt(document.getElementById("secondNum").value);
  var result = n1+n2;
  var resText = "Result of Addition= " + result;
  document.getElementById("resOfAddition").innerHTML = resText; 
}

