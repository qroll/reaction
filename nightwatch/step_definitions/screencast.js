const CDP = require("chrome-remote-interface");
const fs = require("fs");
const path = require("path");

let recording = true;
let chrome, currentPage;
let counter = 0;
let images = [];
let width = 1280,
  height = 720;

const PQueue = require("p-queue").default;
const queue = new PQueue({ concurrency: 3 });

const startChrome = async options => {
  console.log("♫♫♫ start chrome");
  const { url } = options;

  let tabs = await CDP.List();
  // console.log(">>>> tabs", tabs);
  let tab = tabs.find(tab => tab.url.startsWith(url));

  if (!tab) {
    throw new Error("♫♫♫ tab not found!");
  }

  let tabId = tab.id;
  console.log("♫♫♫ tabId", tabId);

  chrome = await CDP({ target: tabId });
  const { Page, Emulation } = chrome;

  const deviceMetrics = {
    width: width,
    height: height,
    deviceScaleFactor: 0,
    mobile: false,
    fitWindow: false
  };
  await Emulation.setDeviceMetricsOverride(deviceMetrics);

  currentPage = Page;
  await currentPage.enable();
  await currentPage.startScreencast({
    format: "jpeg",
    everyNthFrame: 1,
    quality: 50,
    maxWidth: width,
    maxHeight: height
  });
};

const stopChrome = async () => {
  console.log("♫♫♫ stop chrome");
  if (chrome) {
    await chrome.close();
  }
};

const _screencast = currentCounter => {
  const getFrame = async () => {
    const { data, metadata, sessionId } = await currentPage.screencastFrame();
    // console.log(metadata, data);
    await currentPage.screencastFrameAck({ sessionId: sessionId });

    await new Promise((resolve, reject) =>
      fs.writeFile(
        path.resolve(__dirname, "img", `record${currentCounter}.png`),
        Buffer.from(data, "base64"),
        err => (err ? reject() : resolve())
      )
    );
    images.push(path.resolve(__dirname, "img", `record${currentCounter}.png`));
    // images.push(Buffer.from(data, "base64"));
  };

  queue.add(() =>
    Promise.race([
      getFrame(),
      new Promise(resolve => setTimeout(resolve, 1000))
    ])
  );
};

const throttle = require("lodash/throttle");
const screencast = throttle(_screencast, 300);

const takeRecording = currentCounter => {
  console.log(">>> recording " + currentCounter);
  screencast(currentCounter);
  counter++;
  if (recording) setTimeout(() => takeRecording(counter), 100);
};

const start = async args => {
  try {
    const { options } = args;
    recording = true;
    try {
      fs.mkdirSync(path.resolve(__dirname, "img"));
      fs.mkdirSync(path.resolve(__dirname, "../reports/gif"));
    } catch (err) {
      if (err.code === "EEXIST") {
        console.log("♫♫♫ file already exists");
      } else {
        throw err;
      }
    }
    await startChrome(options);
    setTimeout(() => takeRecording(counter), 100);
  } catch (err) {
    console.error(err);
  }
};

const getPixels = require("get-pixels");
const getPixelsAsync = (image, type) =>
  new Promise((resolve, reject) =>
    getPixels(image, type, (err, pixels) => {
      if (err) {
        reject(err);
      } else {
        resolve(pixels);
      }
    })
  );

const makeGif = () =>
  new Promise(async (resolve, reject) => {
    const GIFEncoder = require("gif-encoder");

    console.log("♫♫♫ dimensions", width, height);

    const encoder = new GIFEncoder(width, height);
    const file = require("fs").createWriteStream(
      path.resolve(
        __dirname,
        `../reports/gif/screen-${new Date().valueOf()}.gif`
      )
    );

    encoder.setFrameRate(60);
    encoder.pipe(file);
    encoder.setQuality(40);
    encoder.setDelay(500);
    encoder.writeHeader();
    encoder.setRepeat(0);
    encoder.on("end", resolve);
    encoder.on("error", reject);

    for (let image of images) {
      try {
        let pixels = await getPixelsAsync(image, "image/jpg");
        encoder.addFrame(pixels.data);
        encoder.read();
      } catch (err) {
        reject(err);
      }
    }

    encoder.finish();
  });

const stop = async args => {
  try {
    recording = false;
    console.log("♫♫♫ queue", queue.size);
    await queue.onIdle();
    console.log("♫♫♫ yay, done!", queue.size);
    queue.clear();

    await makeGif();

    await stopChrome();
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
};

process.on("message", async function(message) {
  console.log("♫♫♫ message", message);
  const { args, type } = message;
  if (type === "start") {
    start(args);
  } else if (type === "stop") {
    stop(args);
  }
});
