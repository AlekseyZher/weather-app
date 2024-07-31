const apiKey = "5027116587b048b385a130941242807";

const formNode = document.querySelector("#form");
const inputNode = document.querySelector("#input");
const header = document.querySelector(".header");

function removeCard() {
  const prevCard = document.querySelector(".card");
  if (prevCard) {
    prevCard.remove();
  }
}

function showMessage() {
  const error = `<div class='card'>Такого города не существует</div>`;
  header.insertAdjacentHTML("afterend", error);
}

function showCard({ name, country, temp, condition }) {
  const html = /*html*/ `
  <div class="card">
   <h2 class="card-city">${name} <span>${country}</span></h2>
   <div class="card-weather">
    <div class="card-value">${temp}<span>&degC</span></div>
    <img class="card-img" src="" alt="weather" />
   </div>
   <div class="card-desc">${condition}</div>
 </div>`;

  header.insertAdjacentHTML("afterend", html);
}

async function getWeather(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=ru`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Слушаем отправку формы

formNode.onsubmit = async function (e) {
  // Отмена отправки формы
  e.preventDefault();
  // Удаляем старые карточки
  removeCard();
  // Получаем название города
  let city = inputNode.value.trim();
  // Получаем данные с сервера
  const data = await getWeather(city);
  // Отображаем данные
  if (data.error) {
    showMessage();
  } else {
    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.condition.text,
    };

    showCard(weatherData);
  }
  inputNode.value = "";
};
