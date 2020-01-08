import Vue from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex)

//每次进入网站调出本地存储的购物车数据
var car = JSON.parse(localStorage.getItem('car') || '[]')

// 创建vuex对象
var store = new Vuex.Store({
	state: {
		car: car, //将购物车的商品数据用一个数组存储 {id:商品id,conut:购买数量,price:商品单价,selected:bool是否参与结算}
	},
	mutations: {
		addToCar(state, goodsinfo) { //点击保存数据对象到car中

			var flag = false //默认购物车中没有相同商品

			state.car.some(item => { //some循环检索是否有相同商品
				if (item.id == goodsinfo.id) {
					item.conut += parseInt(goodsinfo.conut) //如果有,只增加数量
					flag = true //并进行数据更正
					return true
				}
			})

			if (flag == false) { //如果没有则把获取的对象push进car数组
				state.car.push(goodsinfo)
			}

			//本地存储购物车数据到 localStorage 中
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		updateGoodsInfo(state, goodsinfo) {
			//修改购物车中商品的数量值
			state.car.some(item => {
				if (item.id == goodsinfo.id) {
					item.conut = parseInt(goodsinfo.conut)
					return true
				}
			})
			//当修改了car中的数据,把数据同步到localStorage本地中
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		removeFromCar(state, id) {
			//根据参数的id删除car中对应的数据
			state.car.some((item, i) => {
				if (item.id == id) {
					state.car.splice(i, 1)
					return true
				}
			})
			//当删除了car中的数据,把数据同步到localStorage本地中
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		updateSelected(state, info) {
			//根据传来的对象参数,修改car中的selected状态的方法
			state.car.some(item => {
				if (item.id == info.id) {
					item.selected = info.selected
					return true
				}
			})
			//把最新的购物车selected状态同步到localStorage本地中
			localStorage.setItem('car', JSON.stringify(state.car))
		}
	},
	getters: {
		getAllConut(state) { //获取加入购物车一共多少件
			var c = 0
			state.car.forEach(item => {
				c += item.conut
			})
			return c
		},
		getGoodsConut(state) { //获取指定id的商品有多少件
			var o = []
			state.car.forEach(item => {
				o[item.id] = item.conut
			})
			return o
		},
		getGoodsSelected(state) { //获取指定id商品的selected状态
			var o = []
			state.car.forEach(item => {
				o[item.id] = item.selected
			})
			return o
		},
		getAllConutAndAmount(state) { //获取selected为true的商品总件数和总价格
			var o = {
				conut: 0,
				amount: 0
			}
			state.car.forEach(item => {
				if (item.selected) {
					o.conut += item.conut
					o.amount += item.conut * item.price
				}
			})
			return o
		}
	}
})
export default store
