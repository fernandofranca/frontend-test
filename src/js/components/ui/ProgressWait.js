const Vue = require('vue');
const Modal = require('./Modal.js');

export default Vue.component('ProgressWait', {
  props: ['title'],
  template: `
    <Modal>
      <div slot="content">
        <p>{{title}}</p>
        <div class="loading"></div>
      </div>
    </Modal>
  `
});