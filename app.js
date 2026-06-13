// const R2_BASE = 'https://pub-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.dev';
const R2_BASE = 'https://pub-aed658d5b76840bcb6f152b24c3994e4.r2.dev';
const R2_IMG_EXT = '.jpeg';

function buildR2Url(fotoParam) {
  if (!fotoParam || typeof fotoParam !== 'string') return null;
  const safe = fotoParam.replace(/\.\.\//g, '').replace(/^\/+/, '').trim();
  if (!safe) return null;
  return `${R2_BASE}/${encodeURIComponent(safe)}${R2_IMG_EXT}`;
}

const params = new URLSearchParams(window.location.search);
const foto = params.get('foto');

const img = document.getElementById('phygital-pic');
const openBtn = document.getElementById('open-menu-btn');
const closeBtn = document.getElementById('close-dialog-btn');
const dialog = document.getElementById('interaction-dialog');
const toggle = document.getElementById('dark-mode-toggle');
const themeLabel = document.getElementById('theme-label');

const imgUrl = buildR2Url(foto);

if (imgUrl) {
  img.src = imgUrl;
  img.onload = () => img.removeAttribute('style');
  img.onerror = () => {
    img.alt = 'No se pudo cargar la imagen';
    img.style.filter = 'blur(2px)';
  };
} else {
  img.alt = 'Parámetro faltante';
  img.style.filter = 'blur(2px)';
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
