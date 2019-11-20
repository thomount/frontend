import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import ECharts from 'vue-echarts'
import QRCode from 'qrcodejs2'
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
Vue.prototype.$QRCode = function()
{
  let qrcode = new QRCode('qrcode', {
    width: 232,  // 设置宽度
    height: 232, // 设置高度
    text: "12345",
  });
};

