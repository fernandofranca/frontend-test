const Vue = require('vue');

module.exports = Vue.component('Icon', {
  props: ['type'],
  template: `
    <i class="icon" :class="type"></i>
  `
});