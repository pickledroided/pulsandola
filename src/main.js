import './style.css'

const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY'
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="container">
    <header>
      <h1>Cosmic Pulse</h1>
      <p class="subtitle">Exploring the universe, one day at a time</p>
    </header>
    <main id="content">
      <div class="loader">
        <div class="spinner"></div>
        <p>Retrieving daily cosmic transmission...</p>
      </div>
    </main>
  </div>
`

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  })
  .then(data => {
    const content = document.querySelector('#content')
    
    let mediaHtml = ''
    if (data.media_type === 'image') {
      mediaHtml = `<img src="${data.hdurl || data.url}" alt="${data.title}" class="apod-media-element" />`
    } else if (data.media_type === 'video') {
      mediaHtml = `
        <div class="video-container">
          <iframe src="${data.url}" frameborder="0" allowfullscreen class="apod-video"></iframe>
        </div>
      `
    }

    content.innerHTML = `
      <div class="apod-card">
        <div class="apod-media">
          ${mediaHtml}
        </div>
        <div class="apod-info">
          <span class="apod-date">${data.date}</span>
          <h2 class="apod-title">${data.title}</h2>
          <p class="apod-explanation">${data.explanation}</p>
          ${data.copyright ? `<span class="apod-copyright">© ${data.copyright}</span>` : ''}
        </div>
      </div>
    `
  })
  .catch(err => {
    console.log(err)
    const content = document.querySelector('#content')
    content.innerHTML = `
      <div class="error-card">
        <h2>Connection Lost</h2>
        <p>Failed to retrieve data.  check API key.</p>
        <code class="error-details">${err.message || err}</code>
      </div>
    `
  })
