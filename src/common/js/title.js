import Vue from 'vue';

Vue.directive('title', {
  bind (el, binding) {
    const title = binding.value;
    document.title = title || '';
  }
});
