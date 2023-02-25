import ScraperInterface from "../../interfaces/scraper.interface";
import { parseMCDate } from "../../utils/date.function";

const pup = require("puppeteer");

const newListUrl = "https://www.moneycontrol.com/news/business/stocks/";

export async function getNews(): Promise<ScraperInterface[]> {
  const browser = await pup.launch();
  const page = await browser.newPage();
  await page.goto(newListUrl);
  //
  // get all li tags that have the class "clearfix"
  //
  const newsList = await page.evaluate(() => {
    const news = document.querySelectorAll("li.clearfix");
    const newsArray = [];
    news.forEach((newsItem) => {
      newsArray.push({
        url: newsItem.querySelector("a").href,
        heading: newsItem.querySelector("a").title,
        date: newsItem.querySelector("span").innerText,
      });
    });
    return newsArray;
  });
  // loop and parse the date
  newsList.forEach((newsItem) => {
    newsItem.date = parseMCDate(newsItem.date);
  });

  await browser.close();
  return newsList;
}
