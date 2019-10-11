const { client } = require("nightwatch-api");
const { Given, When, Then } = require("cucumber");
const CDP = require("chrome-remote-interface");
const fs = require("fs");

Given(/^I am on the booking page$/, async () => {
  console.log(client.globals.state.sessionId);
  await client.session(res => {
    console.log(res.sessionId);
    client.globals.state.sessionId = res.sessionId;
  });

  await client.url(client.launch_url);
  await client.waitForElementVisible(".app", 3000);
  await client.click("#booking").pause(1000);
});

Given(/^I am on the order page$/, async () => {
  console.log(client.globals.state.sessionId);
  await client.session(res => {
    console.log(res.sessionId);
    client.globals.state.sessionId = res.sessionId;
  });

  await client.url(client.launch_url);
  await client.waitForElementVisible(".app", 3000);
  await client.click("#order").pause(1000);
});

Given(/^I am on the list page$/, async () => {
  console.log(client.globals.state.sessionId);
  await client.session(res => {
    console.log(res.sessionId);
    client.globals.state.sessionId = res.sessionId;
  });

  await client.url(client.launch_url);
  await client.waitForElementVisible(".app", 3000);
  await client.click("#list").pause(1000);
});

Given(/^I am on the typography page$/, async () => {
  await client.url(client.launch_url);
  await client.waitForElementVisible(".app", 3000);
  await client.click("#typo").pause(1000);
});

When(/^I pause for (\d+) ms$/, async time => {
  await client.pause(parseInt(time, 10));
});

When(/^I enter the reason$/, async () => {
  let value;
  await client.getValue("#textfield-cupcake", result => (value = result.value));
  await client.setValue("#textfield-reason", value).pause(1000);
});

When(/^I enter the start time$/, async () => {
  await client.click("#select-startTime-date").pause(500);
  await client
    .click("#select-startTime-date .dropdown-item:nth-child(2)")
    .pause(500);

  await client.click("#select-startTime-time").pause(500);
  await client
    .click("#select-startTime-time .dropdown-item:nth-child(2)")
    .pause(500);
});

When(/^I enter the end time$/, async () => {
  await client.click("#select-endTime-date").pause(1000);
  await client
    .click("#select-endTime-date .dropdown-item:nth-child(2)")
    .pause(500);

  await client.click("#select-endTime-time").pause(1000);
  await client
    .click("#select-endTime-time .dropdown-item:nth-child(3)")
    .pause(500);
});

When(/^I submit the booking$/, async () => {
  // await client.click("#button-book").pause(3000);
  await client.clickByText("button", "Book");
});

Then(/^I should successfully create a booking$/, async () => {
  // waitForConditionTimeout is only used in expect assertions and waitFor commands
  // this will fail:
  //   client.assert.visible(".notif-success-book");
  // this will pass:
  await client.expect.element(".notif-success-book").to.be.visible;
  await client.saveScreenshot(
    "./nightwatch/reports/screenshots/booking_success.png"
  );
});

When(/^I enter the appetizer$/, async () => {
  await client.setValue("#textfield-appetizer", "noms").pause(1000);
});

When(/^I add a side$/, async () => {
  await client.clickByText("button", "Add a side");
});

When(/^I submit the order$/, async () => {
  await client.clickByText("button", "Order");
});

Then(/^I create a screenshot$/, async () => {
  let chrome;
  try {
    // connect to endpoint
    // chrome = await CDP();
    let tabs = await CDP.List();
    console.log(">>>> tabs", tabs);
    let tabId = tabs.find(tab => tab.url.startsWith("http://localhost:3000"))
      .id;
    console.log(">>>> tabId", tabId);
    chrome = await CDP({ target: tabId });
    const { DOM, Emulation, Page } = chrome;
    // measure the height of the rendered page
    const {
      root: { nodeId: documentNodeId }
    } = await DOM.getDocument();
    const { nodeId: bodyNodeId } = await DOM.querySelector({
      selector: "body",
      nodeId: documentNodeId
    });
    const {
      model: { height, width }
    } = await DOM.getBoxModel({ nodeId: bodyNodeId });

    console.log("Set visible size to the height of the dom", height);

    await client.execute(`window.scrollTo(0, ${height});`);

    const deviceMetrics = {
      width: width,
      height: height,
      deviceScaleFactor: 0,
      mobile: false,
      fitWindow: false
    };
    await Emulation.setDeviceMetricsOverride(deviceMetrics);
    // await Emulation.setVisibleSize({ width: width, height: height }); // deprecated

    const { data } = await Page.captureScreenshot();
    fs.writeFileSync("screenshot.png", Buffer.from(data, "base64"));
  } catch (err) {
    console.error(err);
  } finally {
    if (chrome) {
      console.log("Took screenshot");
      await chrome.close();
    }
  }
});

Then(/^I see text in capitalize case$/, async () => {
  await client.expect
    .element("#capitalize")
    .text.to.equal("This Is upper case");
  // .text.to.equal("This Is Upper Case");
});

Then(/^I see text in lower case$/, async () => {
  await client.expect.element("#lower").text.to.equal("this is lower case");
});
