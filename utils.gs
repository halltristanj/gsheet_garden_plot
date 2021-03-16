function setGardenGridFormat(sheet) {
  if(!sheet) {
    sheet = SpreadsheetApp.getActiveSheet();
  }
  Logger.log('Setting grid format for ' + sheet.getName());

  const cellSize = getConfigValue('Grid Size');
  const maxRows = sheet.getMaxRows();
  const maxCols = sheet.getMaxColumns();

  sheet.setRowHeights(1, maxRows, cellSize).setColumnWidths(1, maxCols, cellSize);
  sheet.getRange(1, 1, maxRows, maxCols).setVerticalAlignment('middle').setHorizontalAlignment('center');
}

function setGridSize(cellSize) {
  const blueprintSheet = SHEET('Blueprint');
  const gardenSheet = SHEET('Garden');
  const sowedSheet = SHEET('Sowed');
  const maxRows = blueprintSheet.getMaxRows();
  const maxCols = blueprintSheet.getMaxColumns();
  if(!cellSize){
    cellSize = getConfigValue('Grid Size');
  }

  Logger.log('Setting grid size to: ' + cellSize);

  blueprintSheet.setRowHeights(1, maxRows, cellSize).setColumnWidths(1, maxCols, cellSize);
  gardenSheet.setRowHeights(1, maxRows, cellSize).setColumnWidths(1, maxCols, cellSize);
  sowedSheet.setRowHeights(1, maxRows, cellSize).setColumnWidths(1, maxCols, cellSize);
}