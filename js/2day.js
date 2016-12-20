'use strict';

// TODO Load it from my server
const DATA = {
  imagesUrl: 'https://source.unsplash.com/collection/403069',
  quotes: [
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
    {
      quote: 'The journey of a thousand miles begins with one step.',
      author: 'Lao Tzu',
    },
    {
      quote: 'You must be the change you wish to see in the world.',
      author: 'Gandhi',
    },
    {
      quote: 'Keep your face to the sunshine and you can never see the shadow.',
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
      quote: 'Once you choose hope, anything’s possible.',
      author: 'Christopher Reeve',
    },
    {
      quote: 'Don’t count the days, make the days count.',
      author: 'Muhammad Ali',
    },
    {
      quote: 'The difference between ordinary and extraordinary is that little extra.',
      author: 'Jimmy Johnson',
    },
    {
      quote: 'Everything you’ve ever wanted is on the other side of fear.',
      author: 'George Addair',
    },
    {
      quote: 'A year from now you may wish you had started today.',
      author: 'Karen Lamb',
    },
    {
      quote: 'If there is no struggle, there is no progress.',
      author: 'Frederick Douglass',
    },
    {
      quote: 'To avoid criticism, do nothing, say nothing, be nothing.',
      author: 'Elbert Hubbard',
    },
    {
      quote: 'The more I want to get something done, the less I call it work.',
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
      quote: 'If you can’t outplay them, outwork them.',
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

document.addEventListener('DOMContentLoaded', () => {
  const wallpaperElement = document.getElementsByClassName('wallpaper')[0];
  const { imagesUrl, quotes } = DATA;
  wallpaperElement.style.background = `url(${imagesUrl})`;
  wallpaperElement.style.backgroundSize = 'cover';

  const imgLoaded = imagesLoaded('.wallpaper', { background: true }, () => {
    const currentQuoteIndex = getRandomInt(0, quotes.length - 1);
    const currentQuote = quotes[currentQuoteIndex];
    document.getElementsByClassName('quote-text')[0].innerHTML = `“${currentQuote.quote}”`;
    document.getElementsByClassName('quote-author')[0].innerHTML = `ー ${currentQuote.author}`;
  });

  imgLoaded.on('fail', instance => {
    // What should I do?
  });
});
