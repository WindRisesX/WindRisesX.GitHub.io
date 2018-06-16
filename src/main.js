// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import dayjs from "dayjs"
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import App from './App'
import router from './router'
import store from './store'

Raven
  .config('https://a9c23f026f7f4e129d5c6b3f25deda07@sentry.io/1186204')
  .addPlugin(RavenVue, Vue)
  .install()

Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.filter('DateFormat', function (dateString) {
  if (dateString) {
    return dayjs(dateString).format("MMM, DD YYYY")
  }
  return ''
})

Vue.filter('DayFormat', function (dateString) {
  if (dateString) {
    return dayjs(dateString).format("MMM, DD")
  }
  return ''
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
