//入口文件
import './css/index.css'

//导入mui文件
import '../lib/mui/css/mui.min.css'
import '../lib/mui/css/icons-extra.css'

import Vue from 'vue'
import VueRouter from 'vue-router'	//导入路由的包并安装路由
Vue.use(VueRouter)

//导入axios (vue.js ajax包)
import axios from 'axios'
// Vue.use(axios)
Vue.prototype.$axios = axios;

//按需导入mint-ui组件
import { Header,Swipe,SwipeItem } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)


import app from './App.vue'	//导入vue根组件
import router from './router.js'	//导入自己的router模块

var vm = new Vue({
	el:'#app',
	render:c=>c(app),
	router
})