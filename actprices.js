const precioBitcoin = document.getElementById("bitcoin");
const precioEthereum = document.getElementById("ethereum");
const precioXRP = document.getElementById("xrp");
const precioADA = document.getElementById("ada");
const precioXMR = document.getElementById("xmr");

const socket = new WebSocket("ws://localhost:4544");

let precioActualBTC = 0;
let precioActualETH = 0;
let precioActualXRP = 0;
let precioActualADA = 0;
let precioActualXMR = 0;

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  const precioBTCNumber = parseFloat(data.precio.btcusdt);
  const precioETHNumber = parseFloat(data.precio.ethusdt);
  const precioXRPNUMBER = parseFloat(data.precio.xrpusdt);
  const precioADANUMBER = parseFloat(data.precio.adausdt);
  const precioXMRNumber = parseFloat(data.precio.xmrusdt);

  // BTC
  if (!isNaN(precioBTCNumber)) {
    precioBitcoin.textContent = `$ ${precioBTCNumber}`;
    if (precioBTCNumber < precioActualBTC) {
      precioBitcoin.style.color = "rgb(252, 49, 49)";
      precioActualBTC = precioBTCNumber;
    } else {
      precioBitcoin.style.color = "rgb(46, 207, 46)";
      precioActualBTC = precioBTCNumber;
    }
  }

  // ETH
  if (!isNaN(precioETHNumber)) {
    precioEthereum.textContent = `$ ${precioETHNumber}`;
    if (precioETHNumber < precioActualETH) {
      precioEthereum.style.color = "rgb(252, 49, 49)";
      precioActualETH = precioETHNumber;
    } else {
      precioEthereum.style.color = "rgb(46, 207, 46)";
      precioActualETH = precioETHNumber;
    }
  }

  // XRP
  if (!isNaN(precioXRPNUMBER)) {
    precioXRP.textContent = `$ ${precioXRPNUMBER}`;
    if (precioXRPNUMBER < precioActualXRP) {
      precioXRP.style.color = "rgb(252, 49, 49)";
      precioActualXRP = precioXRPNUMBER;
    } else {
      precioXRP.style.color = "rgb(46, 207, 46)";
      precioActualXRP = precioXRPNUMBER;
    }
  }

  // ADA
  if (!isNaN(precioADANUMBER)) {
    precioADA.textContent = `$ ${precioADANUMBER}`;
    if (precioADANUMBER < precioActualADA) {
      precioADA.style.color = "rgb(252, 49, 49)";
      precioActualADA = precioADANUMBER;
    } else {
      precioADA.style.color = "rgb(46, 207, 46)";
      precioActualADA = precioADANUMBER;
    }
  }

  // XMR
  if (!isNaN(precioXMRNumber)) {
    precioXMR.textContent = `$ ${precioXMRNumber}`;
    if (precioXMRNumber < precioActualXMR) {
      precioXMR.style.color = "rgb(252, 49, 49)";
      precioActualXMR = precioXMRNumber;
    } else {
      precioXMR.style.color = "rgb(46, 207, 46)";
      precioActualXMR = precioXMRNumber;
    }
  }
});
