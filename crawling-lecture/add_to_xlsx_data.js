const xlsx = require('xlsx');

function range_add_cell(range, cell) {
  var rng = xlsx.utils.decode_range(range);
  var c = typeof cell === 'string' ? xlsx.utils.decode_cell(cell) : cell;
  if (rng.s.r > c.r) rng.s.r = c.r;
  if (rng.s.c > c.c) rng.s.c = c.c;

  if (rng.e.r < c.r) rng.e.r = c.r;
  if (rng.e.c < c.c) rng.e.c = c.c;
  return xlsx.utils.encode_range(rng);
}

/**
 * 
 * @param {해당시트 설정} sheet 
 * @param {셀 위치 ex 'C1'} cell 
 * @param {작성 타입 's'는 문자열 'n'은 숫자} type 
 * @param {들어갈 내용 ex '평점'} raw 
 */
module.exports = function add_to_sheet(sheet, cell, type, raw) {         
  sheet['!ref'] = range_add_cell(sheet['!ref'], cell);
  sheet[cell] = { t: type, v: raw };
};