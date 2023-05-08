import toRomanNumeral from './number-to-roman-numeral';

test('converts 1 to I', () => {
  expect(toRomanNumeral(1)).toBe('I');
});

test('converts 94 to XCIV', () => {
  // (100 - 10) + 4
  expect(toRomanNumeral(94)).toBe('XCIV');
});

test('converts 537', () => {
  // 500 + 10 + 10 + 10 + 5 + 1 + 1
  expect(toRomanNumeral(537)).toBe('DXXXVII');
});