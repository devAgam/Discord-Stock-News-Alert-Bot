import puppeteer from "puppeteer-core";

(async () => {
    const browser = await puppeteer.launch({ executablePath: "/bin/google-chrome" });
    const page = await browser.newPage();
    await page.goto("https://www.example.com");
    await page.screenshot({ path: "example.png" });

    await browser.close();
})();