import React from 'react'
import { createRoot } from 'react-dom/client'
import SideRays from './SideRays.jsx'
import './style.css'

const sideRaysRoot = document.getElementById('siderays-root')
if (sideRaysRoot) {
  createRoot(sideRaysRoot).render(
    <React.StrictMode>
      <SideRays speed={2.5} rayColor1="#EAB308" rayColor2="#96c8ff" />
    </React.StrictMode>
  )
}

const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY'
const app = document.querySelector('#app')
const datepicker = document.querySelector('#datepicker')

app.innerHTML = `
  <div class="container">
    <header>
      <h1>Pulsandola</h1>
      <p class="subtitle">Mi piacciono le stelle</p>
    </header>
    <main id="content">
      <div class="loader">
        <div class="spinner"></div>
        <p>Contando le stelle...</p>
      </div>
    </main>
  </div>
`

const today = new Date().toISOString().split('T')[0]
datepicker.value = today
datepicker.max = today

function fetchApod(date) {
  const content = document.querySelector('#content')
  content.innerHTML = `
    <div class="loader">
      <div class="spinner"></div>
      <p>Origliando quello che dice la nasa oggi ${date}...</p>
    </div>
  `

  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .then(data => {
      let mediaHtml = ''
    if (data.media_type === 'image') {
      mediaHtml = `<img src="${data.hdurl || data.url}" alt="${data.title}" class="apod-media-element" />`
    } else if (data.media_type === 'video' && (data.url.includes('youtube.com') || data.url.includes('vimeo.com'))) {
      mediaHtml = `
        <div class="video-container">
          <iframe src="${data.url}" frameborder="0" allowfullscreen class="apod-video"></iframe>
        </div>
      `
    } else if (data.media_type === 'video') {
      mediaHtml = `
        <div class="video-container">
          <video src="${data.url}" controls class="apod-video"></video>
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
      content.innerHTML = `
        <div class="error-card">
          <h2>Connection Lost</h2>
          <p>Non sento la nasa. Controlla la api key.</p>
          <code class="error-details">${err.message || err}</code>
        </div>
      `
    })
}

fetchApod(datepicker.value)

datepicker.addEventListener('change', (e) => {
  if (e.target.value) {
    fetchApod(e.target.value)
  }
})
