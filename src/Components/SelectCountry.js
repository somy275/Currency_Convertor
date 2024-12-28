let selectcurrency = () => {
  return fetchflags();
}

let catchData = [];
let fetchflags = async () => {
  await fetch("https://api.exconvert.com/currencies?access_key=dfa93eb7-e60bfcf9-2aca7674-ba4f8ac8")
    .then(res => res.json())
    .then(data => { catchData = data })
  return catchData;
}


export default selectcurrency;
