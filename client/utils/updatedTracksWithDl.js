const updatedTracksWithDl = (tracks, dl) => {
  return tracks.map(track => {
    return (track.id === dl.song.id) ?
      Object.assign({}, track, {
        dl: dl.dl
      }) : track;
  });
};

module.exports = updatedTracksWithDl;
