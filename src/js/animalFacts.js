const facts = [
  {
    fact: "i punguini sono necrofili e fanno le orge (avvolte anche pedofili).",
    image: "animali/pinguini.png"
  },
  {
    fact: "gli ippopotami spruzzano i loro escrementi per far eccitare le donne + sudano rosso.",
    image: "animali/ippopotami.png"
  },
  {
    fact: "gli orsi polari in realtà sono neri ma coprono il loro colore con i peli bianchi + hanno la lingua blu",
    image: "animali/orso.png"
  },
  {
    fact: "i kiwi si sono estinti perchè davanti ai loro predatori stavano fermi per farci amicizia.",
    image: "animali/kiwi.png"
  }
]

function getDailyIndex() {
  const today = new Date().toISOString().split('T')[0]
  const hash = [...today].reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return hash % facts.length
}

export function initAnimalFacts() {
  const container = document.getElementById('animal-fact-widget')
  if (!container) return

  const item = facts[getDailyIndex()]
  const imgSrc = import.meta.env.BASE_URL + item.image

  container.innerHTML = `
    <div class="animal-fact-content">
      <img src="${imgSrc}" alt="" class="animal-fact-image" loading="lazy" />
      <div class="nasa-info">
        <span class="nasa-date">Geopask</span>
        <h4 class="nasa-title animal-fact-text">${item.fact}</h4>
      </div>
    </div>
  `
}
