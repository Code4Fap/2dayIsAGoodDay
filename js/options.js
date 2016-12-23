// Saves options to chrome.storage.sync.
function saveOptions() {
  const useQuote = document.getElementById('use-quote').checked;
  const useFilmEffect = document.getElementById('use-film').checked;
  const useAutoColor = document.getElementById('use-auto-color').checked;

  chrome.storage.sync.set({
    useQuote,
    useFilmEffect,
    useAutoColor,
  }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get({
    useQuote: true,
    useFilmEffect: true,
    useAutoColor: false
  }, items => {
    document.getElementById('use-quote').checked = items.useQuote;
    document.getElementById('use-film').checked = items.useFilmEffect;
    document.getElementById('use-auto-color').checked = items.useAutoColor;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
