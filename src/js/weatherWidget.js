export function initWeather() {
  const cities = [
    { name: 'Catania', lat: 37.5022, lon: 15.0873 },
    { name: 'Palermo', lat: 38.1157, lon: 13.3615 },
    { name: 'Messina', lat: 38.1938, lon: 15.5540 },
    { name: 'Siracusa', lat: 37.0755, lon: 15.2866 },
    { name: 'Enna', lat: 37.5677, lon: 14.2792 },
    { name: 'Trapani', lat: 38.0176, lon: 12.5366 },
    { name: 'Agrigento', lat: 37.3107, lon: 13.5761 },
    { name: 'Caltanissetta', lat: 37.4901, lon: 14.0515 },
    { name: 'Ragusa', lat: 36.9269, lon: 14.7264 },
  ];

  const lats = cities.map(c => c.lat).join(',');
  const lons = cities.map(c => c.lon).join(',');

  const list = document.getElementById('weather-list');
  if (!list) return;

  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current=temperature_2m`)
    .then(r => r.json())
    .then(data => {
      const temps = data.map((d, i) => ({ name: cities[i].name, temp: d.current.temperature_2m }));
      temps.sort((a, b) => b.temp - a.temp);

      const top4 = temps.slice(0, 4);
      const enna = temps.find(t => t.name === 'Enna');
      const top5 = top4.some(t => t.name === 'Enna') ? temps.slice(0, 5) : [...top4, enna];

      list.innerHTML = top5.map((city, i) => `
        <div class="weather-city">
          <span class="weather-rank">#${i + 1}</span>
          <span class="weather-city-name">${city.name}</span>
          <span class="weather-city-temp">${city.temp.toFixed(1)}°C</span>
        </div>
      `).join('');
    })
    .catch(() => {
      list.innerHTML = '<div class="weather-error">Errore caricamento</div>';
    });
}
