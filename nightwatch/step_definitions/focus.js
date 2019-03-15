const { client } = require("nightwatch-api");
const { Given, When, Then } = require("cucumber");

When(
  /^I provoke focus issues in another test process for (\d+) seconds$/,
  async time => {
    let seconds = parseInt(time, 10);
    let js = function() {
      function focusRandomNode() {
        if (!document) {
          return;
        }
        var $nodes = document.querySelectorAll("input");
        var index = Math.floor($nodes.length * Math.random());
        var node = $nodes[index];
        node.focus();
      }
      setInterval(focusRandomNode, 1);
    };

    let startTime = new Date();
    let endTime = new Date() + seconds * 1000;

    await new Promise(resolve => setTimeout(resolve, 1000));

    while (startTime < endTime) {
      await client.execute(js, []);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
);
