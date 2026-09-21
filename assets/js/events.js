/* ==========================================================================
   Aniradichita Theatre & Films Association — Events pages behaviour
   Used by: events.html (index) and event.html (detail, ?e=<slug>)

   Reads window.ATFA_EVENTS (assets/data/events.js) and window.ATFA.ticketing
   (assets/js/ticketing.js). All content lives in the data file; this script
   only classifies, sorts and renders it.
   ========================================================================== */
(function () {
  'use strict';

  var EVENTS = window.ATFA_EVENTS || [];
  var ticketing = (window.ATFA && window.ATFA.ticketing) || null;

  var SITE = 'https://aniradichita.com/';
  var ORG_NAME = 'Aniradichita Theatre & Films Association';
  var INSTAGRAM = 'https://www.instagram.com/aniradichita_theatre_films/';
  var PAGE_SIZE = 12;

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  /* ── helpers ─────────────────────────────────────────────────────────── */
  function esc(value) {
    var div = document.createElement('div');
    div.textContent = value == null ? '' : String(value);
    return div.innerHTML.replace(/"/g, '&quot;');
  }
  function $(selector, scope) { return (scope || document).querySelector(selector); }
  function $$(selector, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(selector)); }

  function detailUrl(slug) { return 'event.html?e=' + encodeURIComponent(slug); }
  function absoluteUrl(path) { return new URL(path, SITE).href; }

  /* Sizes WordPress-hosted archive images on request; local files pass through. */
  function imgUrl(src, width) {
    return /^https:\/\/[^/]+\.wordpress\.com\/wp-content\/uploads\//.test(src) ? src + '?w=' + width : src;
  }
  function imgSrcset(src) {
    if (imgUrl(src, 1) === src) return '';
    return imgUrl(src, 480) + ' 480w, ' + imgUrl(src, 800) + ' 800w, ' + imgUrl(src, 1200) + ' 1200w';
  }

  /* ── dates (Asia/Kolkata, date-only strings 'YYYY-MM-DD') ────────────── */
  function istStart(date) { return new Date(date + 'T00:00:00+05:30'); }
  function istEnd(date) { return new Date(date + 'T23:59:59.999+05:30'); }
  function ymd(date) { var p = date.split('-'); return { y: +p[0], m: +p[1], d: +p[2] }; }
  function weekdayName(date) { var p = ymd(date); return DAYS[new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay()]; }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function fmtDate(date) { var p = ymd(date); return p.d + ' ' + MONTHS[p.m - 1] + ' ' + p.y; }
  function fmtShort(date) { var p = ymd(date); return pad(p.d) + '.' + pad(p.m) + '.' + pad(p.y % 100); }
  function fmtRange(a, b) {
    if (!b || b === a) return fmtDate(a);
    var s = ymd(a), e = ymd(b);
    if (s.y === e.y && s.m === e.m) return s.d + ' – ' + e.d + ' ' + MONTHS[s.m - 1] + ' ' + s.y;
    if (s.y === e.y) return s.d + ' ' + MONTHS[s.m - 1] + ' – ' + e.d + ' ' + MONTHS[e.m - 1] + ' ' + s.y;
    return fmtDate(a) + ' – ' + fmtDate(b);
  }

  /* Status is derived from dates whenever an event has one, so nothing has to
     be edited by hand when an event passes. Undated archive entries use the
     `status` written in the data file. */
  function resolveStatus(event, now) {
    now = now || new Date();
    if (event.date) {
      if (now > istEnd(event.endDate || event.date)) return 'past';
      if (now >= istStart(event.date)) return 'live';
      return 'upcoming';
    }
    return event.status === 'upcoming' || event.status === 'live' ? event.status : 'past';
  }

  function sortKey(e) { return e.date || e.datePublished || ''; }
  function sourceOrder(e) { return parseInt(String(e.id).replace(/\D/g, ''), 10) || 0; }
  function byNewest(a, b) { return sortKey(b).localeCompare(sortKey(a)) || sourceOrder(b) - sourceOrder(a); }
  function bySoonest(a, b) {
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || sortKey(a).localeCompare(sortKey(b));
  }

  function dateLabel(e) {
    if (e.date) return fmtRange(e.date, e.endDate);
    if (e.datePublished) return 'Archived ' + e.datePublished.slice(0, 4);
    return '';
  }
  function dateTimeTag(e, cls) {
    var label = dateLabel(e);
    if (!label) return '';
    var attr = e.date ? ' datetime="' + esc(e.date) + '"' : ' title="The event date is not stated in the archive"';
    return '<time class="' + (cls || 'ev-date') + '"' + attr + '>' + esc(label) + '</time>';
  }

  var STATUS = {
    upcoming: { cls: 'is-upcoming', label: function () { return 'Upcoming'; } },
    live: { cls: 'is-live', label: function (e) { return e.endDate && e.endDate !== e.date ? 'Ongoing' : 'Happening today'; } },
    past: { cls: 'is-past', label: function () { return 'Past event'; } }
  };
  function statusPill(e, status) {
    var s = STATUS[status];
    return '<span class="ev-status ' + s.cls + '"><i class="ev-status-dot" aria-hidden="true"></i>' + esc(s.label(e)) + '</span>';
  }

  /* ── ticketing UI (state comes from ticketing.js) ────────────────────── */
  function ticketState(e) {
    return ticketing ? ticketing.resolve(e, new Date()) : { state: 'hidden', info: [] };
  }
  function ticketButton(res, extraClass) {
    var cls = 'btn btn-red ev-ticket-btn' + (extraClass ? ' ' + extraClass : '');
    if (res.state === 'open') {
      return '<a class="' + cls + '" href="' + esc(res.href) + '" target="_blank" rel="noopener noreferrer"' +
        (res.provider ? ' data-provider="' + esc(res.provider) + '"' : '') + '>' +
        '<span aria-hidden="true">🎟️</span> ' + esc(res.label) + '<span class="sr-only"> (opens in a new tab)</span></a>';
    }
    if (res.state === 'coming-soon') {
      /* aria-disabled (not disabled) keeps it focusable so its state is announced. */
      return '<button type="button" class="' + cls + '" aria-disabled="true" data-ticket-state="coming-soon">' +
        '<span aria-hidden="true">🎟️</span> ' + esc(res.label) + '</button>';
    }
    return '';
  }

  /* ── detail rows ─────────────────────────────────────────────────────── */
  var TBA = '<span class="ev-tba">To be announced</span>';

  function speakersHtml(list) {
    return '<ul class="ev-people">' + list.map(function (s) {
      return '<li><b>' + esc(s.name) + '</b>' + (s.role ? '<span>' + esc(s.role) + '</span>' : '') + '</li>';
    }).join('') + '</ul>';
  }

  function detailRows(e, status) {
    var upcoming = status !== 'past';
    var rows = [];
    function add(label, html, tbaWhenMissing) {
      if (html) rows.push([label, html]);
      else if (upcoming && tbaWhenMissing) rows.push([label, TBA]);
    }
    if (e.date) {
      add('Date', esc(fmtRange(e.date, e.endDate)) + (!e.endDate || e.endDate === e.date ? ' <span class="ev-dim">(' + esc(weekdayName(e.date)) + ')</span>' : '') +
        (e.dateNote ? '<span class="ev-fine">' + esc(e.dateNote) + '</span>' : ''));
    } else if (e.datePublished) {
      add('Date', '<span class="ev-dim">Not stated in the archive (entry published ' + esc(fmtDate(e.datePublished)) + ')</span>');
    }
    add('Time', e.time ? esc(e.time) : '', true);
    add('Venue', e.venue ? esc(e.venue) : '', true);
    add('Location', e.location ? esc(e.location) : '', false);
    add('Format', esc(e.type + (e.series ? ' · ' + e.series : '') + (e.session ? ' · Session ' + e.session : '')));
    add('Session theme', e.topic ? esc(e.topic) : '', false);
    add(e.speakers.length > 1 ? 'Guests' : 'Guest', e.speakers.length ? speakersHtml(e.speakers) : '', false);
    add('In association with', e.collaborators.length ? esc(e.collaborators.join(', ')) : '', false);
    add(e.organizerLabel || 'Organised by', esc(e.organizer || (upcoming ? ORG_NAME : '')), false);
    add('Entry', e.entry ? esc(e.entry) : '', false);
    return rows;
  }

  function dl(rows) {
    return '<dl class="ev-dl">' + rows.map(function (r) {
      return '<div class="ev-dl-row"><dt>' + esc(r[0]) + '</dt><dd>' + r[1] + '</dd></div>';
    }).join('') + '</dl>';
  }

  function ticketPanel(e, res, headingLevel) {
    if (res.state === 'hidden') return '';
    var h = 'h' + headingLevel;
    var id = 'tk-' + esc(e.slug);
    var rows = res.info.map(function (r) { return [r.label, r.value ? esc(r.value) : TBA]; });
    var note = '';
    if (res.state === 'coming-soon' && res.opensAt && res.opensAt > new Date()) {
      note = '<p class="ev-note">Tickets open ' + esc(fmtDate(res.opensAt.toISOString().slice(0, 10))) + '.</p>';
    }
    return '<section class="ev-panel ev-ticket-panel" aria-labelledby="' + id + '">' +
      '<' + h + ' id="' + id + '">Ticket information</' + h + '>' +
      (rows.length ? dl(rows) : '') + note +
      '<div class="ev-panel-cta">' + ticketButton(res, 'btn-block') + '</div></section>';
  }

  /* ── cards ───────────────────────────────────────────────────────────── */
  function cover(e) { return e.images && e.images[0] ? e.images[0] : null; }

  function cardImage(e) {
    var c = cover(e);
    if (!c) return '<div class="ev-card-fallback" aria-hidden="true">🎭</div>';
    var set = imgSrcset(c.src);
    return '<img src="' + esc(imgUrl(c.src, 640)) + '"' + (set ? ' srcset="' + esc(set) + '" sizes="(min-width:1100px) 380px, (min-width:640px) 45vw, 92vw"' : '') +
      ' alt="" width="640" height="400" loading="lazy" decoding="async" data-fallback>';
  }

  function renderCard(e, status) {
    var badge = status === 'past' ? '' : '<span class="ev-card-badge">' + statusPill(e, status) + '</span>';
    return '<article class="ev-card' + (status === 'past' ? '' : ' is-live-card') + '">' +
      '<div class="ev-card-media">' + cardImage(e) + badge + '</div>' +
      '<div class="ev-card-body">' +
        '<div class="ev-card-meta"><span class="ev-type">' + esc(e.type) + '</span>' + dateTimeTag(e) + '</div>' +
        '<h3 class="ev-card-title"><a class="ev-card-link" href="' + detailUrl(e.slug) + '">' + esc(e.title) + '</a></h3>' +
        '<p class="ev-card-desc">' + esc(e.description) + '</p>' +
        '<span class="ev-card-more" aria-hidden="true">View Details <i>→</i></span>' +
      '</div></article>';
  }

  /* ── featured (upcoming / live) ──────────────────────────────────────── */
  function countdownHtml(e) {
    return '<div class="ev-countdown" role="timer" aria-label="Time until event day" data-countdown="' + esc(istStart(e.date).toISOString()) + '">' +
      ['d:Days', 'h:Hours', 'm:Minutes'].map(function (u) {
        var k = u.split(':');
        return '<div class="ev-cd-unit"><span class="ev-cd-num" data-cd="' + k[0] + '">--</span><span class="ev-cd-lbl">' + k[1] + '</span></div>';
      }).join('') +
      '<p class="ev-cd-note">until event day</p></div>';
  }

  function shareButton(e) {
    return '<button type="button" class="btn btn-dark ev-share-btn" data-share="' + esc(e.slug) + '"><span aria-hidden="true">↗</span> Share</button>';
  }

  function renderFeature(e, status, opts) {
    opts = opts || {};
    var h = opts.detail ? 'h1' : 'h2';
    var c = cover(e);
    var res = ticketState(e);
    var poster = c
      ? '<img src="' + esc(imgUrl(c.src, 900)) + '" alt="' + esc(c.alt || e.title) + '"' + (c.width ? ' width="' + c.width + '" height="' + c.height + '"' : '') +
        ' fetchpriority="high" decoding="async" data-fallback>'
      : '<div class="ev-card-fallback" aria-hidden="true">🎭</div>';
    var posterWrap = opts.detail
      ? '<div class="ev-poster">' + poster + '</div>'
      : '<a class="ev-poster" href="' + detailUrl(e.slug) + '" aria-label="' + esc(e.title) + ' — view event details">' + poster + '</a>';

    var dateBlock = '';
    if (e.date) {
      var p = ymd(e.date);
      dateBlock = '<div class="ev-datebox">' +
        '<div class="ev-datebox-cal" aria-hidden="true"><span>' + MONTHS[p.m - 1].slice(0, 3) + '</span><b>' + p.d + '</b><span>' + p.y + '</span></div>' +
        '<div class="ev-datebox-text"><time datetime="' + esc(e.date) + '"><span class="ev-datebox-long">' + esc(weekdayName(e.date) + ', ' + fmtRange(e.date, e.endDate)) + '</span></time>' +
        '<span class="ev-datebox-short" aria-label="Date written as ' + esc(fmtShort(e.date)) + '">' + esc(fmtShort(e.date)) + '</span>' +
        (e.time ? '<span class="ev-datebox-time">' + esc(e.time) + '</span>' : '') + '</div></div>';
    }

    var ctas = ticketButton(res) + shareButton(e) +
      (opts.detail ? '' : '<a class="btn btn-dark" href="' + detailUrl(e.slug) + '">Event details <span aria-hidden="true">→</span></a>');
    var clues = e.slug === 'sunday-decodes'
      ? '<a class="ev-follow" href="' + INSTAGRAM + '" target="_blank" rel="noopener noreferrer">Clues are coming — follow our posts &amp; reels on Instagram <span class="sr-only">(opens in a new tab)</span></a>'
      : '';

    var html = '<article class="ev-feature" aria-labelledby="ft-' + esc(e.slug) + '">' +
      posterWrap +
      '<div class="ev-feature-body">' +
        '<div class="ev-status-row">' + statusPill(e, status) + '<span class="ev-type">' + esc(e.type) + '</span></div>' +
        '<' + h + ' class="ev-feature-title" id="ft-' + esc(e.slug) + '">' + esc(e.title) + '</' + h + '>' +
        (e.tagline ? '<p class="ev-tagline">' + esc(e.tagline) + '</p>' : '') +
        dateBlock +
        (e.date && status === 'upcoming' ? countdownHtml(e) : '') +
        '<p class="ev-feature-desc">' + esc(e.description) + '</p>' +
        '<div class="ev-cta-row">' + ctas + '</div>' +
        '<p class="ev-share-status" role="status" aria-live="polite"></p>' +
        clues +
      '</div></article>';
    return html;
  }

  function renderFeatureExtras(e, status, opts) {
    opts = opts || {};
    var res = ticketState(e);
    var level = opts.detail ? 2 : 3;
    var panels = ticketPanel(e, res, level) +
      '<section class="ev-panel" aria-labelledby="dt-' + esc(e.slug) + '"><h' + level + ' id="dt-' + esc(e.slug) + '">Event details</h' + level + '>' + dl(detailRows(e, status)) + '</section>';
    return '<div class="ev-info-grid">' + panels + '</div>';
  }

  /* ── index page ──────────────────────────────────────────────────────── */
  var pastState = { list: [], type: 'All', shown: PAGE_SIZE };

  function renderEmptyLive() {
    return '<div class="ev-empty" role="status">' +
      '<div class="ev-empty-marquee" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>' +
      '<h3>No upcoming events right now</h3>' +
      '<p>The stage is dark for the moment. Follow us on <a href="' + INSTAGRAM + '" target="_blank" rel="noopener noreferrer">Instagram</a> to hear about the next one first — and explore what we have staged so far below.</p></div>';
  }

  function renderIndex() {
    var now = new Date();
    var items = EVENTS.map(function (e) { return { e: e, s: resolveStatus(e, now) }; });
    var live = items.filter(function (i) { return i.s !== 'past'; }).sort(function (a, b) { return bySoonest(a.e, b.e); });
    var past = items.filter(function (i) { return i.s === 'past'; }).map(function (i) { return i.e; }).sort(byNewest);

    var liveMount = $('#liveMount');
    if (liveMount) {
      if (!live.length) {
        liveMount.innerHTML = renderEmptyLive();
      } else {
        var html = '';
        var cards = '';
        live.forEach(function (i) {
          if (i.e.featured) html += '<div class="ev-feature-wrap">' + renderFeature(i.e, i.s) + renderFeatureExtras(i.e, i.s) + '</div>';
          else cards += renderCard(i.e, i.s);
        });
        if (cards) html += '<div class="ev-grid">' + cards + '</div>';
        liveMount.innerHTML = html;
      }
      var liveCount = $('#liveCount');
      if (liveCount) liveCount.textContent = live.length ? live.length + (live.length === 1 ? ' event' : ' events') : 'None scheduled';
    }

    pastState.list = past;
    renderPastControls();
    renderPastGrid(false);
    var pastCount = $('#pastCount');
    if (pastCount) pastCount.textContent = past.length + ' events';

    live.forEach(function (i) { injectJsonLd(i.e, i.s); });
    startCountdowns();
  }

  function pastFiltered() {
    return pastState.type === 'All' ? pastState.list : pastState.list.filter(function (e) { return e.type === pastState.type; });
  }

  function renderPastControls() {
    var mount = $('#pastFilters');
    if (!mount) return;
    var counts = {};
    pastState.list.forEach(function (e) { counts[e.type] = (counts[e.type] || 0) + 1; });
    var types = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a] || a.localeCompare(b); });
    var chips = [['All', pastState.list.length]].concat(types.map(function (t) { return [t, counts[t]]; }));
    mount.innerHTML = chips.map(function (c) {
      return '<button type="button" class="ev-chip" data-type="' + esc(c[0]) + '" aria-pressed="' + (c[0] === pastState.type) + '">' +
        esc(c[0]) + ' <span class="ev-chip-n">' + c[1] + '</span></button>';
    }).join('');
  }

  function renderPastGrid(focusFirstNew) {
    var grid = $('#pastGrid');
    if (!grid) return;
    var list = pastFiltered();
    var visible = list.slice(0, pastState.shown);
    var firstNewIndex = grid.children.length;
    grid.innerHTML = visible.map(function (e) { return renderCard(e, 'past'); }).join('');
    var status = $('#pastStatus');
    if (status) status.textContent = 'Showing ' + visible.length + ' of ' + list.length + ' past events' + (pastState.type === 'All' ? '' : ' — ' + pastState.type);
    var more = $('#pastMore');
    if (more) more.hidden = visible.length >= list.length;
    if (focusFirstNew && grid.children[firstNewIndex]) {
      var link = $('.ev-card-link', grid.children[firstNewIndex]);
      if (link) link.focus();
    }
  }

  function bindIndexEvents() {
    var filters = $('#pastFilters');
    if (filters) {
      filters.addEventListener('click', function (ev) {
        var btn = ev.target.closest('[data-type]');
        if (!btn) return;
        pastState.type = btn.getAttribute('data-type');
        pastState.shown = PAGE_SIZE;
        renderPastControls();
        renderPastGrid(false);
        var again = $('[data-type="' + pastState.type.replace(/"/g, '\\"') + '"]', filters);
        if (again) again.focus();
      });
    }
    var more = $('#pastMore');
    if (more) {
      more.addEventListener('click', function () {
        pastState.shown += PAGE_SIZE;
        renderPastGrid(true);
      });
    }
  }

  /* ── detail page ─────────────────────────────────────────────────────── */
  function related(current, now) {
    var scored = EVENTS.filter(function (e) { return e.slug !== current.slug; }).map(function (e) {
      var score = (current.series && e.series === current.series ? 3 : 0) + (e.type === current.type ? 2 : 0);
      return { e: e, score: score, s: resolveStatus(e, now) };
    });
    scored.sort(function (a, b) { return b.score - a.score || byNewest(a.e, b.e); });
    return scored.slice(0, 3);
  }

  function renderVideos(e) {
    if (!e.videos || !e.videos.length) return '';
    return '<section class="ev-section" aria-labelledby="vid-h"><h2 id="vid-h">Video</h2><div class="ev-videos">' +
      e.videos.map(function (v, i) {
        var thumb = v.provider === 'youtube' ? 'https://i.ytimg.com/vi/' + encodeURIComponent(v.id) + '/hqdefault.jpg' : '';
        return '<button type="button" class="ev-video" data-video-provider="' + esc(v.provider) + '" data-video-id="' + esc(v.id) + '" aria-label="Play video ' + (i + 1) + ': ' + esc(e.title) + '">' +
          (thumb ? '<img src="' + thumb + '" alt="" loading="lazy" decoding="async">' : '') +
          '<span class="ev-video-play" aria-hidden="true">▶</span></button>';
      }).join('') + '</div></section>';
  }

  function renderGallery(e) {
    var imgs = e.images || [];
    if (imgs.length < 2) return '';
    return '<section class="ev-section" aria-labelledby="gal-h"><h2 id="gal-h">Gallery <span class="ev-dim">· ' + imgs.length + ' photos</span></h2><ul class="ev-gallery">' +
      imgs.map(function (im, i) {
        return '<li><button type="button" class="ev-thumb" data-gallery-index="' + i + '" aria-label="Open photo ' + (i + 1) + ' of ' + imgs.length + '">' +
          '<img src="' + esc(imgUrl(im.src, 480)) + '" alt="' + esc(im.alt || e.title) + '" width="480" height="480" loading="lazy" decoding="async" data-fallback></button></li>';
      }).join('') + '</ul></section>';
  }

  function renderAbout(e) {
    var paras = e.longDescription && e.longDescription.length ? e.longDescription : [e.description];
    return '<section class="ev-section" aria-labelledby="about-h"><h2 id="about-h">About this event</h2>' +
      paras.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</section>';
  }

  function sourceLinks(e) {
    var urls = [e.sourceUrl].concat(e.sourceUrls || []).filter(Boolean);
    if (!urls.length) return '';
    return '<section class="ev-panel ev-source" aria-labelledby="src-h"><h2 id="src-h">Archive</h2><p>This entry comes from the Aniradichita archive.</p><ul>' +
      urls.map(function (u, i) {
        return '<li><a href="' + esc(u) + '" target="_blank" rel="noopener noreferrer">Original post' + (urls.length > 1 ? ' ' + (i + 1) : '') + ' <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></li>';
      }).join('') + '</ul></section>';
  }

  function renderDetail() {
    var mount = $('#eventMount');
    var slug = new URLSearchParams(window.location.search).get('e');
    var e = EVENTS.filter(function (x) { return x.slug === slug; })[0];
    if (!e) {
      document.title = 'Event not found | Aniradichita Theatre & Films Association';
      mount.innerHTML = '<div class="container"><div class="ev-empty" role="alert"><h1>We couldn’t find that event</h1>' +
        '<p>The link may be old or mistyped.</p><p><a class="btn btn-red" href="events.html">Browse all events</a></p></div></div>';
      return;
    }
    var now = new Date();
    var status = resolveStatus(e, now);
    var html = '<div class="container">' +
      '<nav class="ev-crumbs" aria-label="Breadcrumb"><ol><li><a href="events.html">Events</a></li><li aria-current="page">' + esc(e.title) + '</li></ol></nav>';

    if (status !== 'past') {
      html += '<div class="ev-feature-wrap">' + renderFeature(e, status, { detail: true }) + '</div>' +
        '<div class="ev-detail-grid"><div class="ev-detail-main">' + renderAbout(e) + renderVideos(e) + renderGallery(e) + '</div>' +
        '<aside class="ev-detail-aside">' + renderFeatureExtras(e, status, { detail: true }) + sourceLinks(e) + '</aside></div>';
    } else {
      var c = cover(e);
      html += '<article class="ev-detail"><header class="ev-detail-hero">' +
        (c ? '<figure class="ev-detail-cover"><img src="' + esc(imgUrl(c.src, 1000)) + '" srcset="' + esc(imgSrcset(c.src)) + '" sizes="(min-width:900px) 46vw, 92vw" alt="' + esc(c.alt || e.title) + '" fetchpriority="high" decoding="async" data-fallback></figure>' : '') +
        '<div class="ev-detail-head">' +
          '<div class="ev-status-row">' + statusPill(e, status) + '<span class="ev-type">' + esc(e.type) + '</span></div>' +
          '<h1 class="ev-feature-title">' + esc(e.title) + '</h1>' +
          '<p class="ev-detail-when">' + dateTimeTag(e, 'ev-date-lg') + (e.time ? ' <span class="ev-dim">· ' + esc(e.time) + '</span>' : '') + '</p>' +
          (e.venue || e.location ? '<p class="ev-detail-where">' + esc([e.venue, e.location].filter(Boolean).join(', ')) + '</p>' : '') +
          '<p class="ev-feature-desc">' + esc(e.description) + '</p>' +
          '<div class="ev-cta-row">' + shareButton(e) + '</div><p class="ev-share-status" role="status" aria-live="polite"></p>' +
        '</div></header>' +
        '<div class="ev-detail-grid"><div class="ev-detail-main">' + renderAbout(e) + renderVideos(e) + renderGallery(e) + '</div>' +
        '<aside class="ev-detail-aside"><section class="ev-panel" aria-labelledby="dt-' + esc(e.slug) + '"><h2 id="dt-' + esc(e.slug) + '">Event details</h2>' + dl(detailRows(e, status)) + '</section>' + sourceLinks(e) + '</aside></div></article>';
    }

    var rel = related(e, now);
    html += '<section class="ev-related" aria-labelledby="rel-h"><h2 id="rel-h">More events</h2><div class="ev-grid">' +
      rel.map(function (r) { return renderCard(r.e, r.s); }).join('') + '</div></section></div>';

    mount.innerHTML = html;
    applyMeta(e, status);
    injectJsonLd(e, status);
    startCountdowns();
    bindDetailEvents(e);
  }

  /* ── SEO ─────────────────────────────────────────────────────────────── */
  function setMeta(selector, attr, value) {
    var node = $(selector);
    if (node) node.setAttribute(attr, value);
  }
  function applyMeta(e, status) {
    var url = absoluteUrl(detailUrl(e.slug));
    var title = e.title + ' | ' + ORG_NAME;
    var desc = e.description;
    var c = cover(e);
    var image = c ? (/^https?:/.test(c.src) ? imgUrl(c.src, 1200) : absoluteUrl(c.src)) : absoluteUrl('assets/images/events/sunday-decodes.jpg');
    document.title = title;
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', desc);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', desc);
    setMeta('meta[name="twitter:image"]', 'content', image);
  }

  /* Structured data: only facts that are in the data file. Events without a
     known date are skipped; `location`/`offers` are added only when known
     (no price is ever invented, so no Offer is emitted). */
  function injectJsonLd(e, status) {
    if (!e.date) return;
    var url = absoluteUrl(detailUrl(e.slug));
    var c = cover(e);
    var data = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: e.title,
      description: e.description,
      startDate: e.date,
      url: url,
      eventStatus: 'https://schema.org/EventScheduled',
      organizer: { '@type': 'Organization', name: e.organizer || ORG_NAME, url: e.organizer ? undefined : SITE }
    };
    if (e.endDate) data.endDate = e.endDate;
    if (c) data.image = [/^https?:/.test(c.src) ? imgUrl(c.src, 1200) : absoluteUrl(c.src)];
    if (e.venue && /^online/i.test(e.venue)) {
      data.eventAttendanceMode = 'https://schema.org/OnlineEventAttendanceMode';
      data.location = { '@type': 'VirtualLocation', url: url };
    } else if (e.venue) {
      data.location = { '@type': 'Place', name: e.venue, address: e.location || e.venue };
    }
    if (e.speakers && e.speakers.length) {
      data.performer = e.speakers.map(function (s) { return { '@type': 'Person', name: s.name }; });
    }
    var tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.textContent = JSON.stringify(data);
    document.head.appendChild(tag);
  }

  /* ── countdown ───────────────────────────────────────────────────────── */
  var countdownTimer = null;
  function startCountdowns() {
    var nodes = $$('[data-countdown]');
    if (!nodes.length) return;
    function tick() {
      var now = Date.now();
      nodes.forEach(function (node) {
        var diff = new Date(node.getAttribute('data-countdown')).getTime() - now;
        if (diff <= 0) { node.hidden = true; return; }
        var mins = Math.floor(diff / 60000);
        var d = Math.floor(mins / 1440), h = Math.floor((mins % 1440) / 60), m = mins % 60;
        var values = { d: d, h: pad(h), m: pad(m) };
        Object.keys(values).forEach(function (k) { $('[data-cd="' + k + '"]', node).textContent = values[k]; });
        node.setAttribute('aria-label', 'Time until event day: ' + d + ' days, ' + h + ' hours, ' + m + ' minutes');
      });
    }
    tick();
    if (countdownTimer) window.clearInterval(countdownTimer);
    countdownTimer = window.setInterval(tick, 30000);
  }

  /* ── share ───────────────────────────────────────────────────────────── */
  function handleShare(btn) {
    var slug = btn.getAttribute('data-share');
    var e = EVENTS.filter(function (x) { return x.slug === slug; })[0];
    if (!e) return;
    var url = new URL(detailUrl(e.slug), window.location.href).href;
    var text = e.title + (e.date ? ' — ' + fmtRange(e.date, e.endDate) : '') + ' | ' + ORG_NAME;
    var scope = btn.closest('.ev-feature-body, .ev-detail-head') || document;
    var status = $('.ev-share-status', scope);
    function say(msg) { if (status) status.textContent = msg; }

    if (navigator.share) {
      navigator.share({ title: e.title, text: text, url: url }).catch(function () { /* dismissed */ });
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { say('Link copied to clipboard.'); }, function () { say('Copy this link: ' + url); });
    } else {
      say('Copy this link: ' + url);
    }
  }

  /* ── lightbox + video (detail) ───────────────────────────────────────── */
  function bindDetailEvents(e) {
    var images = e.images || [];
    var dialog = null;
    var index = 0;
    var opener = null;

    function build() {
      dialog = document.createElement('dialog');
      dialog.className = 'ev-lightbox';
      dialog.setAttribute('aria-label', 'Photo gallery: ' + e.title);
      dialog.innerHTML = '<button type="button" class="ev-lb-close" aria-label="Close gallery">✕</button>' +
        '<button type="button" class="ev-lb-nav ev-lb-prev" aria-label="Previous photo">‹</button>' +
        '<figure><img alt=""><figcaption></figcaption></figure>' +
        '<button type="button" class="ev-lb-nav ev-lb-next" aria-label="Next photo">›</button>';
      document.body.appendChild(dialog);
      $('.ev-lb-close', dialog).addEventListener('click', function () { dialog.close(); });
      $('.ev-lb-prev', dialog).addEventListener('click', function () { show(index - 1); });
      $('.ev-lb-next', dialog).addEventListener('click', function () { show(index + 1); });
      dialog.addEventListener('click', function (ev) { if (ev.target === dialog) dialog.close(); });
      dialog.addEventListener('keydown', function (ev) {
        if (ev.key === 'ArrowLeft') show(index - 1);
        if (ev.key === 'ArrowRight') show(index + 1);
      });
      dialog.addEventListener('close', function () { if (opener) opener.focus(); });
    }
    function show(i) {
      index = (i + images.length) % images.length;
      var im = images[index];
      var img = $('img', dialog);
      img.src = imgUrl(im.src, 1400);
      img.alt = im.alt || e.title;
      $('figcaption', dialog).textContent = 'Photo ' + (index + 1) + ' of ' + images.length;
    }

    document.addEventListener('click', function (ev) {
      var thumb = ev.target.closest('[data-gallery-index]');
      if (thumb) {
        if (!dialog) build();
        opener = thumb;
        show(parseInt(thumb.getAttribute('data-gallery-index'), 10));
        if (typeof dialog.showModal === 'function') dialog.showModal();
        return;
      }
      var video = ev.target.closest('[data-video-id]');
      if (video) {
        var id = encodeURIComponent(video.getAttribute('data-video-id'));
        var provider = video.getAttribute('data-video-provider');
        var src = provider === 'youtube'
          ? 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0'
          : 'https://video.wordpress.com/embed/' + id + '?autoPlay=1&preloadContent=metadata';
        var frame = document.createElement('iframe');
        frame.src = src;
        frame.title = 'Video: ' + e.title;
        frame.allow = 'autoplay; fullscreen; picture-in-picture';
        frame.allowFullscreen = true;
        frame.className = 'ev-video-frame';
        video.replaceWith(frame);
        frame.focus();
      }
    });
  }

  /* ── boot ────────────────────────────────────────────────────────────── */
  document.addEventListener('click', function (ev) {
    var btn = ev.target.closest('[data-share]');
    if (btn) handleShare(btn);
  });

  /* Broken image? Swap in the on-brand placeholder instead of a broken icon. */
  document.addEventListener('error', function (ev) {
    var img = ev.target;
    if (!img || img.tagName !== 'IMG' || !img.hasAttribute('data-fallback')) return;
    var box = document.createElement('div');
    box.className = 'ev-card-fallback';
    box.setAttribute('aria-hidden', 'true');
    box.textContent = '🎭';
    img.replaceWith(box);
  }, true);

  /* Small public surface so the status rules can be checked from the console. */
  window.ATFA = window.ATFA || {};
  window.ATFA.events = { resolveStatus: resolveStatus };

  var view = document.body.getAttribute('data-events-view');
  if (view === 'index') { renderIndex(); bindIndexEvents(); }
  else if (view === 'detail') { renderDetail(); }
})();
