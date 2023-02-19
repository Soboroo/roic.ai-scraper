function getContent_(url) {
  return UrlFetchApp.fetch(url).getContentText()
}

function scraper(ticker) {
  const content = getContent_(`https://roic.ai/company/${ticker}`);
  const $ = Cheerio.load(content);
  const chart = $('#__next > div > main > div.w-full.mt-5.sm\\:px-5.md\\:px-20.lg\\:px-30.xl\\:px-30 > div > div.w-full.flex.border-\\[\\#e0e3eb\\].border.rounded-lg > div').contents();
  const res = [];
  chart.each(function () {
    const colContents = [];
    const colTitle = $($(this)[0]).find("span").text();
    if (colTitle)
      colContents.push(colTitle);
    const col = $(this).find(".grid.grid-flow-col.w-full.h-full").contents();
    col.each(function () {
      $(this).contents().each(function () {
        colContents.push($(this).text());
      })
    });
    if (colContents.length)
      res.push(colContents);
  });
  return res;
}