import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import ECharts from 'vue-echarts'

import 'element-ui/lib/theme-default/index.css'
//import 'echarts/lib/chart/bar'
//import 'echarts/lib/component/tooltip'


Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.component('v-chart', ECharts);
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})

