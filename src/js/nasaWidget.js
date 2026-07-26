const API_KEY = 'DEMO_KEY';

function fetchApod(date) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}${date ? `&date=${date}` : ''}`;
  return fetch(url).then(r => r.ok ? r.json() : r.json().then(e => { throw new Error(e.msg || e.error?.message || `HTTP ${r.status}`); }))
    .catch(() => fetch(`https://corsproxy.io/?url=${encodeURIComponent(url)}`).then(r => r.ok ? r.json() : Promise.reject()));
}

export function initNasaWidget() {
  const container = document.getElementById('nasa-widget');
  if (!container) return;

  const today = new Date().toISOString().split('T')[0];
  const knownDate = '2024-07-24';

  fetchApod(today)
    .catch(() => fetchApod(knownDate))
    .then(data => {
      if (!data) return;
      let mediaHtml = '';
      if (data.media_type === 'image') {
        mediaHtml = `<img src="${data.url}" alt="${data.title}" class="nasa-media" />`;
      } else {
        mediaHtml = `<iframe src="${data.url}" class="nasa-media" frameborder="0" allowfullscreen></iframe>`;
      }

      container.innerHTML = `
        <div class="nasa-content">
          ${mediaHtml}
          <div class="nasa-info">
            <span class="nasa-date">${data.date}</span>
            <h4 class="nasa-title">${data.title}</h4>
            <p class="nasa-explanation">${data.explanation}</p>
            ${data.copyright ? `<span class="nasa-copyright">© ${data.copyright}</span>` : ''}
          </div>
        </div>
      `;
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = `
        <div class="nasa-error" style="padding: 1rem; color: #ef4444; text-align: center;">
          <h4 style="margin-bottom: 0.5rem;">Errore APOD</h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">${err.message}</p>
        </div>
      `;
    });
}
