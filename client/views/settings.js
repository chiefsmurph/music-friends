import { h } from 'hyperapp';
import Layout from '../components/layout';

const Settings = (state, actions) => {

  const settings = [
    {
      setting: 'previewVideosOnHover',
      label: 'Preview videos on mouse hover'
    },
    {
      setting: 'enableMP3s',
      label: 'Enable MP3s'
    },
    {
      setting: 'enableAlbumFetchs',
      label: 'Enable album-fetch\'s'
    }
  ];
  
  return (
    <Layout
      actions={actions}
      state={state}>


      {
        settings.map(settingObj => (
          <p>
            <label>
              <input
                type="checkbox"
                checked={state.settings[settingObj.setting]}
                onchange={() => actions.toggleSetting(settingObj.setting)}/>
                {settingObj.label}
            </label>
          </p>
        ))
      }

    </Layout>
  )

};

module.exports = Settings;
