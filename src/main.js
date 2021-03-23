import Vue from 'vue'
import App from './App.vue'
import store from './store'

const app = new Vue({
  render: h => h(App),
  store,
})

Vue.config.productionTip = false

app.$mount('#app')
