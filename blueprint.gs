function blueprintToSheet(sheet) {
  /*
  Will take the Xs from "Blueprint" and place them in "sheet"
  */
  if(!sheet) {
    sheet = SpreadsheetApp.getActiveSheet();
  }

  const maxRows = sheet.getMaxRows();
  const maxCols = sheet.getMaxColumns();
  const blueprintSheet = SHEET('Blueprint');
  const seedsRule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(SHEET('Seeds').getDataRange(), true)
    .setHelpText('Select a seed')
    .setAllowInvalid(false)
    .build();;

  sheet.getRange(1, 1, maxRows, maxCols)
    .clearContent()
    .clearFormat()
    .clearDataValidations()
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  // Get the dimensions of the garden from 'Blueprint'
  var blueprint_range = blueprintSheet.getDataRange();
  var blueprint_values = blueprint_range.getValues();
  
  // Copy Dimensions of blueprint_range to Garden Sheet
  // Add formatting
  // Add data validation to grid
  for(var r = 0; r < blueprint_values.length; r++) {
    var row = blueprint_values[r];
    for(var c = 0; c < row.length; c++) {
      var cell = row[c];
      
      blueprint_values[r][c] = cell ? true : false

      setBlueprintTargetGridLinesFormat(sheet, c, r, blueprint_values);
      setBlueprintTargetDataValidation(sheet, c, r, blueprint_values, seedsRule);   
    }
  }
  return blueprint_values;
}

function setBlueprintTargetDataValidation(sheet, c, r, blueprint_values, seedsRule) {
  if(blueprint_values[r][c]) {
    sheet.getRange(r + 1, c + 1).setDataValidation(seedsRule);
  }
}

function setBlueprintTargetGridLinesFormat(sheet, c, r, blueprint_values) {
  var row = blueprint_values[r];
  var cell = row[c]
  // For current cell, if there is no x to the left, it needs a left border.
  var cellX = cell ? true : false;
  var left = row[c-1] ? false : true;   // is there something to the left
  var right = row[c+1] ? false : true;  // is there something to the right
  
  var aboveEmpty = true; // is there something above
  if(!blueprint_values[r - 1]) {
    aboveEmpty = true;
  } else {
    aboveEmpty = blueprint_values[r - 1][c] ? false : true;
  }

  var belowEmpty = true; // Is there something below?
  if(!blueprint_values[r + 1]) {
    belowEmpty = true;
  } else {
    belowEmpty = blueprint_values[r + 1][c] ? false : true;
  }

  if(cellX) {
    var range = sheet.getRange(r+1, c+1, 1, 1);

    range.setBorder(true, true, true, true, false, false, '#8c8c8c', SpreadsheetApp.BorderStyle.SOLID);

    range.setBorder(
      ((aboveEmpty && !belowEmpty) || (aboveEmpty && belowEmpty)), 
      ((left && !right) || (left && right)),
      ((belowEmpty && !aboveEmpty) || (belowEmpty && aboveEmpty)), 
      ((right && !left) || (left && right)), 
      false,
      false
    )
    .setBackground(GREY)
    .setWrap(true);
  }
}