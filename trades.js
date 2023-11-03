// index.js (Frontend JavaScript)

document.addEventListener("DOMContentLoaded", () => {
  // Obtener una referencia al elemento donde deseas mostrar los datos
  const transaccionContainer = document.getElementById("transaccions");

  // Realizar una solicitud HTTP al servidor para obtener los datos de los trades
  fetch("http://localhost:8080/getTrades")
    .then((response) => response.json())
    .then((data) => {
      // Procesar los datos y mostrarlos en la página
      data.forEach((trade) => {
        const rowTransaction = document.createElement("div");
        rowTransaction.classList.add("row-transaction");

        const currency = document.createElement("p");
        currency.id = "detail-transaction";
        currency.textContent = "Bitcoin";

        const id = document.createElement("p");
        id.id = "detail-transaction";
        id.textContent = `${trade.id}`;

        const price = document.createElement("p");
        price.id = "detail-transaction";
        const formattedPrice = parseFloat(trade.price).toFixed(2);
        price.textContent = `$${formattedPrice}`;

        const quantity = document.createElement("p");
        quantity.id = "detail-transaction";
        quantity.textContent = `${trade.qty}`;
        quantity.style.color = "blue";
        quantity.style.fontWeight = "bold";

        const fechaActual = new Date();

        // Obtener los componentes de la fecha (día, mes y año)
        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
        const anio = fechaActual.getFullYear();

        // Formatear la fecha en el formato "dd/mm/yyyy"
        const fechaFormateada = `${dia}/${mes}/${anio}`;

        const date = document.createElement("p");
        date.id = "detail-transaction";
        date.textContent = fechaFormateada;

        rowTransaction.appendChild(currency);
        rowTransaction.appendChild(id);
        rowTransaction.appendChild(price);
        rowTransaction.appendChild(date);
        rowTransaction.appendChild(quantity);

        transaccionContainer.appendChild(rowTransaction);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

//, Quantity: ${trade.qty}
