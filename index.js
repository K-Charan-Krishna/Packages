const express = require('express');
const fs = require('fs');
const path = require('path');
const passport = require('passport');
const multer = require('multer');
const mongoose=require('mongoose')
const session=require('express-session')
const rateLimit = require('express-rate-limit');
const puppeteer=require('puppeteer')
const fileUpload = require("express-fileupload");
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('./Auth')



const app = express();

const messageLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 5, 
  message: 'You have exceeded your daily request limit!'
});

app.use(
    fileUpload({
        createParentPath: true,
        preserveExtension: true,
        limits: { fileSize: 100 * 1024 * 1024 },
        abortOnLimit: true,
        tempFileDir: "/uploads"
    })
);

const PORT = 5002;

app.use(express.json())
app.use(session({
  secret: 'cat'
}));
app.use(passport.initialize())
app.use(passport.session())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const fileRouter=require('./fileuploads/fileuploads.router')
const pdfgen= require('./pdfgenerate/pdfgenerate.router')
const excelreport=require('./reports/excel.router')
const sendmail= require('./mailtranspoter/sendmail.router');

const url="mongodb://127.0.0.1/cvws-new"

mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.use('/api',messageLimiter,fileRouter)
app.use('/api',messageLimiter,pdfgen)
app.use('/api',messageLimiter,excelreport)
app.use('/api',sendmail)

  

//puppeteer
app.get('/usepuppeteer',async(req,res)=>{
  console.log('Puppeteer API')
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();

  // Navigate to login page
  await page.goto('http://localhost:3000/loginpage');

  // Type username and password into form fields
  await page.type('#UserId', 'charan.krishna@verifacts.co.in');
  await page.type('#PassWord', 'Charan@123');

  // Click login button and wait for page to load
  await page.click('#LoginButton');
  await page.waitForNavigation({ visible: true });

  console.log('Logged in successfully!');

  await browser.close();
})

async function scrapeWebsite() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Go to a webpage
  await page.goto('http://localhost:3000/loginpage');

  // Scrape data from the page
const data = await page.evaluate(() => {
  return {
    title: document.title,
    headings: Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(el => el.innerText.trim()),
    paragraphs: Array.from(document.querySelectorAll('p')).map(el => el.innerText.trim()),
    links: Array.from(document.querySelectorAll('a')).map(el => ({
      text: el.innerText.trim(),
      href: el.href
    })),
    images: Array.from(document.querySelectorAll('img')).map(img => ({
      alt: img.alt,
      src: img.src
    }))
  };
});


  // console.log(data); // Logs the scraped headings

  await browser.close();
}

// scrapeWebsite();

//OAuth 2.0 
// // Middleware to protect route
function isLogin(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get('/protected',isLogin,async(req,res)=>{
  try {
    console.log(req.user)
    res.send('Google SSR OAuth Demo')
  } catch (error) {
    res.send(error.message)
  }
})
app.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/google/callback',passport.authenticate('google',{
   successRedirect:'/protected',
   failureRedirect:'/failed'
}))

app.get('/failed',async(req,res)=>{
  try {
    return res.send('faild to loade')
  } catch (error) {
    return res.send(error.message)
  }
})

app.get('/',async(req,res)=>{
  try {
   
    return res.send(`<a href="/login"> click her to login</a>`)
  } catch (error) {
    return res.send(error.message)
  }
})


app.use((err, req, res, next) => {
  // For JSON body too large
  if (err.type === 'entity.too.large') {
    return res.status(413).send('JSON body too large (max 5KB)');
  }

  // For Multer file size limit
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).send('File size exceeds 2MB limit');
  }

  // Catch-all
  return res.status(500).send('Something went wrong');
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
