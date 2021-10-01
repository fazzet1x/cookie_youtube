global.i = 1;
const fs = require('fs');
const puppeteer = require('puppeteer');
const ChromeCookiePath = require('chrome-cookie-path');
const path = ChromeCookiePath.get();
const ChromeCookie = require('chrome-cookie');
const CCookie = new ChromeCookie();

console.log('Скрипт успешно запустился!')
function wait(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

const write_file = (file, data) => new Promise((resolve, reject) => {
    fs.writeFile(file, data, 'utf8', error => {
      if (error) {
        console.error(error);
  
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
  
  const read_file = file => new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (error, data) => {
      if (error) {
        console.error(error);
  
        reject(false);
      } else {
        resolve(data);
      }
    });
  });

async function watch(url) {
    console.log('Start..')
    
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      executablePath: `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`, 
    });
    const cookie = await CCookie.getCookie('youtube.com');
    const DATA = [
      {
        'creation_utc': 'now',
        'encrypted_value': 'enc2',
        'expires_utc': 'never',
        'has_expires': 'yes',
        'host_key': 'youtube.com',
        'is_httponly': 'yes',
        'is_persistent': 'no',
        'is_secure': 'yes',
        'last_access_utc': 'now',
        'name': 'youtube',
        'path': '/root',
        'priority': 'no',
        'value': 'kazmi',
        'samesite': -1
      }
    ];
    const page = await browser.newPage();
    cookie.forEach(async ebata => {
    await CCookie.setCookie(DATA);
    });
    await page.goto(url);
    // const client = await page.target().createCDPSession();
    



    console.log("Following a link!");
    await page.setDefaultNavigationTimeout(0); 
    const playbut = await page.$(".ytp-play-button");
    const offvol = await page.$(".ytp-mute-button");
    await wait(10000)
    playbut.click();
    offvol.click();
    i++;
    console.log('Clicked on the Play button!');
    await wait(10000);
    i++;
};
watch("https://youtu.be/nLKKZ2mDtRkU");

process.setMaxListeners(0);

process.on("unhandledRejection", console.error);


