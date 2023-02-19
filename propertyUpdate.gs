function updateSheet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    res = getStockList();
    res.forEach((name) => {
      let sheet = ss.getSheetByName(name);
      if (!sheet)
        sheet = ss.insertSheet(name);
      const contents = scraper(name);
      sheet.hideSheet().getRange(1, 1, contents.length, contents[0].length).setValues(contents);
    })
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
}

function resetSheet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    res = getStockList();
    res.forEach((name) => {
      if (ss.getSheetByName(name))
        ss.deleteSheet(ss.getSheetByName(name));
    })
  } catch (err) {
    console.log('Failed with error %s', err.message);
  }
}

function getStockList() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('main');
  const nameRange = sheet.getRange('B2:' + sheet.getLastRow());
  const res = new Array();
  for (let i = 1, value; value = nameRange.getCell(1, i).getValue(); i++) {
    res.push(value);
  }
  return res;
}
