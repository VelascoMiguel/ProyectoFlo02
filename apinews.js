fetch("https://proyectoflo02-dev-fnbz.3.us-1.fl0.io:8080/getNews")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((news) => {
      const containerSlider = document.getElementById("slider");

      const liSlide = document.createElement("li");
      liSlide.classList.add("slide");
      const cardNews = document.createElement("div");
      cardNews.classList.add("card-news");
      const imgNew = document.createElement("img");
      imgNew.src = news.urlToImage;
      imgNew.classList.add('img-new');
      const titleNew = document.createElement("a");
      titleNew.href = news.url;
      titleNew.target = "blank";
      titleNew.style.textDecoration = 'none';
      titleNew.style.color = '#fff';
      titleNew.textContent = news.title;
      titleNew.style.fontWeight = 'bold';
      const descriptionNew = document.createElement("p");
      descriptionNew.textContent = news.description;
      descriptionNew.style.color = 'rgb(179, 173, 173)';

      cardNews.appendChild(imgNew);
      cardNews.appendChild(titleNew);
      cardNews.appendChild(descriptionNew);
      liSlide.appendChild(cardNews);
      containerSlider.appendChild(liSlide);
    });

    const slider = document.querySelector(".slider");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const slideWidth = slider.querySelector(".slide").clientWidth;

    let currentIndex = 0;

    // Funciones de movimiento del slider
    const moveLeft = () => {
      if (currentIndex > 0) {
        currentIndex--;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      }
    };

    const moveRight = () => {
      const maxIndex = slider.querySelectorAll(".slide").length - 1;
      if (currentIndex < maxIndex) {
        currentIndex++;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      }
    };

    // Agregar listeners a los botones
    prevBtn.addEventListener("click", moveLeft);
    nextBtn.addEventListener("click", moveRight);
  });

// document.addEventListener("DOMContentLoaded", () => {
//   const slider = document.querySelector(".slider");
//   const prevBtn = document.getElementById("prevBtn");
//   const nextBtn = document.getElementById("nextBtn");

//   const slideWidth = slider.querySelector(".slide").clientWidth; // Cambio en esta línea

//   let currentIndex = 0;

//   // Función para mover el slider a la izquierda
//   const moveLeft = () => {
//     if (currentIndex > 0) {
//       currentIndex--;
//       slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
//     }
//   };

//   // Función para mover el slider a la derecha
//   const moveRight = () => {
//     const maxIndex = slider.querySelectorAll(".slide").length - 1;
//     if (currentIndex < maxIndex) {
//       currentIndex++;
//       slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
//     }
//   };

//   // Agregar listeners a los botones
//   prevBtn.addEventListener("click", moveLeft);
//   nextBtn.addEventListener("click", moveRight);
// });
