import express from "express"
import path from "path"
import puppeteer from "puppeteer";
import http from "http"

const app = express()
const server = http.createServer(app)

app.use(express.static("../dist-web"))


app.use("/login" , async (req, res) => {
  
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:3000/');
  page.click("#login")

  setTimeout( async() => {
    const pages = await browser.pages(); // get all open pages by the browser
    const popup =  pages[pages.length - 1]; // the popup should be the last page opened
    let emailInput = await popup.waitForSelector('input[name="userName"]');
    let passwordInput = await popup.waitForSelector('input[name="password"]');
    await emailInput.type("meuEmail@gamil.com")
    await passwordInput.type("minha Senha")
    let submitButton = await popup.waitForSelector('button[class="button-primary full-width button-large text-1-5rem text-bold"]');
    await submitButton.click()
    
  }, 5500);
 
  // Get the "viewport" of the page, as reported by the page.
  const teste = await page.evaluate(() => {
     
  });




})

app.listen(3000)
