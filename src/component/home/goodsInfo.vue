<template>
	<div>
		<div class="goodsinfo-container">
			<!-- 轮播图区域 -->
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swipe :lunboList="list" :isFull="false"></swipe>
					</div>
				</div>
			</div>

			<!-- 商品购买区域 -->

			<!-- 购物车小球动画 -->
			<transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
				<div class="ball" v-show="ballFlag" ref="ball"></div>
			</transition>

			<div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
							市场价： ￥{{goodsinfo.market_price}}&nbsp;&nbsp;销售价：<span class="price-now">￥{{goodsinfo.sell_price}}</span>
						</p>
						<p class="numbox">购买数量： <numbox class="goods_numbox" @getConut="getSelectedConut"></numbox>
						</p>
						<p>
							<mt-button type="primary" size="small">立即购买</mt-button>
							<mt-button type="danger" size="small" @click="addToShopCar()">加入购物车</mt-button>
						</p>
					</div>
				</div>
			</div>

			<!-- 商品参数区域 -->
			<div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsinfo.goods_no}}</p>
						<p>库存情况：{{goodsinfo.stock_quantity}} 件</p>
						<p>上架时间：{{goodsinfo.add_time}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
					<mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Toast
	} from "mint-ui"
	import swipe from "../swipe.vue" //轮播图组件
	import numbox from "../goods_numbox.vue" //数字按钮组件
	export default {
		data() {
			return {
				id: this.$route.params.id,
				ballFlag: false,
				list: [], //商品图片
				goodsinfo: [], //商品数据
				selectedConut: 1
			}
		},
		created() {
			this.getlunbotu(),
				this.getGoodsInfo()
		},
		methods: {
			getlunbotu() { //获取商品图片
				this.$axios.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id)
					.then(response => {
						response.data.message.forEach(item => {
							item.img = item.src
							item.w = 600
							item.h = 400
						})
						this.list = response.data.message
					}).catch(error => {
						Toast('缩略图加载失败')
						console.log('错误：' + error)
					})
			},
			getGoodsInfo() { //获取商品数据
				this.$axios.get('http://www.liulongbin.top:3005/api/goods/getinfo/' + this.id)
					.then(response => {
						this.goodsinfo = response.data.message[0]
					})
			},
			goDesc(id) {
				//点击去路由去图文介绍
				this.$router.push({
					name: "goodsDesc",
					params: {
						id
					}
				})
			},
			goComment(id) {
				//点击去商品评论
				this.$router.push({
					name: "goodsComment",
					params: {
						id
					}
				})
			},
			addToShopCar() {
				//添加到购物车
				this.ballFlag = !this.ballFlag

				var goodsinfo = {
					id: this.id,
					conut: this.selectedConut,
					price: this.goodsinfo.sell_price,
					selected: true
				}//拼接出存储到store中的数据对象
				
				//调用store中的mutations 来将商品加入购物车
				this.$store.commit("addToCar",goodsinfo)
			},
			beforeEnter(el) {
				el.style.transform = "translate(0,0)"
			},
			enter(el) {
				el.offsetWidth

				// 计算小球运动轨迹
				const ballPosition = this.$refs.ball.getBoundingClientRect()
				const badgePosition = document.getElementById('badge').getBoundingClientRect()

				const xDist = badgePosition.left - ballPosition.left
				const yDist = badgePosition.top - ballPosition.top

				el.style.transform = `translate(${xDist}px,${yDist}px)`
				el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68) "
				// done()
			},
			afterEnter(el) {
				this.ballFlag = !this.ballFlag
			},
			getSelectedConut(conut) {
				this.selectedConut = conut
			}
		},
		components: {
			swipe,
			numbox
		}
	}
</script>

<style scoped>
	.goodsinfo-container {
		background-color: #DDDDDD;
		overflow: hidden;
	}

	.price-now {
		color: red;
		font-size: 16px;
		font-weight: bold;
	}

	.numbox {
		height: 30px;
	}

	.goods_numbox {
		display: inline-block;
		height: 30px;
	}

	.mui-card-footer,
	.mui-card-header {
		display: block;
	}

	.mui-card-footer button {
		margin-bottom: 7px;
	}

	.ball {
		width: 15px;
		height: 15px;
		background-color: red;
		border-radius: 50%;
		position: absolute;
		z-index: 98;
		top: 450px;
		left: 140px;
	}
</style>
