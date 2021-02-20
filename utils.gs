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
  const maxRows = BLUEPRINT_SHEET.getMaxRows();
  const maxCols = BLUEPRINT_SHEET.getMaxColumns();
  if(!cellSize){
    cellSize = getConfigValue('Grid Size');
  }

  Logger.log('Setting grid size to: ' + cellSize);

  BLUEPRINT_SHEET.setRowHeights(1, maxRows, cellSize).setColumnWidths(1, maxCols, cellSize);
  GARDEN_SHEET.setRowHeights(1, maxRows, cellSize).setColumnWidths(1, maxCols, cellSize);
  SOWED_SHEET.setRowHeights(1, maxRows, cellSize).setColumnWidths(1, maxCols, cellSize);
}