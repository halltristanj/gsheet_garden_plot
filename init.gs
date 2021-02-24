function init() {
  /* Sets up a brand new garden
    Create sheets
      - Seeds
      - Garden
      - Sowed
      - Blueprint
      with descriptions of what each does?
    And that's it? 
  */
  createSheets();
  exampleConfig();
  exampleColors();
  exampleBlueprint();
  exampleSeeds();
  exampleHowTo();
  main(clearAlert=false);
  ACTIVE_SHEET().setActiveSheet(SHEET('Garden'));
  exampleGarden();
}

function createSheets() {
  Logger.log('Creating: ' + SHEETS);
  for(var s=0; s<SHEETS.length; s++) {
    var sheetName = SHEETS[s];
    var currentSheet = ACTIVE_SHEET().getSheetByName(sheetName)
    if(currentSheet) {
      Logger.log('Sheet ' + sheetName + ' already exists. Deleting.');
      ACTIVE_SHEET().deleteSheet(ACTIVE_SHEET().getSheetByName(sheetName));
    }
    Logger.log('Creating sheet: ' + sheetName);
    ACTIVE_SHEET().insertSheet(sheetName);
  }
}

function exampleColors() {
  const colors = [
    '#e06666', '#e26d66', '#e47566',
    '#e67d66', '#e88466', '#ea8c66',
    '#ec9466', '#ee9c66', '#f1a366',
    '#f3ab66', '#f5b366', '#f7ba66',
    '#f9c266', '#fbca66', '#fdd266',
    '#fcd666', '#f4d568', '#edd369',
    '#e5d26b', '#ded16d', '#d7d06e',
    '#cfce70', '#c8cd71', '#c0cc73',
    '#b9cb75', '#b1c976', '#aac878',
    '#a2c779', '#9bc67b', '#93c47d'
  ];
  const colorsSheet = SHEET('Colors');
  colorsSheet.getRange(1, 1).setValue('Plants Used');
  var row = 2;
  for(var r=0; r<colors.length; r++) {
    colorsSheet.getRange(row, 1, 1, 1).setValue([colors[r]]).setBackground(colors[r])
    row++;
  }
}

function exampleConfig() {
  // fill config with example values
  Logger.log('Setting example Config sheet.')
  const configSheet = SHEET('Config');
  var config = [
    ['Key', 'Value', 'Description'],
    ['This is the configuration sheet. Edit the Value to suite your needs.', null, null],
    ['Plant Limit', '4', 'How many plants to limit yourself to plant. Will change color of plot in Garden when approaching limit.'],
    ['Grid Size', 85, 'The size of the grid for your Garden, Blueprint, and Sowed sheets']
  ]
  configSheet.clear();
  configSheet.getRange(1, 1, config.length, config[0].length).setValues(config);
}

function exampleBlueprint() {
  // Creates an example garden in a blueprint.
  Logger.log('Setting example Blueprint sheet.')
  const blueprint = [
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    [null, null, null, null, null, null, null, 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', null, 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', null, 'x'],
    [null, null, null, null, 'x', 'x', null, 'x'],
    [null, null, null, null, 'x', 'x', null, 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', null, 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', null, 'x']
  ];
  const blueprintSheet = SHEET('Blueprint');
  blueprintSheet.clear();
  var name = blueprintSheet.getName();
  blueprintSheet.getRange(1, 1, blueprint.length, blueprint[0].length).setValues(blueprint);
  setGardenGridFormat(blueprintSheet);

  const rule = SpreadsheetApp.newConditionalFormatRule()
    .whenCellNotEmpty()
    .setBackground(GREY)
    .setRanges([blueprintSheet.getDataRange()])
    .build();
  var rules = blueprintSheet.getConditionalFormatRules();
  rules.push(rule);
  blueprintSheet.setConditionalFormatRules(rules);
}

function exampleSeeds() {
  // Put some seeds in Seeds
  Logger.log('Setting example Seeds sheet.')
  const seedsSheet = SHEET('Seeds');
  const seeds = [
    ['Pumpkin'], ['Oranges'], ['Asparagus'],
    ['Artichokes'], ['Lavender'], ['Butternut Squash'],
    ['Peas'], ['Cucumber'], ['Chives'], ['Arugula'],
    ['Parsley'], ['Basil'], ['Souls of the Damned']
  ];
  const cols = seedsSheet.getMaxColumns();

  if(cols > 1){
    seedsSheet.deleteColumns(2, cols - 1);
  }

  seedsSheet.clear();
  seedsSheet.getRange(1, 1, seeds.length).setValues(seeds);
  seedsSheet.autoResizeColumn(1);
}

function exampleGarden() {
  // Pick some random plants to put in the Garden
  var gardenSheet = SHEET('Garden');
  var range = SHEET('Blueprint').getDataRange();
  var data = range.getValues();
  var seeds = SHEET('Seeds').getDataRange().getValues();

  // Go through the garden, randomly choose a seed
  var plants = [];
  for(var r=0; r<data.length; r++) {
    var row=data[r];

    var plantColumn = [];

    for(var c=0; c<row.length; c++) {
      var col = row[c];
      var dataValidation = gardenSheet.getRange(r+1, c+1, 1, 1).getDataValidation();
      var toPlant = null;
      if(dataValidation) {
        var index = Math.floor(Math.random() * seeds.length);
        var blank = Math.random();
        if(blank <= 0.1 && blank >= 0.0) {
          toPlant = null;
        } else {
          toPlant = seeds[index][0]
        }
      }
      plantColumn.push(toPlant);
    }

    plants.push(plantColumn);
  }
  gardenSheet.getRange(1, 1, plants.length, plants[0].length).setValues(plants);
}

function exampleHowTo() {
  // Explain how to do things.
  const sheetName = 'HOWTO'
  const activeSheet = ACTIVE_SHEET()
  const currentSheet = activeSheet.getSheetByName(sheetName);

  if(currentSheet) {
    Logger.log('Sheet ' + sheetName + ' already exists. Deleting.');
    activeSheet.deleteSheet(activeSheet.getSheetByName(sheetName));
  }
  const howtoSheet = activeSheet.insertSheet(sheetName);

  howtoSheet.getRange(1, 1).setValue(['Welcome to My Garden!']).setFontSize(18).setFontWeight('bold');

  howtoSheet.getRange(2, 1, 4).setValues([
    ['When you installed this, a bunch of sheets and fake data were created.'],
    ['These are example data and you will be editing them to make your garden.'],
    ['If the data were not created, click Add-on -> Garden -> Initialize Example'],
    [null]
  ]);

  howtoSheet.getRange(6, 1).setValue(['Seeds']).setFontSize(16).setFontWeight('bold');
  howtoSheet.getRange(7, 1, 2).setValues([
    ["The 'Seeds' Sheet houses the seeds you'd like to plant this season."],
    [null]
  ]);

  howtoSheet.getRange(9, 1).setValue(['Blueprint']).setFontSize(16).setFontWeight('bold');
  howtoSheet.getRange(10, 1, 3).setValues([
    ["The 'Blueprint' Sheet houses what you want your garden to look like."],
    ["This template is built on the 'square foot garden' ideology where your garden is seperated into 1'x1' grids."],
    [null]
  ]);

  howtoSheet.getRange(13, 1).setValue(['Sowed']).setFontSize(16).setFontWeight('bold');
  howtoSheet.getRange(14, 1, 1).setValues([
    ['This is where you can mark what seeds you have already sowed.']
  ]);
}