const ModalManager = () => ({
  state: {
    showingModal: null
  },
  actions: {
    hideModals: (state, actions) => {
      console.log('hiding all');
      console.log('what')
      document.body.style.overflow = 'inherit';
      ['.container > h1', '.container #left', '.container #right'].forEach((tag) => {
        document.querySelector(tag).style.filter = "blur(0px)";
      });
      return {
        showingModal: null
      };
    },
    showModal: (state, actions, modalName) => {
      var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
      // document.getElementById('modalShade').style.height = '500px';
      document.body.style.overflow = 'hidden';
      ['.container > h1', '.container #left', '.container #right'].forEach((tag) => {
        document.querySelector(tag).style.filter = "blur(2px)";
      });
      setTimeout(() => {
        console.log('focus');
        var input = document.getElementById(modalName).querySelector('input');
        if (input) input.focus();
      }, 1);
      return {
        showingModal: modalName
      };
    }
  }
});

module.exports = ModalManager;
