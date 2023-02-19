/**
 * Retrieve stock data from 'roid.ai'
 * 
 * @param {ticker} input Nasdaq stock ticker.
 * @param {year} input year. (Row name of roic.ai sheet)
 * @param {type} input type. (Column name of roic.ai sheet)
 * @return The stock data corresponding to year and type.
 * @customfunction
 */
function retrieveStockData(ticker = ['aapl', 'cost'], year = '2007', type = 'Earnings per share') {
  if (ticker.map) {
     const a = ticker.map((x) => { return retrieveStockData(x, year, type) });
     return a;
  } else {
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = ss.getSheetByName(ticker);

      const colRange = sheet.getRange(1, 2, 1, sheet.getLastColumn() - 1);
      const rowRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1);
      let col, row;
      for (let i = 1; i < sheet.getLastColumn(); i++) {
        if (colRange.getCell(1, i).getValue() == year) {
          col = ++i;
          break;
        }
      }
      for (let i = 1; i < sheet.getLastRow(); i++) {
        if (rowRange.getCell(i, 1).getValue() == type) {
          row = ++i;
          break;
        }
      }
      const res = sheet.getRange(row, col).getValue();
      // console.log(res);
      return res == '- -' ? NaN : res;
    } catch (err) {
      return 'N/A';
    }
  }
}
