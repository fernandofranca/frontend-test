const Vue = require('vue');

export default Vue.component('Icon', {
  props: ['type'],
  template: `
    <i class="icon" :class="type"></i>
  `
});