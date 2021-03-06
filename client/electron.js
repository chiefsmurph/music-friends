'use strict';
const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const path = require('path');
var Menu = electron.Menu;

// var fetchCheerioObject = require('fetch-cheerio-object');


console.log('updated');
var mymusic = app.getPath('music');
console.log('mymusic, ', mymusic);

// Report crashes to our server.
// electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

  var protocol = electron.protocol;
  protocol.interceptFileProtocol('file', function(req, callback) {
    var url = req.url.substr(7);
    console.log(url);
    if (url.indexOf('/Music/music-friends') === -1) {
      callback({path: path.normalize(__dirname + url)})
    } else {
      console.log('nahhhhhNAH')
      callback({path: decodeURI(url) })
    }
  },function (error) {
    if (error)
      console.error('Failed to register protocol')
  });

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minHeight: 500,
    minWidth: 800,
    titleBarStyle: 'hidden'
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file:///dist/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  setTimeout(() => {
    console.log('sending assets folder');
    mainWindow.webContents.send('assetsFolder', app.getPath('music') + '/music-friends');
    mainWindow.webContents.send('appPath', app.getAppPath());
  }, 2000);



  // the following is necessary for copy and paste functionality

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // Create the Application's main menu
  var template = [{
      label: "Application",
      submenu: [
          { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
          { type: "separator" },
          { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
      ]}, {
      label: "Edit",
      submenu: [
          { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
          { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
          { type: "separator" },
          { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
          { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
          { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]}
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

});
