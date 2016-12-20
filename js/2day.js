'use strict';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setLastFetched() {
  const currentTime = new Date().getTime();
  localStorage.setItem('lastFetch', currentTime);
}

function getLastFetched() {
  return localStorage.getItem('lastFetch');
}

function setSettings(data) {
  localStorage.setItem('2day', data);
}

function getSettings() {
  return localStorage.getItem('2day');
}

function render(data) {
  const { collections, quotes } = data;
  const wallpaperElement = document.getElementsByClassName('wallpaper')[0];

  const currentCollectionIndex = getRandomInt(0, collections.length - 1);
  const currentQuoteIndex = getRandomInt(0, quotes.length - 1);
  const currentQuote = quotes[currentQuoteIndex];
  document.getElementsByClassName('quote-text')[0].innerHTML = `“${currentQuote.quote}”`;
  document.getElementsByClassName('quote-author')[0].innerHTML = `ー ${currentQuote.author}`;

  wallpaperElement.style.background = `url(${collections[currentCollectionIndex]})`;
  wallpaperElement.style.backgroundSize = 'cover';
  wallpaperElement.style.backgroundColor = 'transparent';
  wallpaperElement.style.backgroundPosition = 'center center';
  wallpaperElement.style.backgroundRepeat = 'no-repeat';
}

const API_URL = 'https://api.huynq.net/2day.php';
document.addEventListener('DOMContentLoaded', () => {
  const lastFetched = getLastFetched();
  const currentTime = new Date().getTime();
  let shouldFetch = false;
  let data;

  if (!lastFetched || (currentTime - lastFetched > 86400)) {
    shouldFetch = true;
  }

  if (shouldFetch) {
    fetch(API_URL)
    .then(response => {
      if (response.status === 204) {
        return { json: {}, response };
      }
      return response.json().then(json => ({ json, response })).catch((e) => {
        e.response = response;
        throw e;
      });
    })
    .then(({ json, response }) => {
      if (response.ok) {
        setSettings(JSON.stringify(json));
        render(json);
        setLastFetched();
      }
    })
    .catch((e) => {
      throw e;
    });
  } else {
    data = getSettings();
    render(JSON.parse(data));
  }
});
