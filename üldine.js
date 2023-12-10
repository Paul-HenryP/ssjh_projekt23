// applies to all pages (including settings.html - no conflicts)


// Laadi alguses
document.addEventListener('DOMContentLoaded', () => {
  // laadi localStorage 
  loadSettings();
  // uudised (ülejäänud - script.js)
  const toggleNewsBtn = document.getElementById('toggleNews');
  const newsSection = document.getElementById('newsSection');

  toggleNewsBtn.addEventListener('click', () => {
    const isHidden = newsSection.style.display === 'none';
    newsSection.style.display = isHidden ? 'flex' : 'none'; 
    if (isHidden) {
        loadSocialMediaFeeds(); 
    }
  });
});



// laadi noolega nupp
document.addEventListener('DOMContentLoaded', () => {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
// laadi ? nupp
document.addEventListener('DOMContentLoaded', () => {
  const helpBtn = document.getElementById('helpButton');
  const helpModal = document.getElementById('helpModal');
  const closeSpan = document.querySelector('.close');

  helpBtn.addEventListener('click', () => {
    helpModal.style.display = 'block';
  });

  closeSpan.addEventListener('click', () => {
    helpModal.style.display = 'none';
  });

  // Sulge modaal, kui klikitakse väljaspool seda.
  window.onclick = (event) => {
    if (event.target === helpModal) {
      helpModal.style.display = 'none';
    }
  };
}); // millegi pärast ei saa need kolm document.addEventListener('DOMContentLoader'... ühendada




// uuenda keelt
function switchLanguage() {
  const currentLang = localStorage.getItem('language') === 'en' ? 'et' : 'en';
  localStorage.setItem('language', currentLang);
  updateTexts(currentLang);
}


function updateTexts(lang) {
  for (const key in language[lang]) {
      const element = document.getElementById(key);
      if (element) {
        if (element.id === "searchBox" || element.id === "name" || element.id === "email" || element.id === "feedback") {
          //element.setAttribute("placeholder", language[lang][searchBox_placeholder]);
          element.placeholder = language[lang][key];
        } else  {
            element.textContent = language[lang][key];
        }
      } else {
        console.warn(`Element not found for id: ${key}`);
    }
  }
}

// laadi localStorage - 2
function loadSettings() {
  const savedTheme = localStorage.getItem('theme');
  const savedTextSize = localStorage.getItem('textSize');
  const savedLang = localStorage.getItem('language') || 'en';
  
  if (savedTheme) {
      document.body.className = savedTheme === 'dark' ? 'dark-mode' : 'light-mode';
  }
  if (savedTextSize) {
      document.documentElement.style.fontSize = savedTextSize + 'px';
      if (document.getElementById('textSizeSlider')) {
          document.getElementById('textSizeSlider').value = savedTextSize;
      }
  }
  updateTexts(savedLang);
  if (document.getElementById('switchLang')) {
      document.getElementById('switchLang').textContent = language[savedLang].switchLang;
  }
}

// Kuula teave
window.addEventListener('storage', (event) => {
  if (event.key === 'theme' || event.key === 'textSize' || event.key === 'language') {
      loadSettings();
      if (event.key === 'language') {
          updateTexts(localStorage.getItem('language'));
      }
  }
});

function clearLocalStorage() { // for debugging
  localStorage.clear();
}