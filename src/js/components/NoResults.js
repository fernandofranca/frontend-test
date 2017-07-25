const Vue = require('vue');
const Modal = require('./ui/Modal.js');
const Icon = require('./ui/Icon.js');

const eventHub = require('../eventHub.js');

module.exports = Vue.component('NoResults', {
  methods:{
    dismiss: function () {
      eventHub.$emit("navigate-back");
    }
  },
  template: `
    <div class="no-resuls">
      <Modal title="Resultado da busca">
        <div slot="content">
          Nenhum resultado foi encontrado.
        </div>
        <div slot="footer">
          <button @click.prevent.stop="dismiss" class="btn btn-primary">
            <Icon type="icon-arrow-left" /> voltar
          </button>
        </div>
      </Modal>
    </div>
  `
})