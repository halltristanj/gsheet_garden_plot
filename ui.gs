function alertClearGrid() {
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.alert(
     'Please confirm',
     'Are you sure you want to continue?',
      ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (result == ui.Button.YES) {
    // User clicked "Yes".
    ui.alert('Clearing values and setting grid.');
    return true
  } else {
    // User clicked "No" or X in the title bar.
    ui.alert('Doing nothing.');
    return false
  }
}

function menuFormatWhichGarden() {
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.alert(
     'Format current sheet?',
      ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (result == ui.Button.YES) {
    setGardenGridFormat();
  }
}

function menuSetCellSize() {
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.prompt(
      'What gird size would you like?',
      ui.ButtonSet.OK_CANCEL);

  // Process the user's response.
  var button = result.getSelectedButton();
  var text = result.getResponseText();
  if (button == ui.Button.OK) {
    setGridSize(text)
  } else if (button == ui.Button.CANCEL) {
    // User clicked "Cancel".
    ui.alert('I didn\'t get your name.');
  }
}

function menuTransferBlueprint() {
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.alert(
     'Overwrite current sheet and transfer blueprint?',
      ui.ButtonSet.YES_NO);

  if (result == ui.Button.YES) {
    blueprintToSheet();
  }
}

function displayMenu() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Garden')
    .addSubMenu(ui.createMenu('Garden')
      .addItem('Create', 'main')
      .addItem('Format Garden', 'menuFormatWhichGarden')
      .addItem('Set Grid Size', 'menuSetCellSize')
      .addItem('Transfer blueprint to sheet', 'menuTransferBlueprint')
      // Transfer from Blueprint to any sheet
    )
    .addSubMenu(ui.createMenu('AirTable')
      .addItem('Copy Records from AirTable', 'airTableToSeeds')
    )
    .addToUi();
}