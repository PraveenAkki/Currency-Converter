const dropdowns = document.querySelectorAll(".dropdown select");

//Test to access country codes from codes.js file
// for(code in countryList)
// {
//   console.log(code, countryList[code]);
// }

for (let select of dropdowns) 
{
  for (currCode in countryList) 
  {
    let newOption = document.createElement("option");
    newOption.value = currCode;
    newOption.innerText = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};



async function currConv(event) {
  event.preventDefault();

  const amt = document.getElementById('amount').value;
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;

  const url = `https://currency-converter18.p.rapidapi.com/api/v1/convert?from=${from}&to=${to}&amount=${amt}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'abff027061mshbccd6d91fb66fc8p113591jsn67764540c04c',
      'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const data = result.result;
    console.log(data)
    console.log(result)
    console.log(result.result.amountToConvert)
    console.log(result.result.from)
    console.log(result.result.convertedAmount)
    console.log(result.result.to)
    // const conversionResult = result.amount; // Assuming the result is in 'amount' field

    document.querySelector('.msg').innerHTML = `${data.amountToConvert} ${data.from} = ${data.convertedAmount} ${data.to}`;
  } catch (error) {
    console.error(error);
  }
}