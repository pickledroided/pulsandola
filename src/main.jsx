import React from 'react'
import { createRoot } from 'react-dom/client'
import SideRays from './SideRays.jsx'
import Dither from './components/Dither.jsx'
import './style.css'

const sideRaysRoot = document.getElementById('siderays-root')
if (sideRaysRoot) {
  createRoot(sideRaysRoot).render(
    <React.StrictMode>
      <SideRays speed={2.5} rayColor1="#EAB308" rayColor2="#96c8ff" />
    </React.StrictMode>
  )
}

const ditherRoot = document.getElementById('dither-bg')
if (ditherRoot) {
  createRoot(ditherRoot).render(
    <React.StrictMode>
      <Dither
        waveSpeed={0.07}
        waveFrequency={7.5}
        waveAmplitude={0.14}
        waveColor={[0.3, 0.5, 0.8]}
        colorNum={8}
        pixelSize={2}
        disableAnimation={false}
        enableMouseInteraction={true}
        mouseRadius={0.3}
      />
    </React.StrictMode>
  )
}

import { initAnimalFacts } from './js/animalFacts.js'
import { initNasaWidget } from './js/nasaWidget.js'
import { initBookmarks } from './js/bookmarks.js'
import { initBlackjack } from './js/blackjack.js'
import { initBackgrounds } from './js/backgrounds.js'

document.addEventListener('DOMContentLoaded', () => {
  initAnimalFacts();
  initNasaWidget();
  initBookmarks();
  initBlackjack();
  initBackgrounds();
});
