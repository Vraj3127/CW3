import Vue from 'vue'
import App from './App.vue'

// import './assets/main.css'
import './assets/app.css'
new Vue({
  render: (h) => h(App)
}).$mount('#app')

/*START: FONT AWESOME */
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faShoppingCart,faTextHeight,faSave} from '@fortawesome/free-solid-svg-icons';
import {faUniregistry} from '@fortawesome/free-brands-svg-icons';

library.add(faShoppingCart,faTextHeight,faUniregistry,faSave);

Vue.component('font-awesome-icon',FontAwesomeIcon);
Vue.config.productionTip=false;
/*END: FONT AWESOME */