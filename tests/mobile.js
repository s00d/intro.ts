module.exports = {
  '@disabled': true,

  beforeEach: function (browser) {
    browser.resizeWindow(360, 640)
  },
  'Test home page': function (browser) {
    browser
      .url('http://www.google.com')
      .waitForElementVisible('body')
      .saveScreenshot('/tmp/screenshot.png')
      .end()
  }
}
