/* Unit-Tests für normalizePhoneAT. Ausführen mit: node tests/normalize-phone.test.js */
'use strict';
const assert = require('assert');
const { normalizePhoneAT } = require('../normalize-phone.js');

const cases = [
  // Fälle aus der Anforderung
  ['0664 1234567', '+436641234567'],
  ['+43 664 1234567', '+436641234567'],
  ['0043 664/1234567', '+436641234567'],
  ['43664 1234567', '+436641234567'],
  ['0664-123 45 67', '+436641234567'],
  // Zusätzliche Randfälle
  ['(0664) 123-45-67', '+436641234567'],
  ['+436641234567', '+436641234567'],
  ['', ''],
];

let failed = 0;
for (const [input, expected] of cases) {
  const got = normalizePhoneAT(input);
  try {
    assert.strictEqual(got, expected);
    console.log(`ok    ${JSON.stringify(input)} -> ${JSON.stringify(got)}`);
  } catch (e) {
    failed++;
    console.error(`FAIL  ${JSON.stringify(input)} -> ${JSON.stringify(got)} (erwartet ${JSON.stringify(expected)})`);
  }
}

if (failed) { console.error(`\n${failed} von ${cases.length} Tests fehlgeschlagen.`); process.exit(1); }
console.log(`\nAlle ${cases.length} Tests bestanden.`);
