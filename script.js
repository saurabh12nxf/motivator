const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const shareBtn = document.getElementById('share');
const musicBtn = document.getElementById('toggle-music');
const bgMusic = document.getElementById('bg-music');

// Fetch a single quote using ZenQuotes + CORS proxy
async function fetchQuote() {
  try {
    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://zenquotes.io/api/random')}?t=${Date.now()}`);

    const rawData = await res.json();
    const data = JSON.parse(rawData.contents);
    const quote = data[0];

    quoteEl.textContent = `"${quote.q}"`;
    authorEl.textContent = `— ${quote.a}`;
    setBackgroundImage();
  } catch (error) {
    quoteEl.textContent = "⚠️ Could not load quote.";
    authorEl.textContent = "Please try again later.";
    console.error('Error fetching quote:', error);
  }
}

// Change background image using Unsplash
function setBackgroundImage() {
  const keywords = ['nature', 'sunrise', 'sky', 'inspiration'];
  const random = keywords[Math.floor(Math.random() * keywords.length)];
  const url = `https://source.unsplash.com/1600x900/?${random}`;
  document.body.style.backgroundImage = `url(${url})`;
}

// Copy quote to clipboard
function shareQuote() {
    const text = `${quoteEl.textContent} ${authorEl.textContent}`;
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappURL, '_blank');
  }
  
// Toggle music
musicBtn.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicBtn.textContent = '⏸️ Pause Music';
  } else {
    bgMusic.pause();
    musicBtn.textContent = '🎵 Music';
  }
});

newQuoteBtn.addEventListener('click', fetchQuote);
shareBtn.addEventListener('click', shareQuote);

// Load first quote on page load
fetchQuote();
