const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
const server = http.createServer(app);
const axios = require("axios");
const wss = new WebSocket.Server({ server });
const wsCriptos = [
  {
    symbol: "btcusdt",
    ws: new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade"),
    lastPrice: 0,
  },
  {
    symbol: "ethusdt",
    ws: new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@trade"),
    lastPrice: 0,
  },
  {
    symbol: "xrpusdt",
    ws: new WebSocket("wss://stream.binance.com:9443/ws/xrpusdt@trade"),
    lastPrice: 0,
  },
  {
    symbol: "adausdt",
    ws: new WebSocket("wss://stream.binance.com:9443/ws/adausdt@trade"),
    lastPrice: 0,
  },
  {
    symbol: "xmrusdt",
    ws: new WebSocket("wss://stream.binance.com:9443/ws/xmrusdt@trade"),
    lastPrice: 0,
  },
];

const path = require("path"); // Importa el módulo "path" de Node.js
const { type } = require("os");
app.use(express.static(path.join(__dirname)));

app.get("/index.html", (req, res) => {
  // Envía el archivo HTML utilizando sendFile y la ruta completa
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/getTrades", async (req, res) => {
  const response = await axios.get("https://api.binance.com/api/v3/trades", {
    params: {
      symbol: "BTCUSDT",
      limit: 8,
    },
  });

  const trades = response.data;

  console.log(typeof(trades))

  res.json(trades);
});

app.get("/", async (req, res) => {
  try {
    const precioActualBTC = await obtenerPrecioCrypto(wsBTC); // Esperar a la resolución de la promesa
    const precioActualETH = await obtenerPrecioCrypto(wsETH);
    const precioActualXRP = await obtenerPrecioCrypto(wsXRP);
    const precioActualADA = await obtenerPrecioCrypto(wsADA);
    const precioActualXMR = await obtenerPrecioCrypto(wsXMR);

    res.json({
      precioBTC: precioActualBTC.price,
      precioETH: precioActualETH.price,
      precioXRP: precioActualXRP.price,
      precioADA: precioActualADA.price,
      precioXMR: precioActualXMR.price,
    });
  } catch (error) {
    console.error("Error al obtener el precio de BTC:", error);
    res.status(500).json({ error: "Error al obtener el precio de BTC" });
  }
});

// Configurar ruta para noticias :
app.get("/getNews", async (req, res) => {
  var url =
    "https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=popularity&apiKey=37624b13f09647d39d03de36d094307b";

  const response = await axios.get(url);
  const newsData = response.data.articles.slice(0, 7);

  res.json(newsData);
});

function obtenerPrecioCrypto(wsCripto) {
  return new Promise((resolve, reject) => {
    wsCripto.on("message", (data) => {
      const trade = JSON.parse(data);
      const price = trade.p;
      resolve({ price });
    });
  });
}

// Al recibir una actualización del precio de BTC, enviarla a todos los clientes
function enviarActualizacionPrecio(precio) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ precio }));
    }
  });
}

// Probando
// Manejo de actualizaciones de precios
wsCriptos.forEach(({ ws, symbol }) => {
  ws.on("message", (data) => {
    const trade = JSON.parse(data);
    const price = parseFloat(trade.p);

    if (!isNaN(price)) {
      const criptoInfo = wsCriptos.find((item) => item.ws === ws);
      const lastPrice = criptoInfo.lastPrice;

      criptoInfo.lastPrice = price;

      enviarActualizacionPrecio({
        [symbol]: price,
      });
    }
  });
});

// Simulando una actualización de precio cada 5 segundos
setInterval(async () => {
  try {
    for (const { ws } of wsCriptos) {
      await obtenerPrecioCrypto(ws);
    }
  } catch (error) {
    console.error("Error al obtener el precio de criptomonedas:", error);
  }
}, 10000);

server.listen(4544, () => {
  console.log("Servidor backend escuchando en el puerto 4544");
});

