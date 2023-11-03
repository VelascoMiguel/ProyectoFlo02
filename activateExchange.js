const activateExchange = document.getElementById("activate-exchange");
const containerExchange = document.getElementById("exchange");
const crossClose = document.getElementById("fa-xmark");

activateExchange.addEventListener("click", function (e) {
  containerExchange.style.display = "flex";
});

crossClose.addEventListener("click", function (e) {
  containerExchange.style.display = "none";
});
