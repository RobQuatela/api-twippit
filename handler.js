const puppeteer = require('puppeteer');

/**
 * scrapes twitter profile to get name, avatar, follower count, following count, join date, Twitter handle, and location
 * @param {string} handle - name of twitter profile in url
 * @return {{name: string, avatarUrl: string, followerCount: string, followingCount: string, joinAt: string, handle: string, description: string}}
 */
const scrapeTwitterProfile = async (handle) => {

  const browser = await puppeteer.launch({
    headless: false,
    dumpio: true,
    devtools: true,
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage'
    ],
  });

  const page = await browser.newPage();
  await page.goto(`https://twitter.com/${handle}`);
  await page.waitForSelector('div.css-1dbjc4n.r-1ifxtd0.r-ymttw5.r-ttdzmv', {timeout: 10000});

  if (process.env.ENV === 'development')
    await page.on('console', msg => console.log(msg._text));

  const profileResult = await page.evaluate(() => {
    const app = document.querySelector('#react-root');
    const profileEl = app.querySelector('div.css-1dbjc4n.r-1ifxtd0.r-ymttw5.r-ttdzmv');

    const avatar = Array.from(profileEl.querySelectorAll('a')).find(x => x.href.includes('photo'));
    const avatarUrl = avatar
      .querySelector('img')
      .src;

    const name = Array.from(app.querySelector('div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1777fci').querySelector('h2').querySelectorAll('span')).find(x => x.innerText !== null).innerText;

    const handle = Array.from(profileEl.querySelectorAll('span.css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0')).find(x => x.innerText.includes('@')).innerText;

    const descriptionEl = profileEl.querySelector('[data-testid="UserDescription"]');
    const description = descriptionEl !== null ? descriptionEl.querySelector('span').innerText : 'Description not available';

    const profileHeader = profileEl.querySelector('[data-testid="UserProfileHeader_Items"]');

    const joinedAt = Array.from(profileHeader.querySelectorAll('span')).find(x => x.innerText.includes('Joined')).innerText;

    const followingLink = Array.from(app.querySelectorAll('a')).find(x => x.href.includes('following'));
    const followingCount = Array.from(followingLink.querySelectorAll('span')).find(x => x.innerText !== null).innerText;

    const followersLink = Array.from(app.querySelectorAll('a')).find(x => x.href.includes('followers'));
    const followerCount = Array.from(followersLink.querySelectorAll('span')).find(x => x.innerText !== null).innerText;

    return JSON.stringify({
      handle,
      avatarUrl,
      description,
      name,
      joinedAt,
      followingCount,
      followerCount,
      url: document.URL,
    });
  });

  await browser.close();

  return {
    ...JSON.parse(profileResult),
  };
}

module.exports = {
  scrapeTwitterProfile,
};
