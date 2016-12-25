const MAX_ITEMS = 31;
const CURRENT_VERSION = chrome.app.getDetails().version;
const PREV_VERSION = '';

class TodayIsAGoodDay {
  initialize() {
    chrome.storage.sync.get({
      useQuote: true,
      useFilmEffect: true,
      useAutoColor: false,
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
    localStorage.setItem(`2day_${CURRENT_VERSION}`, data);
  }

  getExtData() {
    return localStorage.getItem(`2day_${CURRENT_VERSION}`);
  }

  removePrevVersionData() {
    let prevVersion;
    if (PREV_VERSION) {
      prevVersion = `2day_${CURRENT_VERSION}`;
    } else {
      prevVersion = '2day';
    }
    if (localStorage.getItem(prevVersion)) {
      localStorage.removeItem(prevVersion);
    }
  }

  runBackGroundCheck() {
    // Check background light or dark
    BackgroundCheck.init({
      targets: '.main',
      images: '.wallpaper',
    });
  }

  render({ data, opts }) {
    const { useQuote, useFilmEffect, useAutoColor } = opts;
    const currentDate = new Date().toJSON().slice(0, 10);
    const todayData = data[currentDate];

    if (useQuote) {
      document.getElementsByClassName('quote-text')[0].innerHTML = `“${todayData.quote.quote}”`;
      document.getElementsByClassName('quote-author')[0].innerHTML = `ー ${todayData.quote.author}`;
    }

    if (!useFilmEffect) {
      document.getElementsByClassName('overlay')[0].classList.add('hide');
    }

    const wallpaperElement = document.getElementsByClassName('wallpaper')[0];
    wallpaperElement.style.background = `url(${todayData.collection})`;
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
    const fetchedData = this.getExtData();
    const currentTime = new Date().getTime();
    const cacheExpiration = 86400 * 1000 * MAX_ITEMS;
    let shouldFetch = false;
    let data;

    if (!fetchedData || !lastFetched || ((currentTime - lastFetched) > cacheExpiration)) {
      shouldFetch = true;
    }

    if (shouldFetch) {
      this.removePrevVersionData();

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
          data = this.getNextDatesData(json);
          this.setExtData(JSON.stringify(data));
          this.render({ data, opts });
          this.setLastFetched();
        }
      })
      .catch((e) => {
        throw e;
      });
    } else {
      data = JSON.parse(fetchedData);
      this.render({ data, opts });
    }
  }

  getNextDatesData(data) {
    const dates = {};
    const { collections, quotes } = data;

    [...Array(MAX_ITEMS)].forEach((_, i) => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      const nextDate = currentDate.toJSON().slice(0, 10);
      dates[nextDate] = { collection: collections[i], quote: quotes[i] };
    });

    return dates;
  }
}

document.querySelector('.setting-button').addEventListener('click', () => {
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
