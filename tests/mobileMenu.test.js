const path = require('path');
const { JSDOM } = require('jsdom');

describe('mobile menu interactions', () => {
  let dom;

  beforeAll(async () => {
    const htmlPath = path.join(__dirname, '..', 'docs', 'index.html');
    dom = await JSDOM.fromFile(htmlPath, {
      runScripts: 'dangerously',
      resources: 'usable'
    });
    await new Promise(resolve => {
      dom.window.document.addEventListener('DOMContentLoaded', resolve);
    });
  });

  afterAll(() => {
    dom.window.close();
  });

  test('opens and closes the mobile navigation menu', () => {
    const { document } = dom.window;
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const mobileMenuExit = document.getElementById('mobile-menu-exit');
    const nav = document.querySelector('.navbar nav');

    // Open the menu
    mobileMenuBtn.click();
    expect(nav.classList.contains('open')).toBe(true);
    expect(mobileMenuBtn.style.display).toBe('none');
    expect(mobileMenuExit.style.display).toBe('block');

    // Close the menu
    mobileMenuExit.click();
    expect(nav.classList.contains('open')).toBe(false);
    expect(mobileMenuBtn.style.display).toBe('block');
    expect(mobileMenuExit.style.display).toBe('none');
  });
});
