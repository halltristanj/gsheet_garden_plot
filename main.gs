/**
 * @OnlyCurrentDoc
 */

/**
 * TODO: 
 * - [] When setting availablePlantsGrid, if plants are equal in row length, a new column is created (uneccessary)
 * - [] Set tab color for Garden/Sowed
 * - [] onEdit when edit grid size - automatically resize Garden/Sowed/Blueprint
 * - [] onEdit when Plant Limit changes - automatically reset conditional formatting (cannot cross-reference sheets via app script)
 */

function main(clearAlert=true) {
  if(clearAlert) {
    var clear = alertClearGrid();
    if(!clear) { 
      return;
    }
  }

  const gardenSheet = SHEET('Garden');
  const blueprintSheet = SHEET('Blueprint');
  const sowedSheet = SHEET('Sowed');
  
  setGardenGridFormat(gardenSheet);
  setGardenGridFormat(blueprintSheet);
  setGardenGridFormat(sowedSheet);

  blueprintToSheet(gardenSheet); // Transfer `Blueprint` to `Garden` sheet
  blueprintToSheet(sowedSheet); // Transfer `Blueprint` to `Sowed` sheet

  // Conditional format a grid on what has been used.
  setAvailablePlantsGrid();
  // setAvailablePlantsConditionalFormatting(availGrid);
  setPlantLimitConditionalFormatting();
}

function onOpen() {
  displayMenu();
}

// function onEdit(e) {
//   // If edit Grid Size Value, reformat grids.
//   return
// }