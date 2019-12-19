const { client } = require("nightwatch-api");
const { Given, When, Then } = require("cucumber");
const CDP = require("chrome-remote-interface");

When("I visit {string}", async url => {
  await client.url(url);

  const cdpPort = parseInt(`922${process.env.CUCUMBER_SLAVE_ID}`);
  const cdp = await CDP({
    port: cdpPort
  });
  const tabs = await cdp.Target.getTargets();
  console.log(`Found tabs in CDP port ${cdpPort}`, tabs);
});

Then("I see {string}", async selector => {
  await client.expect.element(selector).to.be.visible;
});

When("I pause for {int} seconds", async time => {
  await client.pause(time);
});
