const puppeteer = require("puppeteer");
const chalk = require("chalk");

const searchGoogle = async (text) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto("https://google.com", {
    waitUntil: "networkidle0"
  });

  //Finds input element with name attribue 'q' and types searchText
  await page.type('input[name="q"]', text);

  await page.$eval("input[name=btnK]", (button) => button.click());

  await page.waitForSelector("div[id=search]");

  //Find all div elements with class 'bkWMgd'
  const searchResults = await page.$$eval("div[class=g]", (results) => {
    //Array to hold all our results
    let data = [];
    //Iterate over all the results
    results.forEach((parent) => {
      const title = parent.querySelector(
        "div[class=rc] > div[class=r] > a >  h3"
      ).innerText;
      //Target the url
      const url = parent.querySelector("div[class=rc] > div[class=r] > a").href;
      //Target the description
      const description = parent.querySelector(
        "div[class=rc] > div[class=s] > div > span[class=st]"
      ).innerText;
      //Add to the return Array
      if (url.slice(0, 25) === "https://stackoverflow.com") {
        data.push({
          title,
          description,
          url,
        });
      }

    });
    //Return the search results
    return data;
  });


  await page.$eval(".G0iuSb", (button) => button.click());
  //page.click('.G0iuSb');


  await page.waitForSelector("div[id=search]");

  //Find all div elements with class 'bkWMgd'
  const searchResults2 = await page.$$eval("div[class=g]", (results) => {
    //Array to hold all our results
    let data = [];
    //Iterate over all the results
    results.forEach((parent) => {
      const title = parent.querySelector(
        "div[class=rc] > div[class=r] > a >  h3"
      ).innerText;
      //Target the url
      const url = parent.querySelector("div[class=rc] > div[class=r] > a").href;
      //Target the description
      const description = parent.querySelector(
        "div[class=rc] > div[class=s] > div > span[class=st]"
      ).innerText;
      //Add to the return Array
      if (url.slice(0, 25) === "https://stackoverflow.com") {
        data.push({
          title,
          description,
          url,
        });
      }

    });
    //Return the search results
    return data;
  });

  await page.screenshot({
    path: 'example.png'
  });

  let alldata = [...searchResults, ...searchResults2]

  alldata.map((item) => {
    console.log(chalk.white("Title " + item.title))
    console.log(chalk.underline("************************"))
    console.log(chalk.white("Description " + item.description))
    console.log(chalk.underline("************************"))
    console.log(chalk.white("Url " + item.url))
    console.log(chalk.inverse.bgBlue("End of line"))
  })

  await browser.close();
};

module.exports = {
  searchGoogle,
};