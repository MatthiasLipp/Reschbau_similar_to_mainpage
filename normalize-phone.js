/* Telefonnummern-Normalisierung nach E.164 für österreichische Nummern.
   Wird vom Baukosten-Check vor dem Senden an den GoHighLevel-Webhook verwendet.
   Tests: tests/normalize-phone.test.js (mit `node tests/normalize-phone.test.js` ausführen). */
(function (root) {
  'use strict';

  function normalizePhoneAT(input) {
    var s = String(input == null ? '' : input).replace(/[\s\/\-().]/g, '');
    if (!s) return '';
    if (s.charAt(0) === '+') return s;
    if (s.indexOf('0043') === 0) return '+43' + s.slice(4);
    if (s.indexOf('43') === 0) return '+' + s;
    if (s.charAt(0) === '0') return '+43' + s.slice(1);
    return s;
  }

  root.normalizePhoneAT = normalizePhoneAT;
  if (typeof module !== 'undefined' && module.exports) module.exports = { normalizePhoneAT: normalizePhoneAT };
})(typeof window !== 'undefined' ? window : globalThis);
