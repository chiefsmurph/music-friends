const ModalManager = () => ({
  state: {
    showingModal: null
  },
  actions: {
    hideModals: (state, actions) => {
      console.log('hiding all');
      console.log('what')
      return {
        showingModal: null
      };
    },
    showModal: (state, actions, modalName) => {
      return {
        showingModal: modalName
      };
    }
  }
});

module.exports = ModalManager;
