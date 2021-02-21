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
  var existingSheets = SpreadsheetApp.getActive().getSheets();
  SpreadsheetApp.getActive().insertSheet('Hi');
}