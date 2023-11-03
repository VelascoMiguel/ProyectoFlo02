const selectFromCrypto = document.querySelector("#fromCrypto");
const selectToCrypto = document.querySelector("#toCrypto");
const imgFromLogo = document.getElementById("fromCryptoLogo");
const imgToLogo = document.getElementById("toCryptoLogo");
const buttonExchange = document.getElementById("calculate-exchange");

buttonExchange.addEventListener("click", function (e) {
    e.preventDefault();
  
    const cryptoFrom = document.querySelector("#fromCrypto").value;
    const cryptoTo = document.querySelector("#toCrypto").value;
  
    const cantCryptoFrom = document.querySelector('#cant-cripto-from').value;

    let priceCryptoFrom = getValueCrypto(cryptoFrom) * cantCryptoFrom;
    let priceCryptoTo = getValueCrypto(cryptoTo);
  
    // Calcular la tasa de cambio
    const exchangeRate = priceCryptoFrom / priceCryptoTo;
    console.log(`Exchange rate: 1 ${cryptoFrom} = ${exchangeRate} ${cryptoTo}`);

    document.querySelector('#result-exchange').value = exchangeRate;
  });
  

selectFromCrypto.addEventListener("change", function () {
  const selectedCrypto = selectFromCrypto.value;
  const pathFromSymbol = getLogoPath(selectedCrypto);
  imgFromLogo.src = pathFromSymbol;
});

selectToCrypto.addEventListener("change", function () {
  const selectedCrypto = selectToCrypto.value;
  const pathFromSymbol = getLogoPath(selectedCrypto);
  imgToLogo.src = pathFromSymbol;
});

function getLogoPath(cryptoSymbol) {
  const symbolToPathMap = {
    btc: "./images/bitcoin.png",
    eth: "./images/coins.png",
    xrp: "./images/xrp.png",
    ada: "./images/cardano.png",
    xmr: "./images/monero.png",
  };

  return symbolToPathMap[cryptoSymbol] || "";
}

function getValueCrypto(valueSelect) {
    let priceCrypto = 0;
    if (valueSelect === "btc") {
      priceCrypto = parseFloat(document.querySelector("#bitcoin").textContent.replace('$', '').replace(',', ''));
    } else if (valueSelect === "eth") {
      priceCrypto = parseFloat(document.querySelector("#ethereum").textContent.replace('$', '').replace(',', ''));
    } else if (valueSelect === "xrp") {
      priceCrypto = parseFloat(document.querySelector("#xrp").textContent.replace('$', '').replace(',', ''));
    } else if (valueSelect === "ada") {
      priceCrypto = parseFloat(document.querySelector("#ada").textContent.replace('$', '').replace(',', ''));
    } else if (valueSelect === "xmr") {
      priceCrypto = parseFloat(document.querySelector("#xmr").textContent.replace('$', '').replace(',', ''));
    }
  
    return priceCrypto;
  }
  
