'use strict';

// TODO Load it from my server
const DEFAULT_URL = 'https://source.unsplash.com/collection/171168';
const DEFAULT_QUOTES = [
  {
    quote: 'Whatever you are, be a good one.',
    author: 'Abraham Lincoln',
  },
  {
    quote: 'If you dream it, you can do it.',
    author: 'Walt Disney',
  },
  {
    quote: 'Never, never, never give up.',
    author: 'Winston Churchill',
  },
  {
    quote: 'Don’t wait. The time will never be just right.',
    author: 'Napoleon Hill',
  },
  {
    quote: 'If not us, who? If not now, when?',
    author: 'John F. Kennedy',
  },
  {
    quote: 'Wherever you go, go with all your heart.',
    author: 'Confucius',
  },
  {
    quote: 'Believe you can and you’re halfway there.',
    author: 'Theodore Roosevelt',
  },
  {
    quote: 'To be the best, you must be able to handle the worst.',
    author: 'Wilson Kanadi',
  },
  {
    quote: 'Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.',
    author: 'Samuel Beckett',
  },
];

function createRequest(url, xhrCallback) {
  const request = new XMLHttpRequest();
  let response;
  request.open('GET', url);
  request.onload = xhrCallback.bind(this, request);
  request.send();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener('DOMContentLoaded', () => {
  const wallpaperElement = document.getElementsByClassName('wallpaper')[0];
  wallpaperElement.style.background = `url(${DEFAULT_URL})`;
  wallpaperElement.style.backgroundSize = 'cover';

  const imgLoaded = imagesLoaded('.wallpaper', { background: true }, () => {
    const currentQuoteIndex = getRandomInt(0, DEFAULT_QUOTES.length - 1);
    const currentQuote = DEFAULT_QUOTES[currentQuoteIndex];
    document.getElementsByClassName('quote-text')[0].innerHTML = currentQuote.quote;
    document.getElementsByClassName('quote-author')[0].innerHTML = `ー ${currentQuote.author}`;
  });

  imgLoaded.on('fail', instance => {
    // What should I do?
  });
});
