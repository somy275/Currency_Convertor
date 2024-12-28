
async function exchangeCurrency(amount, from, To) {
  return await fetchCurrencyData(amount, from, To);
}

let catchData = [];
let fetchCurrencyData = async (amount, from, To) => {
  await fetch(`https://api.exconvert.com/convert?access_key=dfa93eb7-e60bfcf9-2aca7674-ba4f8ac8&from=${from}&to=${To}&amount=${amount}`)
    .then(res => res.json())
    .then(data => { catchData = data })
  return amount + " " + catchData["base"] + " = " + catchData["result"][To].toFixed(4) + " " + To;
}



export default exchangeCurrency;