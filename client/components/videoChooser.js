import { h } from 'hyperapp';

const VideoChooser = ({ videos, vidClick, playOnHover, playYoutube, songDone }, children) => {
  // console.log(songDone, 'VideoChooser');
  const onVidOver = (vid) => {
    if (!playOnHover) return;
    console.log(vid);
    playYoutube(vid);
  };
  const onVidOut = (vid) => {
    if (!playOnHover) return;
    console.log(songDone, typeof songDone);
    songDone();
  };

  if (videos && videos.length) {
    return (
      <div class='videoChooser'>
        { videos.map(vid => (
          <div
            onclick={(e) => { e.preventDefault(); vidClick(vid); }}
            onmouseover={() => onVidOver(vid)}
            onmouseout={() => onVidOut()}>
            <img src={vid.thumbnail} />
            {vid.title}
          </div>
        )) }
      </div>
    );
  }


};

module.exports = VideoChooser;
