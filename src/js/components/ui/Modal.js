const Vue = require('vue');

export default Vue.component('Modal', {
  props: ['title'],
  template: `
    <div class="modal active">
      <div class="modal-overlay"></div>
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title">{{title}}</div>
        </div>
        <div class="modal-body">
          <div class="content">
            <slot name="content"></slot>
          </div>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  `
});