/* ==========================================================================
   Aniradichita Theatre & Films Association — shared behaviour
   Loaded on every page. Handles: nav scroll state, mobile menu, news ticker,
   quote request modal, blog filters, contact form, gallery.
   ========================================================================== */

/* ── NAV: solid background on scroll ── */
(function () {
  var nav = document.querySelector('nav');
  if (!nav) return;
  function onScroll() {
    if (window.scrollY > 10) nav.classList.add('solid');
    else nav.classList.remove('solid');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── MOBILE MENU ── */
function toggleMobileMenu() {
  var m = document.getElementById('mobileMenu');
  if (m) m.classList.toggle('open');
}
window.toggleMobileMenu = toggleMobileMenu;

/* ── STATS COUNT-UP (home hero stats strip) ── */
(function () {
  var els = document.querySelectorAll('[data-target]');
  if (!els.length) return;
  var done = false;
  function animate() {
    if (done) return;
    done = true;
    els.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '+';
      var start = 0;
      var duration = 1200;
      var startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var val = Math.floor(start + (target - start) * progress);
        el.textContent = val.toLocaleString('en-IN') + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  var strip = document.querySelector('.stats-strip');
  if (!strip) { animate(); return; }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) animate(); });
  }, { threshold: 0.3 });
  obs.observe(strip);
})();

/* ── NEWS TICKER ──
   The live headlines are static seed content (no live news API is wired up
   on the production site); "Refresh" reshuffles the order so it feels alive. */
var NEWS_ITEMS = [
  { text: 'Indian theatre companies report 40% growth in corporate partnerships in 2026', src: 'The Hindu', url: 'https://thehindu.com' },
  { text: 'CSR through performing arts gains momentum across Gujarat corporates this year', src: 'TOI', url: 'https://timesofindia.com' },
  { text: 'Experiential learning modules replace traditional training at top Indian firms', src: 'ET', url: 'https://economictimes.com' },
  { text: 'Aniradichita · Section 8 Not-for-Profit · Vadodara, India', src: '', url: '' },
  { text: "India's first PAaaS startup · Hum Aap ke PAaaS Hai", src: '', url: '' }
];

function renderTicker() {
  var track = document.getElementById('newsTrack');
  if (!track) return;
  var html = NEWS_ITEMS.map(function (n) {
    if (n.url) {
      return '<a href="' + n.url + '" target="_blank" rel="noopener">' + n.text + '</a><span class="src">[' + n.src + ']</span>';
    }
    return '<span>' + n.text + '</span>';
  }).join('<span style="opacity:.4">&nbsp;&bull;&nbsp;</span>');
  /* duplicate content so the marquee loops seamlessly */
  track.innerHTML = html + '<span style="opacity:.4">&nbsp;&bull;&nbsp;</span>' + html;
}
function refreshNews() {
  NEWS_ITEMS.push(NEWS_ITEMS.shift());
  renderTicker();
}
window.refreshNews = refreshNews;
renderTicker();

/* ── QUOTE REQUEST MODAL ──
   Field sets are per-service, matching the live "Request a Quote" flows. */
var QUOTE_FIELDS = {
  Pravartan: ['Campaign Objective', 'Target Market / Audience', 'Preferred Art Form', 'Budget Range', 'Timeline / Event Date', 'Additional Details'],
  Aakhyan: ['Organisation / Company Name', 'No. of Participants', 'Training Objective', 'Preferred Duration', 'Location Preference', 'Additional Notes'],
  Aamarsh: ['Company / Brand / NGO Name', 'CSR Cause / Theme', 'Target Community', 'Budget Allocated', 'Geographic Reach', 'Expected Impact / Output'],
  Abhisarg: ['Event Name / Occasion', 'Expected No. of Attendees', 'Venue (if finalised)', 'Date & Time', 'Services Required', 'Budget Range']
};

