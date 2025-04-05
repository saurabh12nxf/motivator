const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const shareBtn = document.getElementById('share');
const musicBtn = document.getElementById('toggle-music');
const bgMusic = document.getElementById('bg-music');

let quotes = [];


async function fetchQuotes() {
  const res = await fetch('https://type.fit/api/quotes');
  quotes = await res.json();
  showRandomQuote();
}

function setBackgroundImage() {
  const keywords = ['nature', 'sunrise', 'sky', 'inspiration'];
  const random = keywords[Math.floor(Math.random() * keywords.length)];
  const url = `https://source.unsplash.com/1600x900/?${random}`;
  document.body.style.backgroundImage = `url(${url})`;
}


function showRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = `"${quote.text}"`;
  authorEl.textContent = quote.author ? `— ${quote.author}` : "— Unknown";
  setBackgroundImage();
}


function shareQuote() {
  const text = `${quoteEl.textContent} ${authorEl.textContent}`;
  navigator.clipboard.writeText(text);
  alert('Quote copied to clipboard! You can paste it anywhere.');
}

musicBtn.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicBtn.textContent = '⏸️ Pause Music';
  } else {
    bgMusic.pause();
    musicBtn.textContent = '🎵 Music';
  }
});


newQuoteBtn.addEventListener('click', showRandomQuote);
shareBtn.addEventListener('click', shareQuote);

fetchQuotes();
