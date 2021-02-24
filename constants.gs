const THIS_YEAR = new Date().getFullYear();
const GREY = '#F0F0F0';
const SHEETS = ['Seeds', 'Garden', 'Sowed', 'Blueprint', 'Config', 'Colors'];

function ACTIVE_SHEET() {
  const activeSheet = SpreadsheetApp.getActive();
  return activeSheet;
}

function SHEET(sheetName) {
  return ACTIVE_SHEET().getSheetByName(sheetName)
}

function columnToLetter(column) {
  var temp, letter = '';
  while (column > 0)
  {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function letterToColumn(letter) {
  var column = 0, length = letter.length;
  for (var i = 0; i < length; i++)
  {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}