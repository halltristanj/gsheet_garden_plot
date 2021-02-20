/* 
  Takes the plants from `Seeds` and lists them in `Garden`
*/

function setAvailablePlantsGrid() {
  // Copy from AirTable values to 1 grid space to the right of the last cell for the Garden.

  // Create a row that is as long as the garden, then go to next column

  var lastCol = BLUEPRINT_SHEET.getDataRange().getLastColumn();
  var gridStartCol = lastCol + 2;
  var col = gridStartCol;
  var gardenSheetDataRange = GARDEN_SHEET.getDataRange();
  var startGardenRow = gardenSheetDataRange.getRow();
  var endGardenRow = gardenSheetDataRange.getLastRow();
  var startGardenCol = gardenSheetDataRange.getColumn();
  var endGardenCol = gardenSheetDataRange.getLastColumn();

  // Clear everything to the right of the garden grid.
  GARDEN_SHEET.getRange(1, col, 200, 200).clearContent().setBackground(null).clearFormat()
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle');

  var plants = SEEDS_SHEET.getDataRange().getValues();
  var rowLength = BLUEPRINT_SHEET.getDataRange().getLastRow();

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

    GARDEN_SHEET.getRange(insertRow, col, toInsert.length, 1)
      // .setValues([toInsert])
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
  GARDEN_SHEET.autoResizeColumns(gridStartCol, col - lastCol);
  GARDEN_SHEET.getRange(2, gridStartCol, rowLength - 1, (col - gridStartCol) + 1).setBorder(false, true, true, true, false, false);
  GARDEN_SHEET.getRange(1, gridStartCol).setValue(['Available Plants']);
  GARDEN_SHEET.getRange(1, gridStartCol, 1, col - lastCol -1)
    .merge()
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, true, true, 'black', SpreadsheetApp.BorderStyle.SOLID_THICK);

  return GARDEN_SHEET.getRange(2, gridStartCol, maxRow, col - gridStartCol);
}

function setAvailablePlantsConditionalFormatting(availGrid) {
  GARDEN_SHEET.clearConditionalFormatRules();

  var condRanges = [];
  var firstCol = availGrid.getColumn();
  var lastCol = availGrid.getLastColumn();
  var firstRow = availGrid.getRow();
  var lastRow = availGrid.getLastRow()

  for(var c = firstCol; c <= lastCol + 1; c++) {
    var range = GARDEN_SHEET.getRange(firstRow, c, (lastRow - firstRow) + 1, 1);
    condRanges.push(range);
  }

  // Gray out those plants that have already been used.

  // Get the range of the garden.
  var gardenRange = BLUEPRINT_SHEET.getDataRange();

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

    var rules = GARDEN_SHEET.getConditionalFormatRules();
    rules.push(rule);
    GARDEN_SHEET.setConditionalFormatRules(rules);
  });
}