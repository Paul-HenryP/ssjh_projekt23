
// laadi alguses
document.addEventListener('DOMContentLoaded', () => {
    // Laadi localStorage
    loadSettings();

    // Event listeners for settings
    document.getElementById('lightMode').addEventListener('click', () => setTheme('light'));
    document.getElementById('darkMode').addEventListener('click', () => setTheme('dark'));
    document.getElementById('textSizeSlider').addEventListener('input', setTextSize);
});




// Light/dark mode
function setTheme(mode) {
    document.body.className = mode === 'dark' ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', mode);
    propagateSettings();
}
// Teksti suurus
function setTextSize() {
    const size = document.getElementById('textSizeSlider').value;
    document.documentElement.style.fontSize = size + 'px';
    localStorage.setItem('textSize', size);
    propagateSettings();
}
// Tõlkimine
document.getElementById('switchLang').addEventListener('click', switchLanguage);
function switchLanguage() {
  const currentLang = localStorage.getItem('language') === 'en' ? 'et' : 'en';
  localStorage.setItem('language', currentLang);
  updateTexts(currentLang);
  propagateSettings();
}
function updateTexts(lang) {
  for (const key in language[lang]) {
      const element = document.getElementById(key);
      if (element) {
          element.textContent = language[lang][key];
      }
  }
}



// laadi localStorage - 2
function loadSettings() {
    const savedTheme = localStorage.getItem('theme');
    const savedTextSize = localStorage.getItem('textSize');

    if (savedTheme) {
        document.body.className = savedTheme === 'dark' ? 'dark-mode' : 'light-mode';
    }
    if (savedTextSize) {
        document.documentElement.style.fontSize = savedTextSize + 'px';
        document.getElementById('textSizeSlider').value = savedTextSize;
    }

  const savedLang = localStorage.getItem('language') || 'en';
  updateTexts(savedLang);

  if (document.getElementById('switchLang')) {
      document.getElementById('switchLang').textContent = language[savedLang].switchLang;
  }
}



function propagateSettings() {
    // Uuenda teised lehed (saada teave)
    localStorage.setItem('updateSettings', Date.now());
}

// Kuula teabe
window.addEventListener('storage', (event) => {
    if (event.key === 'updateSettings') {
        loadSettings();
    }
    if (event.key === 'language') {
        updateTexts(localStorage.getItem('language'));
  }
});


function clearLocalStorage() { // debuggimise jaoks
    localStorage.clear();
}