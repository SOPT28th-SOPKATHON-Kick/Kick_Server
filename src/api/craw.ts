const puppeteer = require("puppeteer");
const cheerio = require('cheerio');

const run = async (req, res, next) => {

  const extractData = html => {

    let ulList = [];

    const $ = cheerio.load(html);
    const $items = $('head'); 
    $items.each(function (i, elem) {
        ulList[i] = {
            link: $(this).find('meta[property="og:url"]').attr('content'),
            image: $(this).find('meta[property="og:image"]').attr('content'),
            desc: $(this).find('meta[property="og:description"]').attr('content')
          }
    });

    const data = ulList.filter(n => n.title);
    return res.json(data);
  }

  const browserOption = {
    headless : true,
  };
  const browser = await puppeteer.launch(browserOption);
  const page = await browser.newPage();

  try {        
    const url = req.body.content;
    const response = await page.goto(url);
    const html = await response.text();
    extractData(html);

  } catch (e) {
    console.log(e);
  } finally { 
    await page.close();
    await browser.close();
  }
};

export { run };