class TodayIsAGoodDay {
  initialize() {
    chrome.storage.sync.get({
      useQuote: true,
      useFilmEffect: true,
      useAutoColor: false
    }, opts => this.run(opts));
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setLastFetched() {
    localStorage.setItem('lastFetch', new Date().getTime().toString());
  }

  getLastFetched() {
    return localStorage.getItem('lastFetch');
  }

  setExtData(data) {
    localStorage.setItem('2day', data);
  }

  getExtData() {
    return localStorage.getItem('2day');
  }

  runBackGroundCheck() {
    // Check background light or dark
    BackgroundCheck.init({
      targets: '.main',
      images: '.wallpaper'
    });
  }

  render({ data, opts }) {
    const { collections, quotes } = data;
    const { useQuote, useFilmEffect, useAutoColor } = opts;

    if (useQuote) {
      const currentQuoteIndex = this.getRandomInt(0, quotes.length - 1);
      const currentQuote = quotes[currentQuoteIndex];
      document.getElementsByClassName('quote-text')[0].innerHTML = `“${currentQuote.quote}”`;
      document.getElementsByClassName('quote-author')[0].innerHTML = `ー ${currentQuote.author}`;
    }

    if (!useFilmEffect) {
      document.getElementsByClassName('overlay')[0].classList.add('hide');
    }

    const wallpaperElement = document.getElementsByClassName('wallpaper')[0];
    const currentCollectionIndex = this.getRandomInt(0, collections.length - 1);
    wallpaperElement.style.background = `url(${collections[currentCollectionIndex]})`;
    wallpaperElement.style.backgroundSize = 'cover';
    wallpaperElement.style.backgroundColor = 'transparent';
    wallpaperElement.style.backgroundPosition = 'center center';
    wallpaperElement.style.backgroundRepeat = 'no-repeat';

    if (useQuote && useAutoColor) {
      this.runBackGroundCheck();
    }
  }

  run(opts) {
    const API_URL = 'https://api.huynq.net/2day.php';
    const lastFetched = this.getLastFetched();
    const currentTime = new Date().getTime();
    const cacheExpiration = 86400 * 1;
    let shouldFetch = false;
    let data;

    if (!lastFetched || ((currentTime - lastFetched) > cacheExpiration)) {
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
          this.setExtData(JSON.stringify(json));
          this.render({ data: json, opts });
          this.setLastFetched();
        }
      })
      .catch((e) => {
        throw e;
      });
    } else {
      data = this.getExtData();
      this.render({ data: JSON.parse(data), opts });
    }
  }
}

document.querySelector('.setting-button').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    // New way to open options pages, if supported (Chrome 42+).
    chrome.runtime.openOptionsPage();
  } else {
    // Reasonable fallback.
    window.open(chrome.runtime.getURL('options.html'));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const todayExt = new TodayIsAGoodDay();
  todayExt.initialize();
});
