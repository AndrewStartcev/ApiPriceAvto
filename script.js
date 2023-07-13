var inputNumber = document.getElementById('inputNumber');
var inputRegion = document.getElementById('inputRegion');
var inputMilage = document.getElementById('inputMilage');

var regex = /^([А-Я]{0,1})\s?(\d{0,2})\s?(\d{0,1})\s?(\d{0,1})\s?([А-Я]{0,2})$/;

inputNumber.addEventListener('input', function (event) {
  var value = event.target.value.toUpperCase();
  var formattedValue = '';
  var matches = value.match(regex);

  if (matches) {
    var group1 = matches[1] ? matches[1].trim() : '';
    var group2 = matches[2] ? matches[2].trim() : '';
    var group3 = matches[3] ? matches[3].trim() : '';
    var group4 = matches[4] ? matches[4].trim() : '';
    var group5 = matches[5] ? matches[5].trim() : '';

    formattedValue = group1 + ' ' + group2 + group3 + ' ' + group4 + group5;
  }

  event.target.value = formattedValue.slice(0, 8);
});

inputNumber.addEventListener('keydown', function (event) {
  var key = event.key.toUpperCase();
  var cursorPosition = event.target.selectionStart;
  var currentValue = event.target.value.toUpperCase();
  var newValue = currentValue.slice(0, cursorPosition) + key + currentValue.slice(cursorPosition);

  if (event.key === 'Backspace') {
    var newValue = currentValue.slice(0, cursorPosition - 1) + currentValue.slice(cursorPosition);
    event.target.value = newValue;
    event.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
  }

  if (cursorPosition === 0 && !/[А-Я]/.test(key)) {
    event.preventDefault();
  }
  if (cursorPosition >= 2 && cursorPosition <= 4 && !/\d/.test(key)) {
    event.preventDefault();
  }
  if (cursorPosition >= 6 && !/[А-Я]/.test(key)) {
    event.preventDefault();
  }
  if (cursorPosition === 7 && !/[А-Я]/.test(key)) {
    event.preventDefault();
  }
  if (cursorPosition === 8) {
    event.preventDefault();
    inputRegion.focus();
  }
});

inputRegion.addEventListener('input', function (event) {
  var cursorPosition = event.target.value.length;

  console.log(cursorPosition)

  if (cursorPosition >= 3) {
    event.preventDefault();
    inputMilage.focus();
  }
})


var evaluateButton = document.getElementById('evaluateButton');

evaluateButton.addEventListener('click', function () {
  var numberValue = inputNumber.value.replace(/\s/g, '');
  var regionValue = inputRegion.value;
  var milageValue = inputMilage.value;

  var data = {
    number: numberValue,
    region: regionValue,
    milage: milageValue
  };

  var jsonData = JSON.stringify(data);

  console.log(jsonData)

  fetch('/url-to-your-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonData
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      console.log(result);
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
});
