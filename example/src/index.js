import Vue from 'vue'
import App from './test.md'
import demo from './demo.vue'
import App2 from './test2.md'
console.log(App2)
Vue.component(demo.name, demo)
new Vue({
  el: '#root',
  render: h => h(App)
})