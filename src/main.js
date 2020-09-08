import Vue from 'vue';
import App from './App.vue';
import router from './components/router';
import {Icon} from 'leaflet';

Vue.config.productionTip = false

// 圖標正確顯示
delete Icon.Default.prototype._getIconUrl;

Icon.Default.imagePath = '.';
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
