/**
 * @OnlyCurrentDoc
 */

function main() {
  var clear = alertClearGrid();
  if(!clear) { 
    return;
  }
  
  setGardenGridFormat(GARDEN_SHEET);
  setGardenGridFormat(BLUEPRINT_SHEET);
  setGardenGridFormat(SOWED_SHEET);

  blueprintToSheet(GARDEN_SHEET); // Transfer `Blueprint` to `Garden` sheet
  blueprintToSheet(SOWED_SHEET); // Transfer `Blueprint` to `Sowed` sheet

  // Conditional format a grid on what has been used.
  var availGrid = setAvailablePlantsGrid();
  setAvailablePlantsConditionalFormatting(availGrid);
  setPlantLimitConditionalFormatting();
}

function onOpen() {
  displayMenu();
}