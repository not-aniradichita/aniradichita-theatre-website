/* ==========================================================================
   Aniradichita Theatre & Films Association — ticketing (events pages only)

   Turns an event's `ticketing` config (assets/data/events.js) into a plain
   description of what the page should show. It renders nothing and knows
   nothing about markup, so the Events UI never changes when payments do.

   TODAY  provider 'razorpay' works in "link" mode: `checkoutUrl` is a hosted
          Razorpay payment-page URL and the Book Tickets button just opens it.
          There is no payment code on this site and no fake checkout: with an
          empty checkoutUrl the page shows a disabled "Tickets Releasing Soon".

   LATER  to go deeper than a hosted page (e.g. Razorpay Checkout.js with order
          creation on a server), register/extend a provider below with
          mode: 'custom' and an `open(event, ticketing)` function, and have
          events.js call ATFA.ticketing.open() for that state. Nothing else in
          the Events UI needs to move.
   ========================================================================== */
(function (root) {
  'use strict';

  var ATFA = (root.ATFA = root.ATFA || {});

  var PROVIDERS = {
    razorpay: { name: 'Razorpay', mode: 'link' }
  };

  function isHttpsUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return false;
    try {
      return new URL(value.trim()).protocol === 'https:';
    } catch (err) {
      return false;
    }
  }

  /**
   * @param {object} event  an entry from ATFA_EVENTS
   * @param {Date}   [now]
   * @returns {{state:'hidden'|'coming-soon'|'open', label:string, href:string|null,
   *            provider:string|null, providerName:string|null, opensAt:Date|null,
   *            info:Array<{label:string,value:string|null}>}}
   */
  function resolve(event, now) {
    var t = event && event.ticketing;
    if (!t || !t.enabled) {
      return { state: 'hidden', label: '', href: null, provider: null, providerName: null, opensAt: null, info: [] };
    }
    now = now || new Date();

    var provider = PROVIDERS[t.provider] || null;
    var opensAt = t.opensAt ? new Date(t.opensAt) : null;
    if (opensAt && isNaN(opensAt.getTime())) opensAt = null;

    var released = !opensAt || now >= opensAt;
    var live = released && isHttpsUrl(t.checkoutUrl);

    return {
      state: live ? 'open' : 'coming-soon',
      label: live ? t.buttonLabel || 'Book Tickets' : t.pendingLabel || 'Tickets Releasing Soon',
      href: live ? t.checkoutUrl.trim() : null,
      provider: t.provider || null,
      providerName: provider ? provider.name : null,
      opensAt: opensAt,
      info: Array.isArray(t.info) ? t.info : []
    };
  }

  ATFA.ticketing = { resolve: resolve, providers: PROVIDERS, isHttpsUrl: isHttpsUrl };
})(window);
