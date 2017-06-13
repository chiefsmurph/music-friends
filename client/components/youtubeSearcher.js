import { h } from 'hyperapp';

const YoutubeSearcher = ({ actions, suggestions }, children) => {

  return (
    <div>
      <input
        type="text"
        id="songname"
        placeholder="type an artist and or song name here to add it to the playlist"
        oninput={actions.suggestVids} />

      {suggestions && (
        <div id="vidSuggestions">
          {suggestions.map(vid => (
            <div onclick={(e) => { e.preventDefault(); actions.vidClick(vid); }}>
              <img src={vid.thumbnail} />
              {vid.title}
            </div>
          ))}
        </div>
      )}

    </div>
  );

};

module.exports = YoutubeSearcher;
