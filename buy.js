const whereToBuy = document.getElementById("activate-list-buy");
const listLinksToBuy = document.getElementById("places-to-buy");

whereToBuy.addEventListener("mouseenter", function (e) {
  let styleListBuy = window.getComputedStyle(listLinksToBuy);
  listLinksToBuy.style.display = "block";
});

whereToBuy.addEventListener("mouseleave", function (e) {
  listLinksToBuy.style.display = "block";
  let styleListBuy = window.getComputedStyle(listLinksToBuy);
});

listLinksToBuy.addEventListener('mouseleave', function(e) {
    listLinksToBuy.style.display = "none";

})
