const FALLBACK = {
  date: '2026-07-25',
  title: 'Tranquility and Serenity',
  url: import.meta.env.BASE_URL + 'fallback-apod.jpg',
  media_type: 'image',
  explanation: 'The Seas of Tranquility and Serenity are calm today. They are actually lunar maria, ancient lava flows filling in large impact basins on the Moon. Also known by Latin names Mare Tranquillitatis and Mare Serenitatis, the smooth dark lunar seas are in stark contrast to the bright cratered lunar highlands surrounding them.',
  copyright: 'Nyêrdson Ferreira',
};

function renderApod(container, data) {
  const mediaHtml = data.media_type === 'video'
    ? `<video src="${data.url}" class="nasa-media" controls></video>`
    : `<img src="${data.url}" alt="${data.title}" class="nasa-media" />`;

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
}

export function initNasaWidget() {
  const container = document.getElementById('nasa-widget');
  if (!container) return;

  const today = new Date().toISOString().split('T')[0];

  fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${today}`)
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(data => { if (data) renderApod(container, data); })
    .catch(() => renderApod(container, FALLBACK));
}
