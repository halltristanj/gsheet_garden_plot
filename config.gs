function getConfigValue(valueToGet) {
  var data = SpreadsheetApp.getActive().getSheetByName('Config').getDataRange().getValues();
  
  for(var d = 0; d < data.length; d++) {
    var key = data[d][0];
    var value = data[d][1];
    if(key === valueToGet) {
      return value
    }
  }
}

function getColorScale(which) {
  var which = 'Plants Used'
  var data = COLORS_SHEET.getDataRange().getValues();
  
  var row = data[0];
  var rowLength = COLORS_SHEET.getDataRange().getLastRow();
  var colors = [];

  for(var c = 0; c < row.length; c++) {
    var cell = row[c];
    if(cell == which) {
      for(var r = 1; r < rowLength; r++) {
        colors.push(COLORS_SHEET.getRange(r + 1, c + 1).getBackground());
      }
    }
  }
  return colors;
}