
const FileManager = () => ({
  state: {
    fileDirectory: JSON.parse(localStorage.getItem('fileDirectory')) || {},
  },
  actions: {
    newFileDownloaded: (state, actions, data) => {
      const { songid, file } = data;
      var fileDirectory = state.fileDirectory;
      fileDirectory[songid] = file;
      console.log('updated cache with ', songid, file);
      localStorage.setItem('fileDirectory', JSON.stringify(fileDirectory));
      // console.log('cache now ', JSON.stringify(playlists));
      return { fileDirectory };
    }
  }
});

module.exports = FileManager;
