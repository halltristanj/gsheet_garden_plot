function setPlantLimitConditionalFormatting () {
  // over garden grid, apply formula: =AND(ISTEXT(A1),COUNTIF($A$1:$M$11, A1)>3)
  var blueprint = BLUEPRINT_SHEET.getDataRange();
  var firstCol = blueprint.getColumn();
  var lastCol = blueprint.getLastColumn();
  var firstRow = blueprint.getRow();
  var lastRow = blueprint.getLastRow();
  var plantLimit = getConfigValue('Plant Limit');

  var range = GARDEN_SHEET.getRange(firstRow, firstRow, (lastRow - firstRow) + 1, (lastCol - firstCol) + 1);

  var colors = getColorScale();
  var startI = 1;

  for(var i = startI; i <= plantLimit; i++) {
    var index = Math.floor(colors.length / i) - 1;
    var equality = '=';
    if(i == startI) {
      index = colors.length - 1;
    } else if (i == plantLimit) {
      index = 0;
      equality = '>='
    }

    if(i == startI && plantLimit > 1) {
      continue;
    } else {
      var color = colors[index];
    }

    var formula = Utilities.formatString('=AND(ISTEXT(%s%s),COUNTIF($%s$%s:$%s$%s, %s%s) %s %s)', 
      columnToLetter(firstCol),
      firstRow,
      columnToLetter(firstCol),
      firstRow,
      columnToLetter(lastCol),
      lastRow,
      columnToLetter(firstCol),
      firstRow,
      equality,
      i
    );

    var rule = SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(formula)
      .setBackground(color)
      .setRanges([range])
      .build();

    var rules = GARDEN_SHEET.getConditionalFormatRules();
    rules.push(rule);
    GARDEN_SHEET.setConditionalFormatRules(rules);
  }
}