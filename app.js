const R2_BASE = 'https://pub-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.dev';
const IMG_EXT = '.jpg';

const params = new URLSearchParams(window.location.search);
const foto = params.get('foto');

const img = document.getElementById('phygital-pic');
const openBtn = document.getElementById('open-menu-btn');
const closeBtn = document.getElementById('close-dialog-btn');
const dialog = document.getElementById('interaction-dialog');
const toggle = document.getElementById('dark-mode-toggle');
const themeLabel = document.getElementById('theme-label');

if (foto) {
  img.src = `${R2_BASE}/${encodeURIComponent(foto)}${IMG_EXT}`;
  img.onerror = () => {
    img.alt = 'No se pudo cargar la imagen';
  };
} else {
  img.alt = 'Parámetro faltante';
}

openBtn.addEventListener('click', () => dialog.showModal());
closeBtn.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.close();
});

const stored = localStorage.getItem('phygital-theme');

if (stored === 'dark') {
  document.documentElement.style.colorScheme = 'dark';
  toggle.checked = true;
} else if (stored === 'light') {
  document.documentElement.style.colorScheme = 'light';
  toggle.checked = false;
} else {
  toggle.checked = window.matchMedia('(prefers-color-scheme: dark)').matches;
}

themeLabel.textContent = toggle.checked ? 'Modo Claro' : 'Modo Oscuro';

toggle.addEventListener('change', () => {
  const isDark = toggle.checked;
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  localStorage.setItem('phygital-theme', isDark ? 'dark' : 'light');
  themeLabel.textContent = isDark ? 'Modo Claro' : 'Modo Oscuro';
});

const shareUrl = window.location.href;
const shareText = 'Mirá este recuerdo Phygital';

document.querySelectorAll('.social-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const label = btn.getAttribute('aria-label');
    let url = '';
    if (label.includes('WhatsApp')) {
      url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    } else if (label.includes('Telegram')) {
      url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    } else if (label.includes('Email')) {
      url = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
    }
    if (url) window.open(url, '_blank', 'noopener');
  });
});
