/* ==========================================================================
   Aniradichita Studio — booking calendar widget (book-studio.html only)
   Vanilla JS, no backend: renders a month calendar, lets a visitor pick a
   date / duration / start time, then hands the request off to
   office@aniradichita.com by email — matching the live site's "send
   booking request, we confirm within 2 hours" flow.
   ========================================================================== */

var sb = (function () {
  var state = {
    viewYear: null,
    viewMonth: null, // 0-indexed
    selectedDate: null, // 'YYYY-MM-DD'
    selectedDuration: null, // hours, number
    selectedTime: null
  };

  var DURATIONS = [1, 2, 3, 4];
  var START_TIMES = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'];
  var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* Deterministic pseudo-availability so the demo looks "live" without a
     backend: a day's booking density is derived from its own date string,
     not randomised per page load. */
  function bookingLevel(dateStr) {
    var hash = 0;
    for (var i = 0; i < dateStr.length; i++) hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
    var r = hash % 10;
    if (r < 5) return 'open';
    if (r < 8) return 'partbook';
    return 'fullbook';
  }

  function init(year, month) {
    var d = new Date();
    state.viewYear = year != null ? year : d.getFullYear();
    state.viewMonth = month != null ? month : d.getMonth();
    render();
  }

  function changeMonth(delta) {
    var d = new Date();
    var newMonth = state.viewMonth + delta;
    var newDate = new Date(state.viewYear, newMonth, 1);
    var floor = new Date(d.getFullYear(), d.getMonth(), 1);
    if (newDate < floor) return; // no browsing before current month
    state.viewYear = newDate.getFullYear();
    state.viewMonth = newDate.getMonth();
    render();
  }

  function render() {
    var label = document.getElementById('cal2Label');
    var grid = document.getElementById('cal2');
    if (!grid) return;
    label.textContent = MONTH_NAMES[state.viewMonth] + ' ' + state.viewYear;

    var first = new Date(state.viewYear, state.viewMonth, 1);
    var startOffset = first.getDay(); // 0=Sun
    var daysInMonth = new Date(state.viewYear, state.viewMonth + 1, 0).getDate();
    var today = todayStr();

    var cells = [];
    var headers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    headers.forEach(function (h, i) {
      cells.push('<div class="cal2-hd' + (i === 0 || i === 6 ? ' we' : '') + '">' + h + '</div>');
    });
    for (var i = 0; i < startOffset; i++) cells.push('<div class="cal2-d empty"></div>');

    for (var day = 1; day <= daysInMonth; day++) {
      var dateStr = state.viewYear + '-' + pad(state.viewMonth + 1) + '-' + pad(day);
      var dow = new Date(state.viewYear, state.viewMonth, day).getDay();
      var isWeekend = dow === 0 || dow === 6;
      var isPast = dateStr < today;
      var level = bookingLevel(dateStr);
      var isFull = level === 'fullbook';
      var disabled = isPast || isFull;
      var cls = ['cal2-d'];
      if (isWeekend) cls.push('weekend');
      if (disabled) cls.push('dis');
      if (!isPast && level === 'partbook') cls.push('partbook');
      if (!isPast && level === 'fullbook') cls.push('fullbook');
      if (dateStr === state.selectedDate) cls.push('selected');
      var attr = disabled ? '' : ' onclick="sb.pickDate(\'' + dateStr + '\')"';
      cells.push('<div class="' + cls.join(' ') + '"' + attr + '>' + day + '</div>');
    }
    grid.innerHTML = cells.join('');

    var prevBtn = document.getElementById('cal2Prev');
    if (prevBtn) {
      var floorMonth = new Date().getMonth(), floorYear = new Date().getFullYear();
      prevBtn.disabled = (state.viewYear === floorYear && state.viewMonth === floorMonth);
    }
  }

  function pickDate(dateStr) {
    state.selectedDate = dateStr;
    state.selectedDuration = null;
    state.selectedTime = null;
    render();
    renderDurationStep();
    renderTimeStep();
    renderSummary();
  }

  function renderDurationStep() {
    var box = document.getElementById('durStep');
    if (!box) return;
    if (!state.selectedDate) {
      box.innerHTML = '<p class="muted-note">Select a date above first.</p>';
      return;
    }
    box.innerHTML = '<div class="dur-grid">' + DURATIONS.map(function (h) {
      var active = state.selectedDuration === h ? ' active' : '';
      return '<button type="button" class="dur-btn' + active + '" onclick="sb.pickDuration(' + h + ')">' + h + ' hr' + (h > 1 ? 's' : '') + '</button>';
    }).join('') + '</div>';
  }

  function pickDuration(hours) {
    state.selectedDuration = hours;
    state.selectedTime = null;
    renderDurationStep();
    renderTimeStep();
    renderSummary();
  }

  function renderTimeStep() {
    var box = document.getElementById('timeStep');
    if (!box) return;
    if (!state.selectedDate || !state.selectedDuration) {
      box.innerHTML = '<p class="muted-note">Select a date and duration above to see available start times.</p>';
      return;
    }
    box.innerHTML = '<div class="time-grid">' + START_TIMES.map(function (t) {
      var active = state.selectedTime === t ? ' active' : '';
      return '<button type="button" class="time-btn' + active + '" onclick="sb.pickTime(\'' + t + '\')">' + t + '</button>';
    }).join('') + '</div>';
  }

  function pickTime(t) {
    state.selectedTime = t;
    renderTimeStep();
    renderSummary();
  }

  function renderSummary() {
    var box = document.getElementById('bookingSummary');
    if (!box) return;
    if (state.selectedDate && state.selectedDuration && state.selectedTime) {
      box.innerHTML = '<p class="muted-note">Selected: <b style="color:#fff">' + state.selectedDate + '</b> · ' +
        state.selectedDuration + ' hr(s) · ' + state.selectedTime + '</p>';
    } else {
      box.innerHTML = '';
    }
  }

  function submitBooking() {
    if (!state.selectedDate || !state.selectedDuration || !state.selectedTime) {
      alert('Please pick a date, duration and start time first.');
      return;
    }
    var name = document.getElementById('b_name');
    var phone = document.getElementById('b_phone');
    var email = document.getElementById('b_email');
    var purpose = document.getElementById('b_purpose');
    var notes = document.getElementById('b_notes');
    if (!name.value || !phone.value) {
      alert('Please fill in your name and phone / WhatsApp number.');
      return;
    }

    var subject = 'Studio Booking Request — ' + state.selectedDate + ' (' + state.selectedDuration + 'hr)';
    var bodyLines = [
      'Date: ' + state.selectedDate,
      'Duration: ' + state.selectedDuration + ' hour(s)',
      'Start time: ' + state.selectedTime,
      'Name: ' + name.value,
      'Phone / WhatsApp: ' + phone.value,
      'Email: ' + (email.value || '-'),
      'Purpose: ' + (purpose.value || '-'),
      'Notes: ' + (notes.value || '-')
    ];
    var mailto = 'mailto:office@aniradichita.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyLines.join('\n'));

    var box = document.getElementById('bookingFormWrap');
    box.innerHTML = '<p style="color:#ccc;padding:20px 0;">Thanks, ' + name.value + '! Your request for ' + state.selectedDate +
      ' (' + state.selectedDuration + 'hr, ' + state.selectedTime + ') is ready to send. ' +
      '<a href="' + mailto + '" style="color:var(--red);font-weight:700;">Click here to email office@aniradichita.com</a> to confirm — we typically respond within 2 hours.</p>';
  }

  return {
    init: init,
    changeMonth: changeMonth,
    pickDate: pickDate,
    pickDuration: pickDuration,
    pickTime: pickTime,
    submitBooking: submitBooking
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('cal2')) sb.init();
});
