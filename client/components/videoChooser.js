import { h } from 'hyperapp';

const VideoChooser = ({ videos, vidClick }, children) => {

  if (videos && videos.length) {
    return (
      <div class='videoChooser'>
        { videos.map(vid => (
          <div onclick={(e) => { e.preventDefault(); vidClick(vid); }}>
            <img src={vid.thumbnail} />
            {vid.title}
          </div>
        )) }
      </div>
    );
  }


};

module.exports = VideoChooser;
