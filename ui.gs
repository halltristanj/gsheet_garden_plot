function alertClearGrid() {
  var ui = SpreadsheetApp.getUi();

  var result = ui.alert(
     'This will clear all garden/sowed grids.',
     'Are you sure you want to continue?',
      ui.ButtonSet.YES_NO);

  if (result == ui.Button.YES) {
    return true
  }
  return false
}

function menuFormatWhichGarden() {
  var ui = SpreadsheetApp.getUi();

  var result = ui.alert(
     'Format current sheet?',
      ui.ButtonSet.YES_NO);

  if (result == ui.Button.YES) {
    setGardenGridFormat();
  }
}

function menuSetCellSize() {
  var ui = SpreadsheetApp.getUi();

  var result = ui.prompt(
      'What gird size would you like?',
      ui.ButtonSet.OK_CANCEL);

  var button = result.getSelectedButton();
  var text = result.getResponseText();
  if (button == ui.Button.OK) {
    setGridSize(text)
  } else if (button == ui.Button.CANCEL) {
    ui.alert('I didn\'t get your name.');
  }
}

function menuTransferBlueprint() {
  var ui = SpreadsheetApp.getUi();

  var result = ui.alert(
     'Overwrite current sheet and transfer blueprint?',
      ui.ButtonSet.YES_NO);

  if (result == ui.Button.YES) {
    blueprintToSheet();
  }
}

function displayMenu() {
  var ui = SpreadsheetApp.getUi();
  ui.createAddonMenu()
    .addItem('Create', 'main')
    .addItem('Format Sheet', 'menuFormatWhichGarden')
    .addItem('Set Grid Size', 'menuSetCellSize')
    .addItem('Transfer Blueprint', 'menuTransferBlueprint')
    .addItem('Initialize', 'init')
    .addToUi();
}