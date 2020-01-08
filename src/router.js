import VueRouter from 'vue-router'

import home from './component/footer/home.vue'
import vip from './component/footer/vip.vue'
import cart from './component/footer/cart.vue'
import search from './component/footer/search.vue'
import newsList from './component/home/newsList.vue'
import newsInfo from './component/home/newsInfo.vue'
import photoList from './component/home/photoList.vue'
import photoInfo from './component/home/photoInfo.vue'
import goodsList from './component/home/goodsList.vue'
import goodsInfo from './component/home/goodsInfo.vue'
import goodsDesc from './component/home/goodsDesc.vue'
import goodsComment from './component/home/goodsComment.vue'

//创建路由对象
var router = new VueRouter({
	routes:[
		{path:'/',redirect:'/home'},
		{path:'/home',component:home},
		{path:'/vip',component:vip},
		{path:'/cart',component:cart},
		{path:'/search',component:search},
		{path:'/home/newsList',component:newsList},
		{path:'/home/newsInfo/:id',component:newsInfo},
		{path:'/home/photoList',component:photoList},
		{path:'/home/photoInfo/:id',component:photoInfo},
		{path:'/home/goodsList',component:goodsList},
		{path:'/home/goodsInfo/:id',component:goodsInfo},
		{path:'/home/goodsDesc/:id',component:goodsDesc,name:'goodsDesc'},
		{path:'/home/goodsComment/:id',component:goodsComment,name:'goodsComment'}
	],
	linkActiveClass:'mui-active',
	// linkExactActiveClass:'mui-active'
})

// 向外暴露router对象
export default router