process.env.NODE_ENV = 'test';

var webdriver = require ('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
    driver.get('https://travis-ci.com/VuAnhTai/demo_travis-CI')
var promise = driver.findElement(By.className('signed-out')).click().then(function(){
  driver.findElement(By.name('login')).sendKeys('vuanhtai1997@gmail.com');
  driver.wait(driver.findElement(By.name('password')).sendKeys('thanhcong30'), 2000);
  driver.wait(driver.findElement(By.name('commit')).click(), 3000);
});