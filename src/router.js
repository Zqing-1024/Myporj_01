import VueRouter from 'vue-router'

import home from './component/footer/home.vue'
import vip from './component/footer/vip.vue'
import cart from './component/footer/cart.vue'
import search from './component/footer/search.vue'


//创建路由对象
var router = new VueRouter({
	routes:[
		{path:'/',component:home},
		{path:'/vip',component:vip},
		{path:'/cart',component:cart},
		{path:'/search',component:search},
	],
	// linkActiveClass:'mui-active',
	linkExactActiveClass:'mui-active'
})

// 向外暴露router对象
export default router