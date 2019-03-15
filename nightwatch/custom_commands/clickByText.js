const EventEmitter = require("events");

/**
 * Find an element by its text content and click that element.
 *
 * Does not work for input and textarea elements.
 *
 * @param {string} selector The CSS selector to identify the element.
 * @param {string} text The text that the element contains.
 */
class ClickByText extends EventEmitter {
  constructor() {
    super();
    this.init = this.init.bind(this);
    this.callback = this.callback.bind(this);
  }

  init(selector, text) {
    this.startTime = new Date();
    this.remainingTime = this.api.globals.waitForConditionTimeout || 5000;
    this.pollInterval = this.api.globals.waitForConditionPollInterval || 100;

    this.selector = selector;
    this.text = text;
  }

  callback(result) {
    if (result.status === -1) {
      throw new Error(result.message);
    }
    if (!result.value) {
      if (this.remainingTime <= 0) {
        throw new Error(
          `Failed to find element ${this.selector} containing text '${
            this.text
          }' after ${new Date() - this.startTime}ms`
        );
      }

      this.remainingTime -= this.pollInterval;
      this.schedule(this.selector, this.text);
    } else {
      this.api.elementIdClick(result.value.ELEMENT);
      console.log(
        `✔ Found and clicked element <${this.selector}> containing text '${
          this.text
        }' after ${new Date() - this.startTime}ms`
      );
      // this.api.assert.ok(
      //   `Found and clicked element <${this.selector}> containing text '${
      //     this.text
      //   }' after ${this.time - this.remainingTime}ms`
      // );
      this.emit("complete");
    }
  }

  schedule(selector, text) {
    let findElementByText = function(selector, text) {
      let elements = document.querySelectorAll(selector);
      for (const el of elements) {
        if (el.innerText.includes(text)) {
          return el;
        }
      }
      return null;
    };

    setTimeout(() => {
      this.api.execute(findElementByText, [selector, text], this.callback);
    }, this.pollInterval);
  }

  command(selector, text) {
    this.init(selector, text);
    this.schedule(selector, text);
    return this;
  }
}

module.exports = ClickByText;
