'use strict';

// TODO Load it from my server
const DATA = {
  collections: [
    'https://source.unsplash.com/collection/403069',
    'https://source.unsplash.com/collection/460289',
    'https://source.unsplash.com/collection/138584',
    'https://source.unsplash.com/collection/179299',
  ],
  quotes: [
    {
      quote: 'Whatever you are, <br />be a good one.',
      author: 'Abraham Lincoln',
    },
    {
      quote: 'If you dream it, <br />you can do it.',
      author: 'Walt Disney',
    },
    {
      quote: 'Never, <br />never, <br />never give up.',
      author: 'Winston Churchill',
    },
    {
      quote: 'Don’t wait. <br />The time will never be just right.',
      author: 'Napoleon Hill',
    },
    {
      quote: 'If not us, who? <br />If not now, when?',
      author: 'John F. Kennedy',
    },
    {
      quote: 'Wherever you go, <br />go with all your heart.',
      author: 'Confucius',
    },
    {
      quote: 'Believe you can and you’re halfway there.',
      author: 'Theodore Roosevelt',
    },
    {
      quote: 'To be the best, <br />you must be able to handle the worst.',
      author: 'Wilson Kanadi',
    },
    {
      quote: 'Ever tried. Ever failed. <br />No matter. Try Again. <br />Fail again. Fail better.',
      author: 'Samuel Beckett',
    },
    {
      quote: 'The journey of a thousand miles begins with one step.',
      author: 'Lao Tzu',
    },
    {
      quote: 'You must be the change you wish to see in the world.',
      author: 'Gandhi',
    },
    {
      quote: 'Keep your face to the sunshine <br />and you can never see the shadow.',
      author: 'Helen Keller',
    },
    {
      quote: 'The power of imagination makes us infinite.',
      author: 'John Muir',
    },
    {
      quote: 'The best dreams happen when you’re awake.',
      author: 'Cherie Gilderbloom',
    },
    {
      quote: 'Once you choose hope, <br />anything’s possible.',
      author: 'Christopher Reeve',
    },
    {
      quote: 'Don’t count the days, <br />make the days count.',
      author: 'Muhammad Ali',
    },
    {
      quote: 'The difference <br />between <br />ordinary and extraordinary <br />is <br />that little extra.',
      author: 'Jimmy Johnson',
    },
    {
      quote: 'Everything you’ve ever wanted is on the other side of fear.',
      author: 'George Addair',
    },
    {
      quote: 'A year from now <br />you may wish you had started today.',
      author: 'Karen Lamb',
    },
    {
      quote: 'If there is no struggle, <br />there is no progress.',
      author: 'Frederick Douglass',
    },
    {
      quote: 'To avoid criticism, <br />do nothing, <br />say nothing, <br />be nothing.',
      author: 'Elbert Hubbard',
    },
    {
      quote: 'The more I want to get something done, <br />the less I call it work.',
      author: 'Richard Bach',
    },
    {
      quote: 'The purpose of our lives is to be happy.',
      author: 'Dalai Lama',
    },
    {
      quote: 'The price of anything is the amount of life you exchange for it.',
      author: 'Henry David Thoreau',
    },
    {
      quote: 'Someday is not a day of the week.',
      author: 'Denise Brennan-Nelson',
    },
    {
      quote: 'If you can’t outplay them, <br />outwork them.',
      author: 'Ben Hogan',
    }
  ]
};

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

function setSettings({ loadImage }) {
  localStorage.setItem('loadImage', loadImage);
}

function loadSettings({ loadImage }) {
  return localStorage.getItem('loadImage');
}

document.addEventListener('DOMContentLoaded', () => {
  const wallpaperElement = document.getElementsByClassName('wallpaper')[0];
  const { collections, quotes } = DATA;

  const currentCollectionIndex = getRandomInt(0, collections.length - 1);
  const currentQuoteIndex = getRandomInt(0, quotes.length - 1);
  const currentQuote = quotes[currentQuoteIndex];
  document.getElementsByClassName('quote-text')[0].innerHTML = `“${currentQuote.quote}”`;
  document.getElementsByClassName('quote-author')[0].innerHTML = `ー ${currentQuote.author}`;

  wallpaperElement.style.background = `url(${collections[currentCollectionIndex]})`;
  wallpaperElement.style.backgroundSize = 'cover';
});
