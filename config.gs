const defaultGridSize = 85;

function getConfigValue(valueToGet) {
  const configSheet = SHEET('Config');
  var data = configSheet.getDataRange().getValues();
  
  for(var d = 0; d < data.length; d++) {
    var key = data[d][0];
    var value = data[d][1];
    if(key === valueToGet) {
      return value
    }
  }

  if(valueToGet === 'Grid Size') {
    return defaultGridSize;
  }

}

function getColorScale(which) {
  var which = 'Plants Used'
  const colorsSheet = SHEET('Colors');
  var data = colorsSheet.getDataRange().getValues();
  
  var row = data[0];
  var rowLength = colorsSheet.getDataRange().getLastRow();
  var colors = [];

  for(var c = 0; c < row.length; c++) {
    var cell = row[c];
    if(cell == which) {
      for(var r = 1; r < rowLength; r++) {
        colors.push(colorsSheet.getRange(r + 1, c + 1).getBackground());
      }
    }
  }
  return colors;
}