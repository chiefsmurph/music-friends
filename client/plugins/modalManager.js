const ModalManager = () => ({
  state: {
    showingModal: null
  },
  actions: {
    hideModals: (state, actions) => {
      console.log('hiding all');
      console.log('what')
      document.body.style.overflow = 'inherit';
      return {
        showingModal: null
      };
    },
    showModal: (state, actions, modalName) => {
      var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
      // document.getElementById('modalShade').style.height = '500px';
      document.body.style.overflow = 'hidden';
      return {
        showingModal: modalName
      };
    }
  }
});

module.exports = ModalManager;
