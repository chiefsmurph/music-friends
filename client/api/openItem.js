const { shell } = require('electron');


// var path = require('path');
window.openItem = (file) => {
  // var mymusic = app.getPath('music');
  // console.log('mymusic, ', mymusic);
  var assetFolder = window.assetsFolder;
  console.log('here now ', file);
  console.log('opening' + assetFolder + file);
  shell.showItemInFolder(assetFolder + file);
};
