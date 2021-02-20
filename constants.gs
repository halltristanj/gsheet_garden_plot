const THIS_YEAR = new Date().getFullYear();
const GARDEN_SHEET = SpreadsheetApp.getActive().getSheetByName('Garden');
const BLUEPRINT_SHEET = SpreadsheetApp.getActive().getSheetByName('Blueprint');
const SEEDS_SHEET = SpreadsheetApp.getActive().getSheetByName('Seeds');
const COLORS_SHEET = SpreadsheetApp.getActive().getSheetByName('Colors');
const SOWED_SHEET = SpreadsheetApp.getActive().getSheetByName('Sowed');
const GREY = '#F0F0F0';

// DATA VALIDATION RULES
const SEEDS_RULE = SpreadsheetApp.newDataValidation()
  .requireValueInRange(SEEDS_SHEET.getDataRange(), true)
  .setHelpText('Select a seed')
  .setAllowInvalid(false)
  .build();

function columnToLetter(column)
{
  var temp, letter = '';
  while (column > 0)
  {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function letterToColumn(letter)
{
  var column = 0, length = letter.length;
  for (var i = 0; i < length; i++)
  {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}