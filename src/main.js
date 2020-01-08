//入口文件
import './css/index.css'

//导入mui文件
import '../lib/mui/css/mui.min.css'
import '../lib/mui/css/icons-extra.css'

import Vue from 'vue'
import VueRouter from 'vue-router' //导入路由的包并安装路由
import Vuex from 'vuex' //导入注册vuex状态管理
Vue.use(VueRouter)
Vue.use(Vuex)

//导入axios (vue.js ajax包)
import axios from 'axios'
// Vue.use(axios)
Vue.prototype.$axios = axios;

// 按需导入vant组件
import Tab from 'vant/lib/tab';
import Tabs from 'vant/lib/tabs';
import 'vant/lib/tab/style';
import 'vant/lib/tabs/style';
Vue.use(Tab);
Vue.use(Tabs);

//按需导入mint-ui组件
import {
	Header,
	Swipe,
	SwipeItem,
	Button,
	Lazyload,
	Switch
} from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload)
Vue.component(Switch.name, Switch)

import moment from 'moment'
import app from './App.vue' //导入vue根组件
import router from './router.js' //导入自己的router模块
import store from './store.js' //导入自己的vuex模块



//安装图片预览插件
import VuePreview from 'vue-Preview'
Vue.use(VuePreview)


Vue.filter('dateFormat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
	return moment(dataStr).format(pattern)
})

var vm = new Vue({
	el: '#app',
	render: c => c(app),
	router,
	store
})
