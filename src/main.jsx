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

import { initAnimalFacts } from './js/animalFacts.js'
import { initNasaWidget } from './js/nasaWidget.js'
import { initBookmarks } from './js/bookmarks.js'
import { initBlackjack } from './js/blackjack.js'

document.addEventListener('DOMContentLoaded', () => {
  initAnimalFacts();
  initNasaWidget();
  initBookmarks();
  initBlackjack();
});
