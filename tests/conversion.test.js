const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

// Load the same conversion engine used by the browser UI without executing DOM code.
const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const start = app.indexOf('const K2U_FROM');
const end = app.indexOf('let swapped=false');
if (start < 0 || end < 0) throw new Error('Could not locate conversion engine in app.js');
const sandbox = {};
vm.runInNewContext(app.slice(start, end) + '\nglobalThis.engine = { krutiToUnicode, unicodeToKruti };', sandbox);
const { krutiToUnicode, unicodeToKruti } = sandbox.engine;

test('KrutiDev 010: supplied headline fragment converts to Unicode', () => {
  const input = "dtZeqäh ;kstusr èkqG~;krhy 3]258 'ksrdj+~;kauk ?33-01 dksVhapk fnyklk vkèkkj çek.khdj.k iw.kZ djk";
  const expected = 'कर्जमुक्ती योजनेत धुळ्यातील 3,258 शेतकऱ्यांना ₹33-01 कोटींचा दिलासा आधार प्रमाणीकरण पूर्ण करा';
  assert.equal(krutiToUnicode(input), expected);
});

test('Unicode: same headline fragment converts to the supplied KrutiDev 010 encoding', () => {
  const input = 'कर्जमुक्ती योजनेत धुळ्यातील 3,258 शेतकऱ्यांना ₹33-01 कोटींचा दिलासा आधार प्रमाणीकरण पूर्ण करा';
  const expected = "dtZeqäh ;kstusr èkqG~;krhy 3]258 'ksrdj+~;kauk ?33-01 dksVhapk fnyklk vkèkkj çek.khdj.k iw.kZ djk";
  assert.equal(unicodeToKruti(input), expected);
  assert.equal(krutiToUnicode(unicodeToKruti(input)), input);
});

test('KrutiDev 010: long article excerpt handles reph, halant, matras, punctuation and currency', () => {
  const input = "èkqGs] fn- 1 v‚DVkscj] 2026 ¼ftekdk o`Ùk½ & jkT; 'kklukP;k ^iq.;'yksd vfgY;knsoh gksGdj 'ksrdjh dtZeqäh ;kstuk] 2026 varxZr ykHk forj.kkP;k frlj+~;k VII;kr èkqGs ftYákrhy 3]258 'ksrdj+~;kaP;k dtZ[kkR;kaoj ?33 dksVh 1 yk[kkapk ykHk oxZ dj.;kr vkyk vkgs-";
  const output = krutiToUnicode(input);
  assert.match(output, /धुळे/);
  assert.match(output, /ऑक्टोबर/);
  assert.match(output, /पुण्यश्लोक अहिल्यादेवी होळकर शेतकरी कर्जमुक्ती योजना/);
  assert.match(output, /तिसऱ्या टप्प्यात/);
  assert.match(output, /₹33 कोटी 1 लाखांचा लाभ वर्ग करण्यात आला आहे/);
});

test('common regression words remain stable in both directions', () => {
  const examples = [
    ['Hkkjr', 'भारत'],
    ['ueLrs', 'नमस्ते'],
    ['lkekU;', 'सामान्य'],
    ['dke', 'काम'],
    ['fd', 'कि'],
  ];
  for (const [legacy, unicode] of examples) {
    assert.equal(krutiToUnicode(legacy), unicode);
    assert.equal(unicodeToKruti(unicode), legacy);
  }
});
