const STORAGE_KEY = 'pulsandola_bookmarks';

export function initBookmarks() {
  const grid = document.getElementById('bookmarks-grid');
  const addBtn = document.getElementById('add-bookmark-btn');
  const modal = document.getElementById('add-bookmark-modal');
  const cancelBtn = document.getElementById('bm-cancel');
  const saveBtn = document.getElementById('bm-save');
  const nameInput = document.getElementById('bm-name');
  const urlInput = document.getElementById('bm-url');

  if (!grid || !modal) return;

  let bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  function renderBookmarks() {
    // Remove existing bookmarks except the add button
    const items = grid.querySelectorAll('.bookmark-item:not(.add-btn)');
    items.forEach(item => item.remove());

    bookmarks.forEach((bm, index) => {
      const a = document.createElement('a');
      a.href = bm.url;
      a.className = 'bookmark-item';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';

      const img = document.createElement('img');
      img.src = `https://s2.googleusercontent.com/s2/favicons?domain=${bm.url}&sz=64`;
      img.alt = bm.name;
      img.className = 'bookmark-icon';

      const span = document.createElement('span');
      span.textContent = bm.name;
      span.className = 'bookmark-name';

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'bookmark-delete';
      deleteBtn.innerHTML = '&times;';
      deleteBtn.onclick = (e) => {
        e.preventDefault();
        bookmarks.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
        renderBookmarks();
      };

      a.appendChild(img);
      a.appendChild(span);
      a.appendChild(deleteBtn);
      
      grid.insertBefore(a, addBtn);
    });
  }

  renderBookmarks();

  addBtn.onclick = () => {
    modal.classList.remove('hidden');
    nameInput.focus();
  };

  function closeModal() {
    modal.classList.add('hidden');
    nameInput.value = '';
    urlInput.value = '';
  }

  cancelBtn.onclick = closeModal;

  saveBtn.onclick = () => {
    let url = urlInput.value.trim();
    const name = nameInput.value.trim();

    if (!name || !url) {
      alert('Inserisci nome e url validi');
      return;
    }

    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    bookmarks.push({ name, url });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    renderBookmarks();
    closeModal();
  };
}
