function setPlantLimitConditionalFormatting () {
  // over garden grid, apply formula: =AND(ISTEXT(A1),COUNTIF($A$1:$M$11, A1)>3)
  const blueprintSheet = SHEET('Blueprint');
  const gardenSheet = SHEET('Garden');
  var blueprint = blueprintSheet.getDataRange();
  var firstCol = blueprint.getColumn();
  var lastCol = blueprint.getLastColumn();
  var firstRow = blueprint.getRow();
  var lastRow = blueprint.getLastRow();
  var plantLimit = getConfigValue('Plant Limit');

  gardenSheet.clearConditionalFormatRules();

  var range = gardenSheet.getRange(firstRow, firstRow, (lastRow - firstRow) + 1, (lastCol - firstCol) + 1);

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

    var rules = gardenSheet.getConditionalFormatRules();
    rules.push(rule);
    gardenSheet.setConditionalFormatRules(rules);
  }
}

function setAvailablePlantsGrid() {
  // Create a row that is as long as the garden, then go to next column
  const blueprintSheet = SHEET('Blueprint');
  const gardenSheet = SHEET('Garden');
  const seedsSheet = SHEET('Seeds')

  var lastCol = blueprintSheet.getDataRange().getLastColumn();
  var gridStartCol = lastCol + 2;
  var col = gridStartCol;
  var blueprintSheetDataRange = blueprintSheet.getDataRange();
  var startGardenRow = blueprintSheetDataRange.getRow();
  var endGardenRow = blueprintSheetDataRange.getLastRow();
  var startGardenCol = blueprintSheetDataRange.getColumn();
  var endGardenCol = blueprintSheetDataRange.getLastColumn();

  // Clear everything to the right of the garden grid.
  gardenSheet.getRange(1, col, 200, 200).clearContent().setBackground(null).clearFormat()
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle');

  var plants = seedsSheet.getDataRange().getValues();
  var rowLength = blueprintSheet.getDataRange().getLastRow();

  var insertRow = 2; // leave row 1 for title.
  var maxRow = 2;
  for(var r = 0; r<plants.length; r++) {
    // Go one by one, new column if we reach the number of rows the garden has (rowLength)
    var toInsert = plants[r];

    Logger.log('Inserting: ' + toInsert);

    var formula = Utilities.formatString("=\"%s (\"&countif($%s$%s:$%s$%s,\"%s\")&\")\"", 
      toInsert,
      columnToLetter(startGardenCol),
      startGardenRow,
      columnToLetter(endGardenCol),
      endGardenRow,
      toInsert
    );

    gardenSheet.getRange(insertRow, col, toInsert.length, 1)
      .setWrap(true)
      .setBackground(GREY)
      .setFormula(formula);

    if(insertRow===rowLength) {
      col++;
      insertRow = 2;
    } else {
      insertRow++;
    }
    if(r>maxRow) {
      maxRow = r;
    }
  }
  gardenSheet.autoResizeColumns(gridStartCol, col - lastCol);
  gardenSheet.getRange(2, gridStartCol, rowLength - 1, (col - gridStartCol) + 1).setBorder(false, true, true, true, false, false);
  gardenSheet.getRange(1, gridStartCol).setValue(['Available Plants']).setWrap(true);
  gardenSheet.getRange(1, gridStartCol, 1, col - lastCol -1)
    .merge()
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, true, true, 'black', SpreadsheetApp.BorderStyle.SOLID_THICK);

  var nCols = col - gridStartCol;
  if(nCols === 0) {
    nCols = 1;
  }
  return gardenSheet.getRange(2, gridStartCol, maxRow, nCols);
}

function setAvailablePlantsConditionalFormatting(availGrid) {
  const gardenSheet = SHEET('Garden');
  const blueprintSheet = SHEET('Blueprint');

  gardenSheet.clearConditionalFormatRules();

  var condRanges = [];
  var firstCol = availGrid.getColumn();
  var lastCol = availGrid.getLastColumn();
  var firstRow = availGrid.getRow();
  var lastRow = availGrid.getLastRow()

  for(var c = firstCol; c <= lastCol + 1; c++) {
    var range = gardenSheet.getRange(firstRow, c, (lastRow - firstRow) + 1, 1);
    condRanges.push(range);
  }

  // Gray out those plants that have already been used.

  // Get the range of the garden.
  var gardenRange = blueprintSheet.getDataRange();

  var gardenFirstColLetter = columnToLetter(gardenRange.getColumn());
  var gardenLastColLetter = columnToLetter(gardenRange.getLastColumn());
  var gardenFirstRow = gardenRange.getRow();
  var gardenLastRow = gardenRange.getLastRow();
  color = '#C0C0C0';
  // Formula: =countif($A$2:$M$11,$O2)=1 (etc)
  // on every column of Available Plants.
  
  condRanges.forEach(function (range) {
    var formula = Utilities.formatString('=countif($%s$%s:$%s$%s,$%s%s)>=1', 
      gardenFirstColLetter, 
      gardenFirstRow, 
      gardenLastColLetter, 
      gardenLastRow, 
      columnToLetter(range.getColumn()), 
      firstRow
    );

    var rule = SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(formula)
      .setFontColor(color)
      .setRanges([range])
      .build();

    var rules = gardenSheet.getConditionalFormatRules();
    rules.push(rule);
    gardenSheet.setConditionalFormatRules(rules);
  });
}