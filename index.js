const apiKey = "5027116587b048b385a130941242807";

// Получаем название города

const formNode = document.querySelector("#form");
const inputNode = document.querySelector("#input");
const header = document.querySelector(".header");

// Слушаем отправку формы

formNode.onsubmit = function (e) {
  // Отмена отправки формы
  e.preventDefault();
  let city = "";
  city = inputNode.value.trim();

  const error = document.querySelector(".err");
  if (error) {
    error.remove();
  }
  const prevCard = document.querySelector(".card");
  if (prevCard) {
    prevCard.remove();
  }

  //   Делаем запрос на сервер
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=ru`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        header.insertAdjacentHTML(
          "afterend",
          `<h3 class='err'>Такого города не существует</h3>`
        );
      }
      //   console.log(data);
      //   console.log(data.current.condition.text);
      //   console.log(data.current.temp_c);
      //   console.log(data.location.name);
      //   console.log(data.location.country);

      //   Отображаем полученные данные в карточке
      const html = /*html*/ `
        <div class="card">
         <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>
         <div class="card-weather">
          <div class="card-value">${data.current.temp_c}<span>&degC</span></div>
          <img class="card-img" src="" alt="weather" />
         </div>
         <div class="card-desc">${data.current.condition.text}</div>
       </div>`;

      header.insertAdjacentHTML("afterend", html);
    });

  inputNode.value = "";
};
