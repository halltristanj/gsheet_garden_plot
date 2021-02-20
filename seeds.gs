function airTableToSeeds() {
  const pullFromAirTable = getConfigValue('Pull From AirTable');
  Logger.log('Pull From AirTable: ' + pullFromAirTable)
  if(! pullFromAirTable) {
    return
  }
  // Get what we're sowing this year from AirTable.
  const table = getConfigValue('AirTable Table');
  const filterFormula = getConfigValue('AirTable Filter Formula');
  const fieldName = getConfigValue('AirTable Field Name');
  const baseUrl = getConfigValue('AirTable Base URL');
  const sowed_table = get_airtable_url(baseUrl + table + filterFormula)['records']

  SEEDS_SHEET.clearContents();

  var row = 1;
  for(var s in sowed_table) {
    var plantId = sowed_table[s]['fields'][fieldName];
    Logger.log('Adding: ' + plantId);
    var plant = plantId.replace("\"", "").replace("\"", "");
    SEEDS_SHEET.getRange(row, 1, 1, 1).setValue(plant);
    row++;
  }
  SEEDS_SHEET.autoResizeColumn(1).sort(1);
}
