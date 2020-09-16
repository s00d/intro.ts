const path = require('path')

module.exports = {
  beforeEach: function (browser) {
    console.log('file://' + path.resolve( __dirname + '/../example/hello-world/index.html'));
  },
  'test demo run' : function(browser) {
    browser
      .url('file://' + path.resolve( __dirname + '/../example/hello-world/index.html'))
      .waitForElementVisible('body')
      .assert.titleContains('IntroTS')
      .assert.visible('a[id=intro-run]')
      .click('a[id=intro-run]')
      .waitForElementVisible('.introts')
      .assert.visible('div[class=introts]')
      .assert.containsText('.introts-tooltiptext', 'This is a tooltip!')
      .end();
  }
};
