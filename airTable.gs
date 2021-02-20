function get_airtable_url(url) {
  var options = {
    "headers": {
      "Authorization": "Bearer " + getConfigValue('AirTable Key'),
      "Content-Type": "application/json",
    }
  }
  console.log('Getting URL: ' + url);
  var response = UrlFetchApp.fetch(url, options);
  var data = response.getContentText();
  return JSON.parse(data);
}