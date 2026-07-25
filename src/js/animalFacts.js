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
  },
  {
    fact: "questo è lo scarabeo stercorario lui per girare la sua pallina di merda si orienta con la via lattea, sono gli unici a percepire così bene la fascia luminosa della via lattea!",
    image: "animali/scarabeo.jpg"
  },
  {
    fact: "sti fottutissimi alberi parlano tra di loro per segnalare un pericolo vicino del tipo che ci sono dei parassiti o per aiutare gli alberi piccoli a crescere e passarsi i nutrienti a vicenda è sta minchiata si chiama 'Wood Wide Web' praticamente sono dei funghi microscopici che creano sta minchia di rete per comunicare con gli altri alberi!",
    image: "animali/arburi.png"
  },
  {
    fact: "Le renne a volte mangiano spontaneamente un fungo chiamato Amanita muscaria. Questo fungo contiene sostanze che agiscono sul sistema nervoso. e sti figli di puttana si bevono la propria pipì oppure impazziscono e saltano qua e là come delle ranocchie e in più fanno sesso gay da fatti e dopo si ammazzano a vicenda.",
    image: "animali/renne.png"
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
