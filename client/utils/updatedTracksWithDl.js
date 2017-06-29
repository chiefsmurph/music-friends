const updatedTracksWithDl = (tracks, dl, addTransform) => {
  return tracks.map(track => {
    console.log(JSON.stringify(track));
    return (track.id === dl.song.id) ?
      Object.assign({}, track, {
        dl: (addTransform && dl.dl) ? addTransform(dl.dl) : dl.dl
      }) : track;
  });
};

module.exports = updatedTracksWithDl;
