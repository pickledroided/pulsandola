const backgrounds = [
  { id: 'galassia', name: 'Galassia', gradient: 'radial-gradient(circle at center, #1b122c 0%, #080510 100%)', type: 'gradient' },
  { id: 'dither', name: 'Dither', type: 'dither' },
]

const STORAGE_KEY = 'pulse-bg'

function getSaved() {
  try { return localStorage.getItem(STORAGE_KEY) || 'galassia' } catch { return 'galassia' }
}

function saveBg(id) {
  try { localStorage.setItem(STORAGE_KEY, id) } catch {}
}

function applyBg(id, updateToggle = true) {
  const bg = backgrounds.find(b => b.id === id)
  if (!bg) return
  const sideraysRoot = document.getElementById('siderays-root')
  const ditherRoot = document.getElementById('dither-bg')

  if (bg.type === 'gradient') {
    document.body.style.background = bg.gradient
    if (sideraysRoot) sideraysRoot.style.display = ''
    if (ditherRoot) ditherRoot.style.display = 'none'
  } else if (bg.type === 'dither') {
    document.body.style.background = '#000'
    if (sideraysRoot) sideraysRoot.style.display = 'none'
    if (ditherRoot) ditherRoot.style.display = ''
  }

  if (updateToggle) {
    const toggle = document.getElementById('bg-toggle-text')
    if (toggle) toggle.textContent = bg.name
    const menu = document.getElementById('bg-dropdown-menu')
    if (menu) {
      menu.querySelectorAll('.bg-dropdown-item').forEach(el => {
        el.classList.toggle('active', el.dataset.bg === id)
      })
    }
  }
}

function toggleDropdown() {
  const menu = document.getElementById('bg-dropdown-menu')
  const toggle = document.getElementById('bg-dropdown-toggle')
  if (menu) {
    menu.classList.toggle('open')
    if (toggle) toggle.classList.toggle('open')
  }
}

function closeDropdown() {
  const menu = document.getElementById('bg-dropdown-menu')
  if (menu) menu.classList.remove('open')
}

export function initBackgrounds() {
  const container = document.getElementById('bg-selector')
  if (!container) return

  const toggle = document.createElement('button')
  toggle.className = 'bg-dropdown-toggle'
  toggle.id = 'bg-dropdown-toggle'
  toggle.innerHTML = '<span id="bg-toggle-text">Galassia</span> <span class="bg-arrow">▾</span>'
  toggle.addEventListener('click', (e) => {
    e.stopPropagation()
    toggleDropdown()
  })
  container.appendChild(toggle)

  const menu = document.createElement('div')
  menu.className = 'bg-dropdown-menu'
  menu.id = 'bg-dropdown-menu'
  container.appendChild(menu)

  backgrounds.forEach(bg => {
    const item = document.createElement('button')
    item.className = 'bg-dropdown-item'
    item.dataset.bg = bg.id

    const preview = document.createElement('span')
    preview.className = 'bg-preview'
    if (bg.type === 'gradient') {
      preview.style.background = bg.gradient
    } else {
      preview.style.background = '#222'
    }
    item.appendChild(preview)

    const label = document.createElement('span')
    label.textContent = bg.name
    item.appendChild(label)

    item.addEventListener('click', (e) => {
      e.stopPropagation()
      saveBg(bg.id)
      applyBg(bg.id)
      closeDropdown()
    })
    menu.appendChild(item)
  })

  document.addEventListener('click', closeDropdown)

  applyBg(getSaved())
}