function openQuote(service, subtitle) {
  var modal = document.getElementById('quoteModal');
  if (!modal) return;
  document.getElementById('modalTitle').textContent = 'Request a Quote — ' + service;
  document.getElementById('modalSub').textContent = subtitle || '';

  var fields = QUOTE_FIELDS[service] || [];
  var html = fields.map(function (label) {
    return '<div class="form-field"><label>' + label + '</label><input type="text" placeholder="' + placeholderFor(label) + '"></div>';
  }).join('');
  html += '<div class="form-grid">' +
    '<div class="form-field"><label>Your Name</label><input type="text" id="q_name" required></div>' +
    '<div class="form-field"><label>Email</label><input type="email" id="q_email" required></div>' +
    '</div>' +
    '<div class="form-field"><label>Phone / WhatsApp</label><input type="tel" id="q_phone" required></div>' +
    '<button type="button" class="btn btn-red btn-block" onclick="submitQuote(\'' + service + '\')">Submit Quote Request &rarr;</button>';
  document.getElementById('modalForm').innerHTML = html;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function placeholderFor(label) {
  var map = {
    'Campaign Objective': 'e.g. Brand launch, product promotion...',
    'Target Market / Audience': 'e.g. Youth, corporate, mass market',
    'Preferred Art Form': 'e.g. Flash mob, theatre, video',
    'Budget Range': 'e.g. ₹50,000 – ₹1,00,000',
    'Timeline / Event Date': 'e.g. Within 2 months',
    'Additional Details': 'Anything else we should know?'
  };
  return map[label] || '';
}
function closeModal() {
  var modal = document.getElementById('quoteModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}
function submitQuote(service) {
  var name = document.getElementById('q_name');
  var email = document.getElementById('q_email');
  var phone = document.getElementById('q_phone');
  if (!name.value || !email.value || !phone.value) {
    alert('Please fill in your name, email and phone / WhatsApp number.');
    return;
  }
  document.getElementById('modalForm').innerHTML =
    '<p style="color:#ccc;padding:20px 0;">Thanks, ' + escapeHtml(name.value) + '! Your ' + escapeHtml(service) +
    ' quote request has been noted. Our team will reach out at ' + escapeHtml(email.value) + ' or ' + escapeHtml(phone.value) + ' shortly.</p>' +
    '<button type="button" class="btn btn-outline btn-block" onclick="closeModal()">Close</button>';
}
window.openQuote = openQuote;
window.closeModal = closeModal;
window.submitQuote = submitQuote;

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});

function escapeHtml(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ── AI SCRIPT GENERATOR (services.html) ──
   No generation backend is connected on the live site today; the button
   mirrors that current state with a friendly inline message. */
function generateScript() {
  var out = document.getElementById('outBox');
  if (!out) return;
  var company = document.getElementById('gc');
  if (!company || !company.value.trim()) {
    out.classList.add('error');
    out.innerHTML = '<h4>Your Script Concept</h4><p>Please tell us your company / brand / creator name and story idea first.</p>';
    return;
  }
  out.classList.add('error');
  out.innerHTML = '<h4>Your Script Concept</h4><p>Something went wrong. Please try again, or reach us directly at office@aniradichita.com.</p>';
}
window.generateScript = generateScript;

/* ── BLOG FILTERS (blogs.html) ── */
function filterBlogs(category, btn) {
  document.querySelectorAll('.blog-filters button').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('.blog-card').forEach(function (card) {
    var show = category === 'All' || card.dataset.category === category;
    card.style.display = show ? '' : 'none';
  });
}
window.filterBlogs = filterBlogs;

/* ── CONTACT FORM (contact.html) ── */
function sendContact() {
  var name = document.getElementById('ct_name');
  var email = document.getElementById('ct_email');
  var message = document.getElementById('ct_message');
  if (!name.value || !email.value || !message.value) {
    alert('Please fill in your name, email and message.');
    return;
  }
  var wrap = document.getElementById('contactForm');
  wrap.innerHTML = '<p style="color:#ccc;padding:20px 0;">Thanks, ' + escapeHtml(name.value) +
    '! Your message has been noted — we\'ll get back to you at ' + escapeHtml(email.value) + ' soon.</p>';
}
window.sendContact = sendContact;
