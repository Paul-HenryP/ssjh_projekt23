// Assuming 'language' is an object containing language translations, similar to what was seen in 'lang.js'
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  
  const toggleNewsBtn = document.getElementById('toggleNews');
    const newsSection = document.getElementById('newsSection');

    toggleNewsBtn.addEventListener('click', () => {
        const isHidden = newsSection.style.display === 'none';
        newsSection.style.display = isHidden ? 'flex' : 'none'; // Toggle display
        if (isHidden) {
            loadSocialMediaFeeds(); // Load feeds only when showing the section
        }
    });
});

function switchLanguage() {
  const currentLang = localStorage.getItem('language') === 'en' ? 'et' : 'en';
  localStorage.setItem('language', currentLang);
  updateTexts(currentLang);
}


function updateTexts(lang) {
  for (const key in language[lang]) {
      const element = document.getElementById(key);
      if (element) {
        if (element.id === "searchBox") {
          //element.setAttribute("placeholder", language[lang][searchBox_placeholder]);
          element.placeholder = language[lang][key];
        } else {
           // Otherwise, update its text content.
            element.textContent = language[lang][key];
        }
      } else {
        console.warn(`Element not found for id: ${key}`);
    }
  }
}

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

// Listener for settings update in other tabs
window.addEventListener('storage', (event) => {
  if (event.key === 'theme' || event.key === 'textSize' || event.key === 'language') {
      loadSettings();
      if (event.key === 'language') {
          updateTexts(localStorage.getItem('language'));
      }
  }
});

function clearLocalStorage() {
  localStorage.clear();
}



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

  // Close the modal if the user clicks outside of it
  window.onclick = (event) => {
    if (event.target === helpModal) {
      helpModal.style.display = 'none';
    }
  };
});