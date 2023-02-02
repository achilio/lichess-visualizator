import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import vueEcharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import { loadFonts } from './plugins/webfontloader'
import router from './router'

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .component('v-chart', vueEcharts)
  .mount('#app')
