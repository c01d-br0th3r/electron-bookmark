const { BrowserWindow } = require("electron");

let offscreenWindow;

module.exports = (url, callback) => {
  console.log("Module");
  console.log("Here's URL", url);
  offscreenWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      offscreen: true,
    },
  });

  offscreenWindow.loadURL(url);
  offscreenWindow.webContents.on("did-finish-load", async (e) => {
    let title = offscreenWindow.getTitle();
    const image = await offscreenWindow.webContents.capturePage();
    let screenshot = image.toDataURL();
    callback({ title, screenshot, url });
    offscreenWindow.close();
    offscreenWindow = null;
  });
};
