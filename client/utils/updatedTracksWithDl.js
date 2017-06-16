const updatedTracksWithDl = (tracks, dl, addTransform) => {
  return tracks.map(track => {
    return (track.id === dl.song.id) ?
      Object.assign({}, track, {
        dl: (addTransform) ? addTransform(dl.dl) : dl.dl
      }) : track;
  });
};

module.exports = updatedTracksWithDl;
